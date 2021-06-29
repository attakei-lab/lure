import { fromUnixTime } from 'date-fns';
import firebase from 'firebase';
import { UserProfileEntity } from '@/applications/auth/types';
import { PostEntity, PostLinks } from './types';

export const getLinks = (post: PostEntity): PostLinks => {
  return {
    detail: `/posts/${post.id}`,
    edit: `/posts/${post.id}/edit`,
  };
};

export const canEdit = (post: PostEntity, user: UserProfileEntity): boolean =>
  true;

export const canDelete = (post: PostEntity, user: UserProfileEntity): boolean =>
  post.createdBy.id === user.id;

/**
 * 筆者リスト情報の更新をする
 *
 * - 完全新規なら、単純に末尾に追加
 * - 既存なら、抜き出して末尾に追加
 *
 * @param authors 既存リスト
 * @param newAuthor メンバー
 * @returns 更新後リスト
 */
export const updateAuthors = (
  authors: UserProfileEntity[],
  newAuthor: UserProfileEntity
): UserProfileEntity[] => {
  return [
    ...authors.filter((profile) => profile.id !== newAuthor.id),
    newAuthor,
  ];
};

/**
 * 記事エンティティーのFirestore相互変換
 *
 */
export const postFirebaseConverter: firebase.firestore.FirestoreDataConverter<PostEntity> =
  {
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return {
        id: snapshot.id,
        ref: snapshot.ref,
        title: data.title,
        body: data.body,
        tags: data.tags,
        createdAt: fromUnixTime(data.createdAt.seconds),
        updatedAt: fromUnixTime(data.updatedAt.seconds),
        createdRef: data.createdRef,
        updatedRef: data.updatedRef,
        authorRefs: data.authorRefs,
      };
    },
    toFirestore: (post) => {
      return {
        title: post.title,
        body: post.body,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        createdRef: post.createdBy.ref,
        updatedRef: post.updatedBy.ref,
        authorRefs: post.authors.map((author) => author.ref),
      };
    },
  };
