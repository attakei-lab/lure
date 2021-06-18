import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { PostEntity } from '@/applications/posts/types';
import Posts from '@/components/organisms/Posts';
import BaseLayout from '@/components/templates/BaseLayout';

export type Props = {
  headingText: string;
  posts: PostEntity[];
};

export const View: React.FC<Props> = ({ headingText, posts }) => {
  return (
    <BaseLayout>
      <main>
        <Container>
          <Header as="h1">{headingText}</Header>
          <Posts posts={posts} />
        </Container>
      </main>
    </BaseLayout>
  );
};
export default View;
