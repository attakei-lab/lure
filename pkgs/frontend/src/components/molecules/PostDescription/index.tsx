import { formatISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Image, Label, List } from 'semantic-ui-react';
import { getLinks } from '@/applications/posts/services';
import { PostEntity } from '@/applications/posts/types';

export type Props = {
  /** 記事情報 */
  post: PostEntity;
};

/**
 * 記事の概要情報を表示させる
 *
 * @param Props props
 */
export const View: React.FC<Props> = ({ post }) => {
  const links = getLinks(post);
  return (
    <Link href={links.detail} passHref>
      <List.Item>
        {post.author.avatarUrl && <Image src={post.author.avatarUrl} />}
        <List.Content>
          <List.Header as="h2">{post.title}</List.Header>
          <List.Description style={{ paddingTop: '0.5rem' }}>
            {formatISO(post.updated)}
            {` | `}
            {post.tags.map((tag) => (
              <Link href={`/tags/${tag}`} key={tag} passHref>
                <Label color="teal" size="small">
                  {tag}
                </Label>
              </Link>
            ))}
          </List.Description>
        </List.Content>
      </List.Item>
    </Link>
  );
};

export default View;
