import React from 'react';
import { Divider, Form } from 'semantic-ui-react';
import MarkdownEditor from '../../molecules/MarkdownEditor';
import TagsInput from '../../molecules/TagsInput';

export type Props = {
  handleBodyInput: (input: string) => void;
  handleTagsInput: (input: string) => void;
  handleTitleInput: (input: string) => void;
  bodyInput: string;
  tags: string[];
  tagsInput: string;
  titleInput: string;
};

export const View: React.FC<Props> = ({
  handleBodyInput,
  handleTagsInput,
  handleTitleInput,
  bodyInput,
  tags,
  tagsInput,
  titleInput,
}) => (
  <>
    <Form.Input
      fluid
      label="タイトル"
      onChange={(e) => handleTitleInput(e.target.value)}
      placeholder="タイトルを入力"
      value={titleInput}
      size="huge"
    />
    <TagsInput
      handleInput={handleTagsInput}
      input={tagsInput}
      label="タグ"
      placeholder="タグを入力（カンマを入れると自動で区切ります）"
      tags={tags}
      tagColor="teal"
    />
    <Divider />
    <MarkdownEditor handleInput={handleBodyInput} input={bodyInput} />
  </>
);

export default View;
