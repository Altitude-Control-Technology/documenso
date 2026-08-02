import { Trans } from '@lingui/react/macro';

import { Button, Heading, Text } from '../components';

export interface TemplateDocumentRejectedProps {
  documentName: string;
  recipientName: string;
  rejectionReason?: string;
  documentUrl: string;
}

export function TemplateDocumentRejected({
  documentName,
  recipientName: signerName,
  rejectionReason,
  documentUrl,
}: TemplateDocumentRejectedProps) {
  return (
    <div className="mt-4">
<<<<<<< HEAD
      <Heading className="mb-4 text-center text-2xl font-semibold text-slate-800">
=======
      <Heading className="mb-4 text-center font-semibold text-2xl text-foreground">
>>>>>>> upstream/main
        <Trans>Document Rejected</Trans>
      </Heading>

      <Text className="mb-4 text-base">
        <Trans>
          {signerName} has rejected the document "{documentName}".
        </Trans>
      </Text>

      {rejectionReason && (
        <Text className="mb-4 text-base text-muted-foreground">
          <Trans>Reason for rejection: {rejectionReason}</Trans>
        </Text>
      )}

      <Text className="mb-6 text-base">
        <Trans>You can view the document and its status by clicking the button below.</Trans>
      </Text>

      <Button
        href={documentUrl}
<<<<<<< HEAD
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white no-underline"
=======
        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline"
>>>>>>> upstream/main
      >
        <Trans>View Document</Trans>
      </Button>
    </div>
  );
}
