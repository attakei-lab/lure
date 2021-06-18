import { DocumentReference } from '@firebase/firestore-types';
import { SemanticCOLORS } from 'semantic-ui-react';
import { UserProfileEntity } from '@/applications/auth/types';
import { Entity } from '@/applications/types';

/**
 * 記事データとしての実体
 */
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

export type PostEntity = Entity<
  Content & {
    authorRef: DocumentReference;
    // 著者情報
    author?: UserProfileEntity;
  }
>;

export type PostLinks = {
  detail: string;
  edit: string;
};

export type SubmitResult = {
  color?: SemanticCOLORS;
  message?: string;
  next?: () => boolean | Promise<boolean>;
};
