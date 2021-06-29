import firebase from 'firebase';
import { userProfileConverter } from '@/applications/auth/services';
import { UserProfileEntity } from '@/applications/auth/types';
import { postFirebaseConverter } from './services';
import { PostEntity } from './types';

/**
 * 筆者情報を一括で取得して、記事情報に注入する
 *
 * @param entities 元の記事リスト
 * @returns Autorを実体として保持する記事リスト
 */
export const bindAuthors = async (
  entities: PostEntity[]
): Promise<PostEntity[]> => {
  // 最初からmapのみも考えたが、パフォーマンスを懸念して筆者情報は1人1回しか取らないようにする
  const authors = new Map<string, UserProfileEntity>();
  const authorRefs = new Map(
    entities
      .map((e) => e.authorRefs)
      .flat()
      .map((ref) => [ref.id, ref])
  );
  await Promise.all(
    Array.from(authorRefs.entries()).map(async ([id, ref]) => {
      authors.set(
        id,
        (await ref.withConverter(userProfileConverter).get()).data()
      );
    })
  );
  return entities.map((entity) => {
    entity.authors = entity.authorRefs.map((ref) => authors.get(ref.id));
    entity.createdBy = authors.get(entity.createdRef.id);
    entity.updatedBy = authors.get(entity.updatedRef.id);
    return entity;
  });
};

/**
 * 指定したIDの記事情報を、加工済み状態で返す
 *
 */
export const fetchPost = async (
  app: firebase.app.App,
  postId: string
): Promise<PostEntity | null> => {
  const docRef = app
    .firestore()
    .doc(`posts/${postId}`)
    .withConverter(postFirebaseConverter);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return null;
  }
  const entity = snapshot.data();
  return (await bindAuthors([entity]))[0];
};

/**
 * 記事を一括で取得する
 */
export const fetchPosts = async (
  app: firebase.app.App
): Promise<PostEntity[]> => {
  const ref = app
    .firestore()
    .collection(`posts`)
    .withConverter(postFirebaseConverter)
    .orderBy('updatedAt', 'desc');
  const snapshot = await ref.get();
  const entities = snapshot.docs.map((snap) => snap.data());
  return bindAuthors(entities);
};

/**
 * 特定タグの記事を一括で取得する
 */
export const fetchPostsByTag = async (
  app: firebase.app.App,
  tag: string
): Promise<PostEntity[]> => {
  const ref = app
    .firestore()
    .collection(`posts`)
    .withConverter(postFirebaseConverter)
    .where('tags', 'array-contains', tag)
    .orderBy('updatedAt', 'desc');
  const snapshot = await ref.get();
  const entities = snapshot.docs.map((snap) => snap.data());
  return bindAuthors(entities);
};
