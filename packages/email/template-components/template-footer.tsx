import { Trans } from '@lingui/react/macro';
import { Fragment } from 'react';

import { Link, Section, Text } from '../components';
import { useBranding } from '../providers/branding';
import { getSafeBrandingUrl } from '../utils/branding-url';

export type TemplateFooterProps = {
  isDocument?: boolean;
  reportUrl?: string;
};

export const TemplateFooter = ({ isDocument = true, reportUrl }: TemplateFooterProps) => {
  const branding = useBranding();

  const safeBrandingUrl = branding.brandingEnabled ? getSafeBrandingUrl(branding.brandingUrl) : null;

  return (
    <Section>
      {reportUrl && (
        <Text className="my-4 text-base text-muted-foreground">
          <Trans>
            Did not expect this email?{' '}
            <Link className="text-primary" href={reportUrl}>
              Click here to report the sender
            </Link>
            . Never sign a document you don't recognize or weren't expecting.
          </Trans>
        </Text>
      )}

      {isDocument && !branding.brandingHidePoweredBy && (
        <Text className="my-4 text-base text-muted-foreground">
          <Trans>
<<<<<<< HEAD
            This document was sent from{' '}
            <Link className="text-[#193443]" href="https://altitudecontrol.com/">
              Altitude Control Technology
=======
            This document was sent using{' '}
            <Link className="text-primary" href="https://documen.so/mail-footer">
              Documenso
>>>>>>> upstream/main
            </Link>
            .
          </Trans>
        </Text>
      )}

      {branding.brandingEnabled && branding.brandingCompanyDetails && (
<<<<<<< HEAD
        <Text className="my-8 text-sm text-slate-400">
=======
        <Text className="my-8 text-muted-foreground text-sm">
>>>>>>> upstream/main
          {branding.brandingCompanyDetails.split('\n').map((line, idx) => {
            return (
              <Fragment key={idx}>
                {idx > 0 && <br />}
                {line}
              </Fragment>
            );
          })}
        </Text>
      )}

      {branding.brandingEnabled && safeBrandingUrl && (
        <Text className="my-8 text-muted-foreground text-sm">
          <Link href={safeBrandingUrl} target="_blank">
            {safeBrandingUrl}
          </Link>
        </Text>
      )}

      {!branding.brandingEnabled && (
<<<<<<< HEAD
        <Text className="my-8 text-sm text-slate-400">
          Altitude Control Technology LLC
=======
        <Text className="my-8 text-muted-foreground text-sm">
          Documenso, Inc.
>>>>>>> upstream/main
          <br />
          210 Edwards Village Blvd Unit C-103 PO BOX 98, Edwards CO 81632 USA
        </Text>
      )}
    </Section>
  );
};

export default TemplateFooter;
