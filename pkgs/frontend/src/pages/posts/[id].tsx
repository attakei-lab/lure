import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Template from '../../components/templates/Post';
import { FirebaseAppContext } from '../../contexts/firebase';
import { postFirebaseConverter } from '../../applications/posts/services';
import { PostEntity } from '../../applications/posts/types';
import { userProfileConverter } from '../../applications/auth/services';

export const Page = () => {
  const router = useRouter();
  const { app, profile } = useContext(FirebaseAppContext);
  const [post, setPost] = useState<PostEntity>(null);

  useEffect(() => {
    const postId = router.query.id || null;
    if (postId === null) {
      console.error('Not found');
      return;
    }
    (async () => {
      const snap = await app
        .firestore()
        .doc(`posts/${postId}`)
        .withConverter(postFirebaseConverter)
        .get();
      if (!snap.exists) {
        console.log('Not found');
        return;
      }
      const post = await snap.data();
      setPost(post);
    })();
  }, []);

  return (
    <>
      {post && (
        <>
          <Head>
            <title>{post.title} | Lure</title>
          </Head>
          <Template post={post} user={profile} />
        </>
      )}
    </>
  );
};

export default Page;
