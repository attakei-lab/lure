import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import MarkdownViewer from '@/components/atoms/MarkdownViewer';

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
        <MarkdownViewer source={body} />
      </div>
    </Container>
  );
};

export default View;
