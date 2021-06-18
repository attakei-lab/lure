import firebase from 'firebase';
import { userProfileConverter } from '../auth/services';
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
