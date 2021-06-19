import React from 'react';
import { Button, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Message = {
  text?: string;
  color?: SemanticCOLORS;
};

export type Props = {
  /** 処理ボタンの色 */
  buttonColor?: SemanticCOLORS;
  /** 処理ボタン内のテキスト */
  buttonLabel: string;
  /** ボタンの押下コントロール */
  formDisabled?: boolean;
  /** 処理開始後の実処理 */
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  /** 処理内容に応じて表示するメッセージ */
  message?: Message;
};

/**
 * 記事の処理実行系コンポーネントを表示する
 *
 * @param Props props
 * @returns
 */
export const View: React.FC<Props> = ({
  buttonColor,
  buttonLabel,
  formDisabled,
  handleSubmit,
  message,
}) => (
  <>
    {message && message.text && (
      <Label basic color={message.color || 'red'} pointing="right">
        {message.text}
      </Label>
    )}
    <Button
      color={buttonColor || 'teal'}
      onClick={handleSubmit}
      disabled={formDisabled}
    >
      {buttonLabel}
    </Button>
  </>
);

export default View;
