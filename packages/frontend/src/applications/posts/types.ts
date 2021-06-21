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
};

/**
 * ユーザー記事情報
 */
export type Post = {
  created: Date;
  updated: Date;
  authorRef: DocumentReference;
} & Content;

export type PostEntity = Entity<
  Post & {
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
