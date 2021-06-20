import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Wrapper as ErrorWrapper } from '@/components/templates/Error';
import { Wrapper as LoadingWrapper } from '@/components/templates/Loading';
import ViewTemplate from '@/components/templates/Post';
import { FirebaseAppContext } from '@/contexts/firebase';
import { usePost } from '@/applications/posts/hooks';

/**
 * URLとして指定された記事情報を取得して表示する
 *
 * - 取得処理中はローディング画面を表示する
 * - 「指定IDの記事がない」などの場合は、取得処理集合にエラー用画面を表示する
 * - 正しく取得できた場合は、記事データをTempplateに従って表示する
 */
export const Page = () => {
  const router = useRouter();
  const { app, profile } = useContext(FirebaseAppContext);
  const { post, error, loading } = (() => {
    if (router.query.id && typeof router.query.id === 'string') {
      return usePost(app, router.query.id as string);
    }
    return {
      loading: false,
      error: new Error('Invalid URL'),
      post: undefined,
    };
  })();

  return (
    <LoadingWrapper loading={loading}>
      <ErrorWrapper error={error}>
        {post && <ViewTemplate post={post} user={profile} />}
      </ErrorWrapper>
    </LoadingWrapper>
  );
};

export default Page;
