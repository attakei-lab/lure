import React from 'react';
import { List } from 'semantic-ui-react';
import { PostEntity } from '../../../applications/posts/types';
import PostRecord from '../../molecules/PostRecord';

export type Props = {
  posts: PostEntity[];
};

export const View: React.FC<Props> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <PostRecord key={post.id} post={post} />
      ))}
    </List>
  );
};

export default View;
