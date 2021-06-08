import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import ContentBody from '../../atoms/ContentBody';

export type Props = {
  body: string;
  title: string;
};

export const View: React.FC<Props> = ({ body, title }) => {
  return (
    <Container>
      <Header as="h1">{title}</Header>
      <Divider />
      <div role="article">
        <ContentBody source={body} />
      </div>
    </Container>
  );
};

export default View;
