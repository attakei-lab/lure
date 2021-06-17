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
