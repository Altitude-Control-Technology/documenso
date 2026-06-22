import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '../components';
import { useBranding } from '../providers/branding';
import { TemplateFooter } from '../template-components/template-footer';
import TemplateImage from '../template-components/template-image';

export type OrganisationInviteEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  senderName: string;
  organisationName: string;
  token: string;
};

export const OrganisationInviteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://altitudecontrol.com',
  senderName = 'John Doe',
  organisationName = 'Organisation Name',
  token = '',
}: OrganisationInviteEmailProps) => {
  const { _ } = useLingui();
  const branding = useBranding();

  const previewText = msg`Accept invitation to join an organisation on Altitude Control Technology Documents`;

  return (
    <Html>
      <Head />
      <Preview>{_(previewText)}</Preview>

      <Body className="mx-auto my-auto font-sans">
<<<<<<< HEAD
        <Section className="bg-white text-slate-500">
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 p-2 backdrop-blur-sm">
            {branding.brandingEnabled && branding.brandingLogo ? (
              <Img src={branding.brandingLogo} alt="Branding Logo" className="mb-4 h-6 p-2" />
            ) : (
              <TemplateImage
                assetBaseUrl={assetBaseUrl}
                className="mb-4 h-6 p-2"
                staticAsset="logo.png"
              />
            )}
=======
        <Section className="bg-background text-muted-foreground">
          <Container className="mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm">
            <TemplateBrandingLogo assetBaseUrl={assetBaseUrl} className="mb-4 h-6 p-2" />
>>>>>>> upstream/main

            <Section>
              <TemplateImage
                className="mx-auto"
                assetBaseUrl={assetBaseUrl}
                staticAsset="add-user.png"
              />
            </Section>

<<<<<<< HEAD
            <Section className="p-2 text-slate-500">
              <Text className="text-center text-lg font-medium text-black">
                <Trans>Join {organisationName} on Altitude Control Technology Documents</Trans>
=======
            <Section className="p-2 text-muted-foreground">
              <Text className="text-center font-medium text-foreground text-lg">
                <Trans>Join {organisationName} on Documenso</Trans>
>>>>>>> upstream/main
              </Text>

              <Text className="my-1 text-center text-base">
                <Trans>You have been invited to join the following organisation</Trans>
              </Text>

<<<<<<< HEAD
              <div className="mx-auto my-2 w-fit rounded-lg bg-gray-50 px-4 py-2 text-base font-medium text-slate-600">
=======
              <div className="mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground">
>>>>>>> upstream/main
                {organisationName}
              </div>

              <Text className="my-1 text-center text-base">
                <Trans>
                  by <span className="text-foreground">{senderName}</span>
                </Trans>
              </Text>

              <Section className="mb-6 mt-6 text-center">
                <Button
<<<<<<< HEAD
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white no-underline"
=======
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline"
>>>>>>> upstream/main
                  href={`${baseUrl}/organisation/invite/${token}`}
                >
                  <Trans>Accept</Trans>
                </Button>
                <Button
<<<<<<< HEAD
                  className="ml-4 inline-flex items-center justify-center rounded-lg bg-gray-50 px-6 py-3 text-center text-sm font-medium text-slate-600 no-underline"
=======
                  className="ml-4 inline-flex items-center justify-center rounded-lg bg-muted px-6 py-3 text-center font-medium text-muted-foreground text-sm no-underline"
>>>>>>> upstream/main
                  href={`${baseUrl}/organisation/decline/${token}`}
                >
                  <Trans>Decline</Trans>
                </Button>
              </Section>
            </Section>
          </Container>

          <Hr className="mx-auto mt-12 max-w-xl" />

          <Container className="mx-auto max-w-xl">
            <TemplateFooter isDocument={false} />
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default OrganisationInviteEmailTemplate;
