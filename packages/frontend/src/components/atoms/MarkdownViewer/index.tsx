import React from 'react';
import { Remark } from 'react-remark';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
import remarkHighlightjs from 'remark-highlight.js';
import externalLinks from 'remark-external-links';
import 'highlight.js/styles/default.css';

export type Props = {
  /** Markdownテキストソース */
  source: string;
};

/**
 * 受け取ったMarkdownソースを加工してレンダリングする
 *
 * @param Props props
 * @todo コードブロックのサポート（要Prism.js）
 */
export const View: React.FC<Props> = ({ source }) => (
  <Remark
    remarkPlugins={[
      remarkGfm,
      remarkHighlightjs,
      [remarkFootnotes, { inlineNotes: true }],
      [externalLinks, { rel: 'noreferrer' }],
    ]}
  >
    {source}
  </Remark>
);

export default View;
