import { Trans } from '@lingui/react/macro';

import { env } from '@documenso/lib/utils/env';

import { Button, Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export interface TemplateResetPasswordProps {
  userName: string;
  userEmail: string;
  assetBaseUrl: string;
}

export const TemplateResetPassword = ({ assetBaseUrl }: TemplateResetPasswordProps) => {
  const NEXT_PUBLIC_WEBAPP_URL = env('NEXT_PUBLIC_WEBAPP_URL');

  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section className="flex-row items-center justify-center">
<<<<<<< HEAD
        <Text className="text-primary mx-auto mb-0 max-w-[80%] text-center text-lg font-semibold">
=======
        <Text className="mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg">
>>>>>>> upstream/main
          <Trans>Password updated!</Trans>
        </Text>

        <Text className="my-1 text-center text-base text-muted-foreground">
          <Trans>Your password has been updated.</Trans>
        </Text>

        <Section className="mb-6 mt-8 text-center">
          <Button
<<<<<<< HEAD
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white no-underline"
=======
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline"
>>>>>>> upstream/main
            href={`${NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:3000'}/signin`}
          >
            <Trans>Sign In</Trans>
          </Button>
        </Section>
      </Section>
    </>
  );
};

export default TemplateResetPassword;
