import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import {
  IncomingWebhook,
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@slack/webhook';
import { BackendConfig } from '../../types';
import { PostEvent } from './types';

/**
 * Slack通知用のブロック生成
 *
 * @param url リンク先URL
 * @param title 記事タイトル
 * @param author 記事編集者
 * @param event 記事イベントの種類
 * @returns
 */
export const createBlock = (
  url: string,
  title: string,
  author: string,
  event: PostEvent
): IncomingWebhookSendArguments => {
  const [headerText, authorText] = (() => {
    let headerLabel = '';
    let authorLabel = '';
    switch (event) {
      case 'created':
        headerLabel = '新着';
        authorLabel = '執筆者';
        break;
      case 'updated':
        headerLabel = '更新';
        authorLabel = '更新者';
        break;
    }
    return [
      `${headerLabel ? headerLabel + ': ' : ''}${title}`,
      `${authorLabel ? authorLabel + ': ' : ''}${author}`,
    ];
  })();
  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: headerText,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        fields: [
          {
            type: 'plain_text',
            text: authorText,
          },
        ],
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '開く',
          },
          value: 'open-link',
          url,
          action_id: 'open-link',
        },
      },
    ],
  };
};

/**
 * 記事データ更新を全て補足して、通知する
 *
 * @param postSnapshot 記事データのFSスナップショット
 * @param cfg Functionsの設定オブジェクト
 * @param event イベントの種類
 * @returns
 */
export const notifyPostEvent = async (
  postSnapshot: DocumentSnapshot,
  cfg: BackendConfig,
  event: PostEvent
): Promise<void> => {
  const post = postSnapshot.data();
  const webhook = new IncomingWebhook(cfg.slack!.webhook_url);
  const message = createBlock(
    `${cfg.app.url}/posts/${postSnapshot.id}`,
    post!.title,
    (await post!.updatedRef.get()).data().name,
    event
  );
  return webhook.send(message).then((result: IncomingWebhookResult) => {
    console.debug(result);
  });
};
