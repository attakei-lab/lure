import React from 'react';
import { Divider, Form } from 'semantic-ui-react';
import MarkdownEditor from '../../molecules/MarkdownEditor';
import TagsInput from '../../molecules/TagsInput';

export type Props = {
  handleBody: (input: string) => void;
  handleTags: (input: string[]) => void;
  handleTitle: (input: string) => void;
  body: string;
  tags: string[];
  title: string;
};

export const View: React.FC<Props> = ({
  handleBody,
  handleTags,
  handleTitle,
  body,
  tags,
  title,
}) => (
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
  </>
);

export default View;
