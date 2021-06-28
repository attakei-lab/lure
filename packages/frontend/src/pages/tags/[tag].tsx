import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/PostList';
import { FirebaseAppContext } from '@/contexts/firebase';
import { usePostsWithTag } from '@/applications/posts/hooks';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const router = useRouter();
  const { posts, tag, error, loading } = (() => {
    if (router.query.tag && typeof router.query.tag === 'string') {
      const tag = router.query.tag as string;
      return {
        ...usePostsWithTag(app, router.query.tag as string),
        tag,
      };
    }
    return {
      loading: false,
      error: new Error('Invalid URL'),
      posts: undefined,
      tag: undefined,
    };
  })();

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {posts && (
          <ViewTemplate headingText={`tag:${tag} の記事一覧`} posts={posts} />
        )}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};

export default Page;
