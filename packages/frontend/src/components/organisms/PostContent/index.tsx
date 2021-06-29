import React from 'react';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import { UserProfileEntity } from '@/applications/auth/types';
import { PostEntity } from '@/applications/posts/types';
import MarkdownViewer from '@/components/atoms/MarkdownViewer';
import PostCommands from '@/components/molecules/PostCommands';
import ContentHistory from '@/components/molecules/ContentHistory';
import ContentTags from '@/components/molecules/ContentTags';

export type Props = {
  post: PostEntity;
  user: UserProfileEntity;
};

export const View: React.FC<Props> = ({ post, user }) => {
  return (
    <>
      <Container>
        <Header as="h1">{post.title}</Header>
        <Grid>
          <Grid.Column width={12} role="article">
            <Divider hidden />
            <MarkdownViewer source={post.body} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Container>
              <PostCommands post={post} user={user} />
              <Divider hidden />
              <ContentTags tags={post.tags} />
              <Divider hidden />
              <ContentHistory
                created={post.createdAt}
                updated={post.updatedAt}
              />
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default View;
