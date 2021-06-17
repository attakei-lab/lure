import Link from 'next/link';
import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { UserProfileEntity } from '../../../applications/auth/types';
import {
  canDelete,
  canEdit,
  getLinks,
} from '../../../applications/posts/services';
import { PostEntity } from '../../../applications/posts/types';

export type Props = {
  post: PostEntity;
  user: UserProfileEntity;
};

export const View: React.FC<Props> = ({ post, user }) => (
  <Container>
    <Header as="h3" dividing>
      Commands
    </Header>
    {/* 標準コマンド */}
    <Button.Group>
      {canEdit(post, user) ? (
        <Link href={getLinks(post).edit} passHref>
          <Button color="brown">編集</Button>
        </Link>
      ) : (
        <Button disabled>編集</Button>
      )}
      {canDelete(post, user) ? (
        <Button color="red">削除</Button>
      ) : (
        <Button disabled>削除</Button>
      )}
    </Button.Group>
  </Container>
);

export default View;
