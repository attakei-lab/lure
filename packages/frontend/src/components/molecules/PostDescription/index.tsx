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
    <List.Item>
      {post.createdBy.avatarUrl && (
        <Image circular size="tiny" src={post.createdBy.avatarUrl} />
      )}
      <List.Content>
        <List.Header as="h2">
          <Link href={links.detail}>{post.title}</Link>
        </List.Header>
        <List.Description>
          {formatISO(post.updatedAt)}
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
  );
};

export default View;
