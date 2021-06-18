import React from 'react';
import Content from '@/components/organisms/Content';
import BaseLayout from '@/components/templates/BaseLayout';

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
