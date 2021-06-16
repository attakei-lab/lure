import firebase from 'firebase';
import { fetchUserProfile } from './queries';
import { UserProfileEntity } from './types';

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
): Promise<UserProfileEntity> => {
  const [profile, docRef] = await fetchUserProfile(app, user.uid);
  if (profile) {
    return profile;
  }
  const newProfile = {
    id: user.uid,
    ref: docRef,
    name: user.displayName,
    avatarUrl: user.photoURL,
    created: new Date(),
  };
  await docRef.set(newProfile);
  return newProfile;
};
