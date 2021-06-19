import Link from 'next/link';
import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { UserProfileEntity } from '@/applications/auth/types';
import { canDelete, canEdit, getLinks } from '@/applications/posts/services';
import { PostEntity } from '@/applications/posts/types';

export type Props = {
  /** 記事本体 */
  post: PostEntity;
  /** 現在のユーザー情報 */
  user: UserProfileEntity;
};

/**
 * 記事の操作用ボタンを表示する。
 * 記事情報と表示ユーザーの関係性から表示内容等が変化する
 *
 * @param Props props
 */
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
