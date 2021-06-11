import React, { useState } from 'react';
import { Form, Icon, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Props = {
  handleTags: (tags: string[]) => void;
  label: string;
  placeholder: string;
  tags: string[];
  tagColor: SemanticCOLORS;
};

export const View: React.FC<Props> = ({
  handleTags,
  label,
  placeholder,
  tags,
  tagColor,
}) => {
  const [value, setValue] = useState('');

  const handleInput = (val: string) => {
    if (!val.endsWith(',')) {
      setValue(val);
      return;
    }
    const tag = val.substring(0, val.length - 1);
    if (!tags.includes(tag)) {
      handleTags([...tags, tag]);
    }
    setValue('');
  };

  return (
    <>
      <Form.Input
        fluid
        label={label}
        onChange={(e) => handleInput(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {tags.map((tag) => (
        <Label color={tagColor} key={tag}>
          {tag}
          <Icon name="delete" />
        </Label>
      ))}
    </>
  );
};

export default View;
