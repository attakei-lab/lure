import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Template from '../../components/templates/ContentEdit';
import { FirebaseAppContext } from '../../contexts/firebase';
import { Post, SubmitResult } from '../../services/posts/types';
import { simpleValidate } from '../../services/posts/utils';

export const Page: React.FC = () => {
  const { app, profileRef } = useContext(FirebaseAppContext);
  const router = useRouter();
  const [content, setContent] = useState<Post>({
    authorRef: profileRef,
    body: '',
    tags: [],
    title: '',
    created: undefined,
    updated: undefined,
  });

  const handleSubmit = async (): Promise<SubmitResult> => {
    const validateMsg = simpleValidate(content);
    if (validateMsg) {
      return {
        message: validateMsg,
        next: () => false,
      };
    }
    const now = new Date();
    console.log('Start to store for firestore');
    const docData = {
      ...content,
      authorRef: profileRef,
      created: now,
      updated: now,
    };
    const docRef = app.firestore().collection('posts').doc();
    return docRef
      .set(docData)
      .then(() => {
        console.debug(`Created content at /posts/${docRef.id}`);
        return {
          message: '保存しました。ページを切り替えます...',
          next: async () => {
            setTimeout(() => router.push('/'), 1000);
            return true;
          },
        };
      })
      .catch((reason) => {
        return {
          message: `失敗しました: ${reason}`,
          next: () => false,
        };
      });
  };

  return (
    <>
      <Head>
        <title>New content</title>
      </Head>
      <Template
        content={content}
        handleSubmit={handleSubmit}
        headingText="New content"
        setContent={setContent}
        submitLabel="保存"
      />
    </>
  );
};
export default Page;
