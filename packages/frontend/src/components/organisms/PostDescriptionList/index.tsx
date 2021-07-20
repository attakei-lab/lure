import React from 'react';
import { Button, List } from 'semantic-ui-react';
import { PostEntity } from '@/applications/posts/types';
import PostDescription from '@/components/molecules/PostDescription';

export type Props = {
  posts: PostEntity[];
  nextButtonHandler: () => Promise<any>; // eslint-disabled: @typescript-eslint/no-explicit-any
  nextButtonDisabled: boolean;
  nextButtonLoading: boolean;
};

export const View: React.FC<Props> = ({
  nextButtonDisabled,
  nextButtonHandler,
  nextButtonLoading,
  posts,
}) => {
  return (
    <List>
      {posts.map((post) => (
        <PostDescription key={post.id} post={post} />
      ))}
      <Button
        color="teal"
        disabled={nextButtonDisabled}
        loading={nextButtonLoading}
        onClick={nextButtonHandler}
      >
        Next
      </Button>
    </List>
  );
};

export default View;
