# Documenso infrastructure

This directory is the single home for the self-hosted Documenso infrastructure.
It used to be duplicated in the `act-sizing` repo, with authority split per file
and both copies drifting; those copies were deleted and everything consolidated
here, alongside the app and the deploy workflow that uses it.

| File | Purpose |
| --- | --- |
| `documenso-stack.yaml` | The `documenso-prod` CloudFormation stack (VPC, ALB, ECS service, RDS, S3). |
| `update-stack.sh` | The **only** supported way to apply `documenso-stack.yaml`. |
| `task-definitions/documenso-task.json` | Rendered and registered by `.github/workflows/documenso-ecs-deploy.yml` on every push to `act-custom`. |
| `documenso-deploy-role.yaml` | The GitHub Actions OIDC deploy role. |
| `documenso-bastion.yaml` | One-off EC2 bastion for direct RDS access. |

## Updating the stack

```
./infrastructure/update-stack.sh            # defaults to documenso-prod
```

Do **not** run `aws cloudformation deploy` against `documenso-stack.yaml` by
hand. The GitHub Actions deploy registers its own ECS task-definition revisions
out of band, so CloudFormation's record of the running task definition is always
stale — applying the template without correcting for that rolls production back
to whatever revision the stack last recorded. `update-stack.sh` reads the live
revision off the service, passes it as `ServiceTaskDefinitionArn`, drops any
parameter the template no longer declares, and makes you review a change set
before anything is applied.

`ServiceTaskDefinitionArn` deliberately has no default, so a hand-rolled
`cloudformation deploy` fails outright rather than quietly rolling the service
back. That is a safety net, not an invitation to pass the parameter yourself.

When reviewing the change set, check especially:

* `DocumensoService` should be `Modify` / `Replacement=False` — that is the
  task-definition pin doing its job.
* Any IAM change is suspect. The template has drifted from the deployed roles
  before, and applying it once revoked a live SSM grant.

## Deploying the application

Push to `act-custom`. `documenso-ecs-deploy.yml` builds the image, pushes it to
ECR as `documenso-custom:act-custom-<n>`, renders
`task-definitions/documenso-task.json` with the new image, registers a revision
and rolls the service. Note its path filter includes `infrastructure/**`, so
editing anything in this directory triggers an application deploy too.

## Bastion (one-off)

Only stand this up when you need direct RDS access, and tear it down afterwards.
`AllowedCidr` is a single operator IP and will need updating.

```
aws cloudformation deploy \
  --template-file infrastructure/documenso-bastion.yaml \
  --stack-name documenso-bastion \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    VpcId=vpc-08e002a2f1a7f1c37 \
    PublicSubnetId=subnet-02e957d0a1540de72 \
    BastionKeyName=vpc-temp \
    AllowedCidr=50.218.89.150/32 \
    RdsSecurityGroupId=sg-0d20d3c776884bd14 \
    AmiId=ami-0bdd88bd06d16ba03
```
