import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ErrorTemplate from '../../components/templates/Error';
import LoadingTemplate from '../../components/templates/Loading';
import ViewTemplate from '../../components/templates/Post';
import { FirebaseAppContext } from '../../contexts/firebase';
import { postFirebaseConverter } from '../../applications/posts/services';
import { PostEntity } from '../../applications/posts/types';

export const Page = () => {
  const router = useRouter();
  const { app, profile } = useContext(FirebaseAppContext);
  const [post, setPost] = useState<PostEntity>(null);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    const postId = router.query.id || null;
    if (postId === null) {
      setError(new Error('Invalid URL'));
      return;
    }
    (async () => {
      const snap = await app
        .firestore()
        .doc(`posts/${postId}`)
        .withConverter(postFirebaseConverter)
        .get();
      if (!snap.exists) {
        setError(new Error('Not found'));
        console.log('Not found');
        return;
      }
      const post = await snap.data();
      setPost(post);
    })();
  }, []);

  return (
    <>
      {error ? (
        <ErrorTemplate error={error} />
      ) : post ? (
        <>
          <Head>
            <title>{post.title} | Lure</title>
          </Head>
          <ViewTemplate post={post} user={profile} />
        </>
      ) : (
        <LoadingTemplate />
      )}
    </>
  );
};

export default Page;
