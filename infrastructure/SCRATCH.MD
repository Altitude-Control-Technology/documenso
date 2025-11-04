```
psql "host=prod-documenso-db.cqcb3ivwq3e0.us-east-1.rds.amazonaws.com port=5432 dbname=documenso user=documensodbuser"
SELECT id, email, verified_at FROM "User";
UPDATE "User"
SET "emailVerified" = NOW()
WHERE email = '
```

```
aws ssm put-parameter   --name /prod/documenso/signing-passphrase   --type SecureString   --value '
```

```
aws ssm put-parameter   --name /prod/documenso/signing-file   --type SecureString   --value "$(cat cert.p12.b64)"   --overwrite
```

```
aws cloudformation deploy   --template-file infrastructure/documenso-stack.yaml   --stack-name documenso-prod   --capabilities CAPABILITY_NAMED_IAM   --parameter-overrides     DocumensoImageUri="624464340576.dkr.ecr.us-east-1.amazonaws.com/documenso-custom::latest"     SmtpHost="email-smtp.us-east-1.amazonaws.com"     SmtpTransport="smtp-auth"     SmtpPort="587"     SmtpFromEmail="noreply@altitudecontrol.com"     SmtpFromName="Altitude Control Technology"     SmtpTls="false"     SmtpUserParam="/prod/documenso/smtp-user"     SmtpPasswordParam="/prod/documenso/smtp-password"     GoogleClientIdParam="/prod/documenso/google-client-id"     GoogleClientSecretParam="/prod/documenso/google-client-secret"     EncryptionKeyParam="/prod/documenso/encryption-key"     EncryptionSecondaryKeyParam="/prod/documenso/encryption-secondary"     SigningPassphraseParam="/prod/documenso/signing-passphrase"     SigningFileContentsParam="/prod/documenso/signing-file"     UploadBucket="prod-documenso-assets-624464340576"
```
