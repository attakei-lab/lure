import React, { useContext, useState } from 'react';
import { usePostsWithCursor } from '@/applications/posts/hooks';
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
  const { posts, error, loading, fetchNext, hasNext } = usePostsWithCursor(app);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);

  const handleFetchNext = async () => {
    setNextDisabled(true);
    setNextLoading(true);
    try {
      await fetchNext();
    } catch (e) {
      setNextLoading(false);
      setNextDisabled(!hasNext);
      throw e;
    }
    setNextLoading(false);
    setNextDisabled(!hasNext);
  };

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {posts && (
          <ViewTemplate
            headingText="Top"
            posts={posts}
            nextButtonDisabled={nextDisabled}
            nextButtonHandler={handleFetchNext}
            nextButtonLoading={nextLoading}
          />
        )}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};
export default Page;
