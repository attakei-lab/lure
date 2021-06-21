import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container, Divider, Form } from 'semantic-ui-react';
import { SubmitResult } from '@/applications/posts/types';
import MarkdownEditor from '@/components/atoms/MarkdownEditor';
import ContentFormController, {
  Message,
} from '@/components/molecules/ContentFormController';
import TagsInput from '@/components/molecules/TagsInput';

export type Props = {
  handleBody: (input: string) => void;
  handleTags: (input: string[]) => void;
  handleTitle: (input: string) => void;
  body: string;
  tags: string[];
  title: string;
  submitLabel: string;
  handleSubmit: () => Promise<SubmitResult>;
};

export const View: React.FC<Props> = ({
  handleBody,
  handleSubmit,
  handleTags,
  handleTitle,
  body,
  tags,
  submitLabel,
  title,
}) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState<Message>();
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
          handleTitle(e.target.value);
        }}
        placeholder="タイトルを入力"
        value={title}
        size="huge"
      />
      <TagsInput
        handleTags={(input) => {
          setMessage(undefined);
          handleTags(input);
        }}
        label="タグ"
        placeholder="タグを入力（カンマを入れると自動で区切ります）"
        tags={tags}
        tagColor="teal"
      />
      <Divider />
      <MarkdownEditor
        handleInput={(input) => {
          setMessage(undefined);
          handleBody(input);
        }}
        input={body}
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
