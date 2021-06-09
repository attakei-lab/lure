import React from 'react';
import { Form, Icon, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Props = {
  handleInput: (input: string) => void;
  input: string;
  label: string;
  placeholder: string;
  tags: string[];
  tagColor: SemanticCOLORS;
};

export const View: React.FC<Props> = ({
  handleInput,
  input,
  label,
  placeholder,
  tags,
  tagColor,
}) => (
  <>
    <Form.Input
      fluid
      label={label}
      onChange={(e) => handleInput(e.target.value)}
      placeholder={placeholder}
      value={input}
    />
    {tags.map((tag) => (
      <Label color={tagColor} key={tag}>
        {tag}
        <Icon name="delete" />
      </Label>
    ))}
  </>
);

export default View;
