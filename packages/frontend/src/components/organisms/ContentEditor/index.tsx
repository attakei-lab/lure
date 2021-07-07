import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Divider, Form } from 'semantic-ui-react';
import { Content, SubmitResult } from '@/applications/posts/types';
import MarkdownEditor from '@/components/atoms/MarkdownEditor';
import ContentFormController, {
  Message,
} from '@/components/molecules/ContentFormController';
import TagsInput from '@/components/molecules/TagsInput';
import { UploadImagesHandler } from '@/types';

export type Props = {
  content: Content;
  setContent: (content: Content) => void;
  submitLabel: string;
  handleSubmit: () => Promise<SubmitResult>;
  handleImages: UploadImagesHandler;
};

export const View: React.FC<Props> = ({
  content,
  setContent,
  handleSubmit,
  submitLabel,
  handleImages,
}) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState<Message>();
  const [body, setBody] = useState<string>(content.body);

  useEffect(() => {
    setContent({ ...content, body });
  }, [body]);

  const handleCancel = async () => {
    router.back();
  };
  const doSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    setMessage({});
    const result = await handleSubmit();
    setMessage({
      color: result.color,
      text: result.message,
    });
    result.next && setDisabled(await result.next());
  };

  return (
    <>
      <Form.Input
        fluid
        label="タイトル"
        onChange={(e) => {
          setMessage(undefined);
          setContent({ ...content, title: e.target.value });
        }}
        placeholder="タイトルを入力"
        value={content.title}
        size="huge"
      />
      <TagsInput
        handleTags={(tags) => {
          setMessage(undefined);
          setContent({ ...content, tags });
        }}
        label="タグ"
        placeholder="タグを入力（カンマを入れると自動で区切ります）"
        tags={content.tags}
        tagColor="teal"
      />
      <Divider />
      <MarkdownEditor
        handleInput={(input) => {
          setMessage(undefined);
          setBody(input);
        }}
        input={body}
        handleImages={handleImages}
      />
      <Divider />
      <Container textAlign="right">
        <ContentFormController
          submitLabel={submitLabel}
          formDisabled={disabled}
          handleCancel={handleCancel}
          handleSubmit={doSubmit}
          message={message}
        />
      </Container>
    </>
  );
};

export default View;
