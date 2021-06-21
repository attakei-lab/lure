import React, { useContext } from 'react';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/PostList';
import { FirebaseAppContext } from '@/contexts/firebase';
import { usePosts } from '@/applications/posts/hooks';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const { loading, error, posts } = usePosts(app);

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {posts && <ViewTemplate headingText="記事一覧" posts={posts} />}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};

export default Page;
