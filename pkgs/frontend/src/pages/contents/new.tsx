import Head from 'next/head';
import React, { useState } from 'react';
import Template from '../../components/templates/ContentEdit';
import { Content } from '../../services/contents/types';

export const Page: React.FC = () => {
  const [content, setContent] = useState<Content>({
    body: '',
    tags: [],
    title: '',
    created: 0,
    updated: 0,
  });

  return (
    <>
      <Head>
        <title>New content</title>
      </Head>
      <Template
        content={content}
        headingText="New content"
        setContent={setContent}
      />
    </>
  );
};
export default Page;
