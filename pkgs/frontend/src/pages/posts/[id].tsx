import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Template from '../../components/templates/SimpleContent';
import { FirebaseAppContext } from '../../contexts/firebase';
import { Post } from '../../services/posts/types';

export const Page = () => {
  const router = useRouter();
  const { app } = useContext(FirebaseAppContext);
  const [post, setPost] = useState<Post>(null);

  useEffect(() => {
    const postId = router.query.id || null;
    if (postId === null) {
      console.error('Not found');
      return;
    }
    (async () => {
      const snap = await app.firestore().doc(`posts/${postId}`).get();
      if (!snap.exists) {
        console.log('Not found');
        return;
      }
      setPost(snap.data() as Post);
    })();
  }, []);

  return (
    <>
      {post && (
        <>
          <Head>
            <title>{post.title} | Lure</title>
          </Head>
          <Template content={post} />
        </>
      )}
    </>
  );
};

export default Page;
