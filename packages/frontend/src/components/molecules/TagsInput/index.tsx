import React, { useState } from 'react';
import { Form, Icon, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Props = {
  /** タグの個数に変化があった際の、コールバックハンドラー */
  handleTags: (tags: string[]) => void;
  /** フォーム部分のラベル */
  label: string;
  /** フォーム部分のプレースホルダー */
  placeholder: string;
  /** 実際に表示されるタグ */
  tags: string[];
  /** タグの表示色 */
  tagColor: SemanticCOLORS;
};

/**
 * タグの入力用フォームと、確定済みタグを表示する
 *
 * @param Props props
 * @todo タグの区切り文字を変更可能にするべきかの検討（現在はカンマ）
 */
export const View: React.FC<Props> = ({
  handleTags,
  label,
  placeholder,
  tags,
  tagColor,
}) => {
  // フォーム内のvalueはコンポーネント内で管理する
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
