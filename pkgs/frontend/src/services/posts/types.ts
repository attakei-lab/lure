import { DocumentReference } from '@firebase/firestore-types';
import { SemanticCOLORS } from 'semantic-ui-react';

export type Content = {
  title: string;
  body: string;
  tags: string[];
  created: Date;
  updated: Date;
};

/**
 * ユーザー記事情報
 */
export type Post = {
  authorRef: DocumentReference;
} & Content;

export type SubmitResult = {
  color?: SemanticCOLORS;
  message?: string;
  next?: () => boolean | Promise<boolean>;
};
