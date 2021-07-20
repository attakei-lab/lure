import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { HookProcess } from '@/applications/types';
import {
  fetchPost,
  fetchPosts,
  fetchPostsByTag,
  fetchPostsForCursor,
} from './queries';
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

/**
 * Firebaseから記事一覧を取得する。
 *
 * 初期状態では、`loading = true`の状態だが、後続の非同期処理として記事取得を行い、
 * `loading = false`への変更と同時に以下の処理を追加実施する。
 * - 取得成功時：`post`に記事データを格納
 * - 取得失敗時：`error`にエラーオブジェクトを格納
 *
 * なお、データがないときも、空の配列を格納して成功とみなす
 *
 * @param app Firebaseアプリケーション
 * @returns
 */
export const usePosts = (
  app: firebase.app.App
): HookProcess<{ posts: PostEntity[] }> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [posts, setPosts] = useState<PostEntity[]>();

  useEffect(() => {
    (async () => {
      try {
        const posts = await fetchPosts(app);
        setPosts(posts);
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
    posts,
  };
};

export const usePostsWithTag = (
  app: firebase.app.App,
  tag: string
): HookProcess<{ posts: PostEntity[] }> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [posts, setPosts] = useState<PostEntity[]>();

  useEffect(() => {
    (async () => {
      try {
        const posts = await fetchPostsByTag(app, tag);
        setPosts(posts);
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
    posts,
  };
};

export const usePostsWithCursor = (
  app: firebase.app.App
): HookProcess<{
  posts: PostEntity[];
  fetchNext: () => Promise<void>;
  hasNext: boolean;
}> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [latest, setLatest] = useState<firebase.firestore.DocumentSnapshot>();
  const [hasNext, setHasNext] = useState<boolean>();

  const fetchNext = async () => {
    try {
      const [nextPosts, nextLatest] = await fetchPostsForCursor(app, latest);
      setPosts([...posts, ...nextPosts]);
      setLatest(nextLatest);
      setHasNext(nextPosts.length > 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //初回に先頭からの記事取得をする
  useEffect(() => {
    (async () => {
      await fetchNext();
    })();
  }, []);

  return {
    loading,
    error,
    posts,
    fetchNext,
    hasNext,
  };
};
