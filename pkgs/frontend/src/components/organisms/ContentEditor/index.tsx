import React, { useState } from 'react';
import { Container, Divider, Form } from 'semantic-ui-react';
import { SubmitResult } from '../../../services/contents/types';
import ContentSubmit, { Message } from '../../molecules/ContentSubmit';
import MarkdownEditor from '../../molecules/MarkdownEditor';
import TagsInput from '../../molecules/TagsInput';

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
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState<Message>();
  const doSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    const result = await handleSubmit();
    setMessage({
      color: result.color,
      text: result.message,
    });
    result.next && result.next(setDisabled);
  };

  return (
    <>
      <Form.Input
        fluid
        label="タイトル"
        onChange={(e) => handleTitle(e.target.value)}
        placeholder="タイトルを入力"
        value={title}
        size="huge"
      />
      <TagsInput
        handleTags={handleTags}
        label="タグ"
        placeholder="タグを入力（カンマを入れると自動で区切ります）"
        tags={tags}
        tagColor="teal"
      />
      <Divider />
      <MarkdownEditor handleInput={handleBody} input={body} />
      <Divider />
      <Container textAlign="right">
        <ContentSubmit
          buttonLabel={submitLabel}
          formDisabled={disabled}
          handleSubmit={doSubmit}
          message={message}
        />
      </Container>
    </>
  );
};

export default View;
