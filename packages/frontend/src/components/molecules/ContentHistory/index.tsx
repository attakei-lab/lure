import { differenceInMinutes, formatISO } from 'date-fns';
import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

export type Props = {
  /** 作成日時 */
  created: Date;
  /** 更新日時 */
  updated: Date;
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
export const View: React.FC<Props> = ({ created, updated }) => {
  const now = new Date();
  return (
    <Container>
      <Header as="h3" dividing>
        History
      </Header>
      <List>
        <List.Item>最終更新: {formatDate(updated, now)}</List.Item>
        <List.Item>新規作成: {formatDate(created, now)}</List.Item>
      </List>
    </Container>
  );
};

export default View;
