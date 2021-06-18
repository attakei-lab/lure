import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ErrorTemplate from '@/components/templates/Error';
import LoadingTemplate from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/ContentEdit';
import { FirebaseAppContext } from '@/contexts/firebase';
import { fetchPost } from '@/applications/posts/queries';
import { getLinks, postFirebaseConverter } from '@/applications/posts/services';
import { simpleValidate } from '@/applications/posts/utils';
import { PostEntity } from '@/applications/posts/types';

export const Page = () => {
  const router = useRouter();
  const { app } = useContext(FirebaseAppContext);
  const [post, setPost] = useState<PostEntity>(null);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    const postId = router.query.id || null;
    if (postId === null) {
      setError(new Error('Invalid URL'));
      return;
    }
    (async () => {
      const post = await fetchPost(app, postId as string);
      if (post === null) {
        setError(new Error('Not found'));
        console.log('Not found');
        return;
      }
      setPost(post);
    })();
  }, []);

  const handleSubmit = async () => {
    const validateMsg = simpleValidate(post);
    if (validateMsg) {
      return {
        message: validateMsg,
        next: () => false,
      };
    }
    post.updated = new Date();
    return post.ref
      .withConverter(postFirebaseConverter)
      .set(post)
      .then(() => {
        const nextUrl = getLinks(post).detail;
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
      {error ? (
        <ErrorTemplate error={error} />
      ) : post ? (
        <>
          <Head>
            <title>編集 | Lure</title>
          </Head>
          <ViewTemplate
            content={post}
            handleSubmit={handleSubmit}
            headingText="Edit content"
            setContent={setPost}
            submitLabel="保存"
          />
        </>
      ) : (
        <LoadingTemplate />
      )}
    </>
  );
};

export default Page;
