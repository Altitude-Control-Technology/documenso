You are reviewing a weekly upstream sync of documenso/documenso into the Altitude Control Technology fork. The fork is consumed by an external app called act-sizing whose backend (backend/lambda-db/projects_handler.py) integrates with Documenso via these specific surfaces:

1. /api/v2/envelope/{create,distribute,delete} POST endpoints + GET /api/v2/envelope/{id}
2. Webhook receiver expecting `{event, payload: {id, externalId, status, recipients[]}, createdAt, webhookEndpoint}` shape
3. PDF placeholder auto-detection via regex `/\{\{([^}]+)\}\}/g` matching strings like `{{signature, r1}}`, `{{name, r1}}`, `{{date, r1}}`
4. `@documenso/embed-react` EmbedSignDocument component used in an iframe modal for in-person signing
5. Sequential signing flow with two recipients (signingOrder 1, 2) and `meta.envelopeExpirationPeriod`

Your job: given the upstream changes below, produce a SHORT markdown report (under 600 words) with:

## Summary
2-3 sentences on what shipped upstream this week.

## Notable features
Bulleted, one line each. Skip pure refactors, lint passes, translation updates.

## Risk to act-sizing integration
For each of the 5 surfaces above, rate as **BREAKING** / **RISKY** / **SAFE** with a one-line reason. If a surface was not touched this week, say SAFE (not touched).

## Recommended action
One sentence: deploy as-is, test in staging first, or hold and investigate.

Be concise. Do not invent details that are not in the diff.
