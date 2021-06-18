import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ContentEditor from '@/components/organisms/ContentEditor';
import { Content, PostEntity, SubmitResult } from '@/applications/posts/types';
import BaseLayout from '@/components/templates/BaseLayout';

export type Props = {
  content: Content;
  handleSubmit: () => Promise<SubmitResult>;
  headingText: string;
  setContent: (content: Content | PostEntity) => void;
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
