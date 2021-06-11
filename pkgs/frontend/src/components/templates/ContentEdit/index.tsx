import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ContentEditor from '../../organisms/ContentEditor';
import { Content } from '../../../services/contents/types';
import BaseLayout from '../BaseLayout';

export type Props = {
  content: Content;
  headingText: string;
  setContent: (content: Content) => void;
};

export const View: React.FC<Props> = ({ content, headingText, setContent }) => {
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
            handleTags={(tags) => setContent({ ...content, tags })}
            handleTitle={(title) => setContent({ ...content, title })}
          />
        </Container>
      </main>
    </BaseLayout>
  );
};
export default View;
