import { useRouter } from 'next/router';
import React, { useEffect, useContext, useState } from 'react';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/PostList';
import { FirebaseAppContext } from '@/contexts/firebase';
import { usePostsWithTagWithCursor } from '@/applications/posts/hooks';

export const Page = () => {
  const { app } = useContext(FirebaseAppContext);
  const router = useRouter();
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);
  const { posts, tag, error, loading, fetchNext, hasNext } = (() => {
    if (router.query.tag && typeof router.query.tag === 'string') {
      const tag = router.query.tag as string;
      return {
        ...usePostsWithTagWithCursor(app, router.query.tag as string),
        tag,
      };
    }
    return {
      loading: false,
      error: new Error('Invalid URL'),
      posts: undefined,
      tag: undefined,
      fetchNext: undefined,
      hasNext: undefined,
    };
  })();

  useEffect(() => {
    if (nextLoading) {
      setNextDisabled(true);
    }
    setNextDisabled(!hasNext);
  }, [nextLoading, hasNext]);

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
            headingText={`tag:${tag} の記事一覧`}
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
