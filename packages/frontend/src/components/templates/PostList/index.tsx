import Head from 'next/head';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { PostEntity } from '@/applications/posts/types';
import PostDescriptionList from '@/components/organisms/PostDescriptionList';
import BaseLayout from '@/components/templates/BaseLayout';

export type Props = {
  headingText: string;
  posts: PostEntity[];
};

export const View: React.FC<Props> = ({ headingText, posts }) => {
  return (
    <>
      <Head>
        <title>{headingText} | Lure</title>
      </Head>
      <BaseLayout>
        <main>
          <Container>
            <Header as="h1">{headingText}</Header>
            <PostDescriptionList posts={posts} />
          </Container>
        </main>
      </BaseLayout>
    </>
  );
};
export default View;