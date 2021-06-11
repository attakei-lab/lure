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
