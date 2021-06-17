import React from 'react';
import { UserProfileEntity } from '../../../applications/auth/types';
import { PostEntity } from '../../../applications/posts/types';
import Post from '../../organisms/Post';
import BaseLayout from '../BaseLayout';

export type Props = {
  post: PostEntity;
  user: UserProfileEntity;
};

export const View: React.FC<Props> = ({ post, user }) => {
  return (
    <BaseLayout>
      <main>
        <Post post={post} user={user} />
      </main>
    </BaseLayout>
  );
};
export default View;
