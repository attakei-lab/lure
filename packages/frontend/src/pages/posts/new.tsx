import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Template from '@/components/templates/ContentEdit';
import { FirebaseAppContext } from '@/contexts/firebase';
import { uploadImagesForPost } from '@/applications/posts/commands';
import {
  postFirebaseConverter,
  updateAuthors,
} from '@/applications/posts/services';
import { Content, PostEntity, SubmitResult } from '@/applications/posts/types';
import { simpleValidate } from '@/applications/posts/utils';
import { useEffect } from 'react';

export const Page: React.FC = () => {
  const { app, profile } = useContext(FirebaseAppContext);
  const router = useRouter();
  const [content, setContent] = useState<Content>({
    body: '',
    tags: [],
    title: '',
  });
  const [post, setPost] = useState<PostEntity>(() => {
    const now = new Date();
    const ref = app
      .firestore()
      .collection('posts')
      .doc()
      .withConverter(postFirebaseConverter);
    return {
      id: ref.id,
      ref: ref,
      authorRefs: [],
      createdRef: null,
      updatedRef: null,
      ...content,
      authors: updateAuthors([], profile),
      createdBy: profile,
      updatedBy: profile,
      createdAt: now,
      updatedAt: now,
    };
  });

  useEffect(() => {
    setPost({
      ...post,
      ...content,
    });
  }, [content]);

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
      ...post,
      createdAt: now,
      updatedAt: now,
    };
    return docData.ref
      .set(docData)
      .then(() => {
        const nextUrl = `/posts/${post.id}`;
        console.debug(`Created content at ${nextUrl}`);
        return {
          message: '保存しました。ページを切り替えます...',
          next: async () => {
            setTimeout(() => router.push(nextUrl), 1000);
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
        handleImages={async (files) => uploadImagesForPost(app, post, files)}
      />
    </>
  );
};
export default Page;
