import Head from 'next/head';
import React from 'react';
import { Header } from 'semantic-ui-react';
import ContentEditor from '@/components/organisms/ContentEditor';
import { Content, PostEntity, SubmitResult } from '@/applications/posts/types';
import BaseLayout from '@/components/templates/BaseLayout';
import { UploadImagesHandler } from '@/types';

export type Props = {
  content: Content | PostEntity;
  handleSubmit: () => Promise<SubmitResult>;
  headingText: string;
  setContent: (content: Content | PostEntity) => void;
  submitLabel: string;
  handleImages: UploadImagesHandler;
};

export const View: React.FC<Props> = ({
  content,
  handleSubmit,
  headingText,
  setContent,
  submitLabel,
  handleImages,
}) => {
  return (
    <>
      <Head>
        <title>{headingText} | Lure</title>
      </Head>
      <BaseLayout>
        <main>
          <Header as="h1">{headingText}</Header>
          <ContentEditor
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            submitLabel={submitLabel}
            handleImages={handleImages}
          />
        </main>
      </BaseLayout>
    </>
  );
};
export default View;
