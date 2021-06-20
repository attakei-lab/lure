import React from 'react';
import { Button, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Message = {
  text?: string;
  color?: SemanticCOLORS;
};

export type Props = {
  /** キャンセル用ボタンのテキスト */
  cancelLabel?: string;
  /** ボタンの押下コントロール */
  formDisabled?: boolean;
  /** キャンセル処理の実処理 */
  handleCancel: (e: React.FormEvent) => Promise<void>;
  /** 処理開始後の実処理 */
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  /** 処理内容に応じて表示するメッセージ */
  message?: Message;
  /** 処理ボタンの色 */
  submitColor?: SemanticCOLORS;
  /** 処理ボタン内のテキスト */
  submitLabel: string;
};

/**
 * 記事の処理実行系コンポーネントを表示する
 *
 * @param Props props
 * @returns
 */
export const View: React.FC<Props> = ({
  cancelLabel,
  formDisabled,
  handleCancel,
  handleSubmit,
  message,
  submitColor,
  submitLabel,
}) => (
  <>
    {message && message.text && (
      <Label basic color={message.color || 'red'} pointing="right">
        {message.text}
      </Label>
    )}
    <Button.Group>
      <Button
        color={submitColor || 'teal'}
        onClick={handleSubmit}
        disabled={formDisabled}
      >
        {submitLabel}
      </Button>
      <Button color="grey" onClick={handleCancel} disabled={formDisabled}>
        {cancelLabel || 'キャンセル'}
      </Button>
    </Button.Group>
  </>
);

export default View;
