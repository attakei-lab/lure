import React from 'react';
import { Button, Label, SemanticCOLORS } from 'semantic-ui-react';

export type Message = {
  text?: string;
  color?: SemanticCOLORS;
};

export type Props = {
  buttonColor?: SemanticCOLORS;
  buttonLabel: string;
  formDisabled?: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  message?: Message;
};

export const View: React.FC<Props> = ({
  buttonColor,
  buttonLabel,
  formDisabled,
  handleSubmit,
  message,
}) => (
  <>
    {message && (
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
