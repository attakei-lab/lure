import React from 'react';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import { UserProfileEntity } from '../../../applications/auth/types';
import { PostEntity } from '../../../applications/posts/types';
import ContentBody from '../../atoms/ContentBody';
import ContentCommands from '../../molecules/ContentCommands';
import ContentHistory from '../../molecules/ContentHistory';
import ContentTags from '../../molecules/ContentTags';

export type Props = {
  post: PostEntity;
  user: UserProfileEntity;
};

export const View: React.FC<Props> = ({ post, user }) => {
  return (
    <>
      <Container>
        <Header as="h1">{post.title}</Header>
        <Grid dvided={true}>
          <Grid.Column width={12} role="article">
            <ContentBody source={post.body} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Container>
              <ContentCommands post={post} user={user} />
              <Divider hidden />
              <ContentTags tags={post.tags} />
              <Divider hidden />
              <ContentHistory created={post.created} updated={post.updated} />
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default View;
