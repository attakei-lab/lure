import Head from 'next/head';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import BaseLayout from '../components/templates/BaseLayout';

export const Page = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Not Found</title>
      </Head>
      <main>
        <Container>
          <Header as="h1">Not Found</Header>
          <p>リクエストされたURLは存在しません</p>
        </Container>
      </main>
    </BaseLayout>
  );
};
export default Page;
