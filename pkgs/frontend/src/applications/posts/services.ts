import { fromUnixTime } from 'date-fns';
import firebase from 'firebase';
import { userProfileConverter } from '../auth/services';
import { UserProfileEntity } from '../auth/types';
import { PostEntity, PostLinks } from './types';

export const getLinks = (post: PostEntity): PostLinks => {
  return {
    detail: `/posts/${post.id}`,
    edit: `/posts/${post.id}/edit`,
  };
};

export const canEdit = (post: PostEntity, user: UserProfileEntity): boolean =>
  post.author.id === user.id;

export const canDelete = (post: PostEntity, user: UserProfileEntity): boolean =>
  post.author.id === user.id;

/**
 * 記事エンティティーのFirestore相互変換
 *
 * 特性として、リレーション構造にあるユーザ情報を取得するために、Promiseでラップしている
 */
export const postFirebaseConverter: firebase.firestore.FirestoreDataConverter<
  Promise<PostEntity>
> = {
  fromFirestore: async (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ref: snapshot.ref,
      title: data.title,
      body: data.body,
      tags: data.tags,
      created: fromUnixTime(data.created.seconds),
      updated: fromUnixTime(data.updated.seconds),
      author: (
        await data.authorRef.withConverter(userProfileConverter).get()
      ).data(),
    };
  },
  toFirestore: async (pPost) => {
    const post = await pPost;
    return {
      titie: post.title,
      body: post.body,
      tags: post.tags,
      created: post.created,
      updated: post.updated,
      authorRef: post.author.ref,
    };
  },
};
