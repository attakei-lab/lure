import firebase from 'firebase';
import { DocumentReference } from '@firebase/firestore-types';
import { UserProfile } from './types';

/**
 * データストアからユーザー情報を取得する。存在しない場合は、新規作成する
 *
 * @param app Firebaseアプリケーション
 * @param user 認証済みFirebaseユーザー
 * @return ユーザー情報の実オブジェクトと、Firestoreのリファレンス型
 */
export const configureUserProfile = async (
  app: firebase.app.App,
  user: firebase.User
): Promise<[UserProfile, DocumentReference]> => {
  const docRef = app.firestore().doc(`users/${user.uid}`);
  const snap = await docRef.get();
  let profile: UserProfile;
  if (snap.exists) {
    profile = {
      name: snap.data().name,
      avatarUrl: snap.data().avatarUrl,
      created: snap.data().created,
    };
  } else {
    profile = {
      name: user.displayName,
      avatarUrl: user.photoURL,
      created: new Date(),
    };
    await docRef.set(profile);
  }
  return [profile, docRef];
};
