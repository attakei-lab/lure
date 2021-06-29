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
      };
    },
  };
