import Head from 'next/head';
import React from 'react';
import Template from '../components/templates/SimpleContent';

const content = {
  title: 'Not Found',
  body: `
リクエストされたURLは存在しません
`,
};

export const Page = () => (
  <>
    <Head>
      <title>{content.title} | Lure</title>
    </Head>
    <Template content={content} />
  </>
);

export default Page;
