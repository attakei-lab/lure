import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ContentEditor from '../../organisms/ContentEditor';
import { Content, SubmitResult } from '../../../services/contents/types';
import BaseLayout from '../BaseLayout';

export type Props = {
  content: Content;
  handleSubmit: () => Promise<SubmitResult>;
  headingText: string;
  setContent: (content: Content) => void;
  submitLabel: string;
};

export const View: React.FC<Props> = ({
  content,
  handleSubmit,
  headingText,
  setContent,
  submitLabel,
}) => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <Header as="h1">{headingText}</Header>
          <ContentEditor
            body={content.body}
            tags={content.tags}
            title={content.title}
            handleBody={(body) => setContent({ ...content, body })}
            handleSubmit={handleSubmit}
            handleTags={(tags) => setContent({ ...content, tags })}
            handleTitle={(title) => setContent({ ...content, title })}
            submitLabel={submitLabel}
          />
        </Container>
      </main>
    </BaseLayout>
  );
};
export default View;
