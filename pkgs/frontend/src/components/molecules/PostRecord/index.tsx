import Link from 'next/link';
import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { getLinks } from '@/applications/posts/services';
import { PostEntity } from '@/applications/posts/types';

export type Props = {
  post: PostEntity;
};

export const View: React.FC<Props> = ({ post }) => {
  const links = getLinks(post);
  return (
    <Link href={links.detail} passHref>
      <List.Item>
        {post.author.avatarUrl && <Image src={post.author.avatarUrl} />}
        <List.Content>
          <List.Header>{post.title}</List.Header>
        </List.Content>
      </List.Item>
    </Link>
  );
};

export default View;
