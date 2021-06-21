import React from 'react';
import { List } from 'semantic-ui-react';
import { PostEntity } from '@/applications/posts/types';
import PostDescription from '@/components/molecules/PostDescription';

export type Props = {
  posts: PostEntity[];
};

export const View: React.FC<Props> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <PostDescription key={post.id} post={post} />
      ))}
    </List>
  );
};

export default View;
