import React from 'react';
import Content from '../../organisms/Content';
import BaseLayout from '../BaseLayout';

export type Props = {
  content: {
    body: string;
    title: string;
  };
};

export const View: React.FC<Props> = ({ content }) => {
  return (
    <BaseLayout>
      <main>
        <Content body={content.body} title={content.title} />
      </main>
    </BaseLayout>
  );
};
export default View;
