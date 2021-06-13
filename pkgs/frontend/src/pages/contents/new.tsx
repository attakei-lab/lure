import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Template from '../../components/templates/ContentEdit';
import { FirebaseAppContext } from '../../contexts/firebase';
import { Content, SubmitResult } from '../../services/contents/types';

export const Page: React.FC = () => {
  const { app, user } = useContext(FirebaseAppContext);
  const router = useRouter();
  const [content, setContent] = useState<Content>({
    authorId: user.uid,
    body: '',
    tags: [],
    title: '',
    created: 0,
    updated: 0,
  });

  const validate = (content: Content): string | null => {
    if (content.title === '') {
      return 'タイトルは必須です';
    }
    if (content.body === '') {
      return '本文は必須です';
    }
    return null;
  };

  const handleSubmit = async (): Promise<SubmitResult> => {
    const validated = validate(content);
    if (validated) {
      return {
        message: validated,
        next: async (set) => set(false),
      };
    }
    const now = new Date();
    console.log('Start to store for firestore');
    const docData = {
      ...content,
      created: now.getTime(),
      updated: now.getTime(),
    };
    const docRef = app.firestore().collection('contents').doc();
    return docRef
      .set(docData)
      .then(() => {
        console.debug(`Created content at /contents/${docRef.id}`);
        return {
          message: '保存しました。ページを切り替えます...',
          next: async () => {
            setTimeout(() => router.push('/'), 1000);
          },
        };
      })
      .catch((reason) => {
        return {
          message: `失敗しました: ${reason}`,
          next: async (set) => set(false),
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
