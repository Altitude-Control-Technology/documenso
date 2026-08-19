#!/usr/bin/env bash
#
# Update the Documenso CloudFormation stack safely.
#
# Why this exists: the GitHub Actions deploy registers its own ECS task
# definition revisions out-of-band, so CloudFormation's idea of the running
# task definition is always stale. Applying the template without correcting
# for that rolls production back to whatever revision the stack last recorded.
#
# This script reads the live task definition off the service, passes it in as
# ServiceTaskDefinitionArn, and makes you look at a change set before anything
# is applied.
#
# Usage:  ./infrastructure/update-stack.sh [stack-name]

set -euo pipefail

STACK="${1:-documenso-prod}"
REGION="${AWS_REGION:-us-east-1}"
CLUSTER="prod-documenso-cluster"
SERVICE="documenso-prod-DocumensoService-izAQVoJ92ltQ"
TEMPLATE="$(dirname "$0")/documenso-stack.yaml"

echo "==> Reading the task definition the service is actually running"
LIVE_TD=$(aws ecs describe-services --region "$REGION" \
  --cluster "$CLUSTER" --services "$SERVICE" \
  --query 'services[0].taskDefinition' --output text)

if [ -z "$LIVE_TD" ] || [ "$LIVE_TD" = "None" ]; then
  echo "ERROR: could not read the live task definition. Refusing to continue," >&2
  echo "       because applying the template blind would roll the service back." >&2
  exit 1
fi
echo "    $LIVE_TD"

echo "==> Reading the parameters the new template actually declares"
# Carrying a parameter forward that the template no longer declares makes
# CloudFormation reject the whole update with "Parameters: [...] do not exist in
# the template". That happens whenever a parameter is deleted from the template
# while the live stack still has it, so intersect the two lists rather than
# passing the live set blindly.
aws cloudformation validate-template --region "$REGION" \
  --template-body "file://$TEMPLATE" \
  --query 'Parameters[].ParameterKey' --output json > /tmp/template-params.json

echo "==> Carrying every other parameter forward unchanged"
aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
  --query "Stacks[0].Parameters[?ParameterKey!='ServiceTaskDefinitionArn'].ParameterKey" \
  --output json > /tmp/stack-params.json

python3 - "$LIVE_TD" <<'PY'
import json, sys

template_keys = set(json.load(open('/tmp/template-params.json')))
live_keys = json.load(open('/tmp/stack-params.json'))

carried = [k for k in live_keys if k in template_keys]
dropped = [k for k in live_keys if k not in template_keys]

params = [{"ParameterKey": k, "UsePreviousValue": True} for k in carried]
params.append({"ParameterKey": "ServiceTaskDefinitionArn", "ParameterValue": sys.argv[1]})
json.dump(params, open('/tmp/stack-params.json', 'w'))

print(f"    {len(params)} parameters")
for k in dropped:
    print(f"    dropped (no longer in template): {k}")
PY

CS="update-$(date -u +%Y%m%d-%H%M%S)"
echo "==> Creating change set $CS"
aws cloudformation create-change-set --region "$REGION" --stack-name "$STACK" \
  --change-set-name "$CS" --template-body "file://$TEMPLATE" \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --parameters file:///tmp/stack-params.json >/dev/null

aws cloudformation wait change-set-create-complete --region "$REGION" \
  --stack-name "$STACK" --change-set-name "$CS" 2>/dev/null || true

STATUS=$(aws cloudformation describe-change-set --region "$REGION" \
  --stack-name "$STACK" --change-set-name "$CS" --query 'Status' --output text)

if [ "$STATUS" = "FAILED" ]; then
  REASON=$(aws cloudformation describe-change-set --region "$REGION" \
    --stack-name "$STACK" --change-set-name "$CS" --query 'StatusReason' --output text)
  # "no changes" is a success case, not a failure
  if echo "$REASON" | grep -qi "didn't contain changes\|No updates"; then
    echo "==> No changes. Stack already matches the template."
    aws cloudformation delete-change-set --region "$REGION" --stack-name "$STACK" --change-set-name "$CS"
    exit 0
  fi
  echo "ERROR: change set failed: $REASON" >&2
  exit 1
fi

echo
echo "==> Review these changes before anything is applied:"
aws cloudformation describe-change-set --region "$REGION" --stack-name "$STACK" \
  --change-set-name "$CS" \
  --query 'Changes[].ResourceChange.{Action:Action,Resource:LogicalResourceId,Type:ResourceType,Replacement:Replacement}' \
  --output table

echo "Check especially:"
echo "  * DocumensoService should be Modify / Replacement=False (the task-def pin)."
echo "  * Any IAM change is suspect -- the template has drifted from the"
echo "    deployed role before, and applying it revoked a live SSM grant."
echo
read -r -p "Execute this change set? [y/N] " REPLY
if [ "$REPLY" != "y" ] && [ "$REPLY" != "Y" ]; then
  echo "Aborted. Deleting change set."
  aws cloudformation delete-change-set --region "$REGION" --stack-name "$STACK" --change-set-name "$CS"
  exit 0
fi

echo "==> Executing"
aws cloudformation execute-change-set --region "$REGION" --stack-name "$STACK" --change-set-name "$CS"
aws cloudformation wait stack-update-complete --region "$REGION" --stack-name "$STACK"

echo "==> Done. Verifying the service did not move:"
aws ecs describe-services --region "$REGION" --cluster "$CLUSTER" --services "$SERVICE" \
  --query 'services[0].{TaskDefinition:taskDefinition,Running:runningCount,Deployments:length(deployments)}' \
  --output table
curl -s -o /dev/null -w "    health endpoint: HTTP %{http_code}\n" \
  https://documents.altitudecontrol.com/api/health
