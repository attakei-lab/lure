export type SlackConfig = {
  webhook_url: string;
};

/**
 * 記事イベントの情報
 */
export type PostEvent = 'created' | 'updated';
