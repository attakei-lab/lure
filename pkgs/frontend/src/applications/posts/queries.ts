import firebase from 'firebase';
import { userProfileConverter } from '@/applications/auth/services';
import { UserProfileEntity } from '@/applications/auth/types';
import { postFirebaseConverter } from './services';
import { PostEntity } from './types';

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
  entity.author = (
    await entity.authorRef.withConverter(userProfileConverter).get()
  ).data();
  return entity;
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
    .withConverter(postFirebaseConverter);
  const snapshot = await ref.get();
  const entities = snapshot.docs.map((snap) => snap.data());
  const authors = new Map<string, UserProfileEntity>();
  await Promise.all(
    entities.map(async (entity) => {
      if (authors.has(entity.authorRef.id)) {
        return;
      }
      authors.set(
        entity.authorRef.id,
        (
          await entity.authorRef.withConverter(userProfileConverter).get()
        ).data()
      );
    })
  );
  return entities.map((entity) => {
    entity.author = authors.get(entity.authorRef.id);
    return entity;
  });
};
