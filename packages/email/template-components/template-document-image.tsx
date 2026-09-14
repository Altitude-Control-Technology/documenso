import { Column, Img, Row, Section } from '../components';
import { getEmailAssetUrl } from '../utils/asset-url';

export interface TemplateDocumentImageProps {
  assetBaseUrl: string;
  className?: string;
}

export const TemplateDocumentImage = ({ assetBaseUrl, className }: TemplateDocumentImageProps) => {
  return (
    <Section className={className}>
      <Row className="table-fixed">
        <Column />

        <Column>
<<<<<<< HEAD
          <Img className="mx-auto h-42" src={getAssetUrl('/static/document.png')} alt="Altitude Control Technology" />
=======
          <Img className="mx-auto h-42" src={getEmailAssetUrl(assetBaseUrl, 'static/document.png')} alt="Documenso" />
>>>>>>> upstream/main
        </Column>

        <Column />
      </Row>
    </Section>
  );
};

export default TemplateDocumentImage;
