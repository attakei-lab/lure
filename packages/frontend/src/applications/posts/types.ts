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
  createdAt: Date;
  updatedAt: Date;
  createdRef: DocumentReference;
  updatedRef: DocumentReference;
} & Content;

export type PostEntity = Entity<
  Post & {
    createdBy?: UserProfileEntity;
    updatedBy?: UserProfileEntity;
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
