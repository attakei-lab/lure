import React, { useContext } from 'react';
import { usePosts } from '@/applications/posts/hooks';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/PostList';
import { FirebaseAppContext } from '@/contexts/firebase';

/**
 * トップページ
 *
 * 最新記事を表示する
 */
export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const { posts, error, loading } = usePosts(app);

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {posts && <ViewTemplate headingText="Top" posts={posts} />}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};
export default Page;
