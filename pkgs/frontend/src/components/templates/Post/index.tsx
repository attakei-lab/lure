import React from 'react';
import { UserProfileEntity } from '@/applications/auth/types';
import { PostEntity } from '@/applications/posts/types';
import PostContent from '@/components/organisms/PostContent';
import BaseLayout from '@/components/templates/BaseLayout';

export type Props = {
  post: PostEntity;
  user: UserProfileEntity;
};

export const View: React.FC<Props> = ({ post, user }) => {
  return (
    <BaseLayout>
      <main>
        <PostContent post={post} user={user} />
      </main>
    </BaseLayout>
  );
};
export default View;
