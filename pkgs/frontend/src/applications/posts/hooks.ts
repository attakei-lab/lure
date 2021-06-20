import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { HookProcess } from '@/applications/types';
import { fetchPost } from './queries';
import { PostEntity } from './types';

/**
 * 記事IDをもとにFirebaseから記事を取得する。
 *
 * 初期状態では、`loading = true`の状態だが、後続の非同期処理として記事取得を行い、
 * `loading = false`への変更と同時に以下の処理を追加実施する。
 * - 取得成功時：`post`に記事データを格納
 * - 取得失敗時：`error`にエラーオブジェクトを格納
 *
 * @param app Firebaseアプリケーション
 * @param postId 記事ID
 * @returns
 */
export const usePost = (
  app: firebase.app.App,
  postId: string
): HookProcess<{ post: PostEntity }> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [post, setPost] = useState<PostEntity>();

  useEffect(() => {
    (async () => {
      try {
        const post = await fetchPost(app, postId);
        if (post === null) {
          throw new Error('Not found');
        }
        setPost(post);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    error,
    post,
  };
};
