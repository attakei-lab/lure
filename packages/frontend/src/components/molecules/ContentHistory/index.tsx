import { UserProfileEntity } from '@/applications/auth/types';
import { differenceInMinutes, formatISO } from 'date-fns';
import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

export type Props = {
  /** 作成日時 */
  createdAt: Date;
  createdBy: UserProfileEntity;
  /** 更新日時 */
  updatedAt: Date;
  updatedBy: UserProfileEntity;
};

/**
 * 現在時刻との差分に応じてヒューマンリーダブルな日時情報を作成する
 *
 * @param date 対象の日時
 * @param date 現在の日時
 * @returns 変換された文字列
 * @todo バリエーションの追加
 */
export const formatDate = (date: Date, now: Date): string => {
  const diffMin = differenceInMinutes(now, date);
  if (diffMin < 5) {
    return 'ついさっき';
  }
  return formatISO(date);
};

/**
 * ヘッダーと併せて、更新履歴情報を表示させる
 *
 * @param Props props
 */
export const View: React.FC<Props> = ({
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
}) => {
  const now = new Date();
  return (
    <Container>
      <Header as="h3" dividing>
        History
      </Header>
      <Container>
        <Header as="h4" dividing>
          最終更新
        </Header>
        <List bulleted>
          <List.Item>{formatDate(updatedAt, now)}</List.Item>
          <List.Item>{updatedBy.name}</List.Item>
        </List>
        <Header as="h4" dividing>
          新規作成
        </Header>
        <List bulleted>
          <List.Item>{formatDate(createdAt, now)}</List.Item>
          <List.Item>{createdBy.name}</List.Item>
        </List>
      </Container>
    </Container>
  );
};

export default View;
