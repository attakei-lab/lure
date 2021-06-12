import React from 'react';
import { SemanticCOLORS } from 'semantic-ui-react';

/**
 * 記事情報
 */
export type Content = {
  title: string;
  body: string;
  tags: string[];
  created: number;
  updated: number;
};

export type ContentWithId = Content & {
  id: string;
};

export type SubmitResult = {
  color?: SemanticCOLORS;
  message?: string;
  next?: (
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
};
