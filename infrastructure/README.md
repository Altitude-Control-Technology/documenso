Deploy Documenso

```
aws cloudformation deploy \
  --template-file infrastructure/documenso-stack.yaml \
  --stack-name documenso-prod \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    DocumensoImageUri="624464340576.dkr.ecr.us-east-1.amazonaws.com/documenso-custom:act-custom-15" \
    SmtpHost="email-smtp.us-east-1.amazonaws.com" \
    SmtpTransport="smtp-auth" \
    SmtpPort="587" \
    SmtpFromEmail="noreply@altitudecontrol.com" \
    SmtpFromName="Altitude Control Technology" \
    SmtpTls="false" \
    SmtpUserParam="/prod/documenso/smtp-user" \
    SmtpPasswordParam="/prod/documenso/smtp-password" \
    GoogleClientIdParam="/prod/documenso/google-client-id" \
    GoogleClientSecretParam="/prod/documenso/google-client-secret" \
    EncryptionKeyParam="/prod/documenso/encryption-key" \
    EncryptionSecondaryKeyParam="/prod/documenso/encryption-secondary" \
    SigningPassphraseParam="/prod/documenso/signing-passphrase" \
    SigningFileContentsParam="/prod/documenso/signing-file" \
    UploadBucket="prod-documenso-assets-624464340576"
```

Documenso Bastion

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
