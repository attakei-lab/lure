import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import LoadingTemplate from '@/components/templates/Loading';
import MainTemplate from '@/components/templates/Posts';
import { FirebaseAppContext } from '@/contexts/firebase';
import { fetchPosts } from '@/applications/posts/queries';
import { PostEntity } from '@/applications/posts/types';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const [posts, setPosts] = useState<PostEntity[]>(null);

  useEffect(() => {
    (async () => {
      setPosts(await fetchPosts(app));
    })();
  }, []);

  return (
    <>
      {posts ? (
        <>
          <Head>
            <title>記事一覧 | Lure</title>
          </Head>
          <MainTemplate headingText="記事一覧" posts={posts} />
        </>
      ) : (
        <LoadingTemplate />
      )}
    </>
  );
};

export default Page;
