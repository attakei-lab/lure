import React from 'react';
import { Remark } from 'react-remark';
import footnotes from 'remark-footnotes';
import gfm from 'remark-gfm';
import highlightjs from 'remark-highlight.js';
import externalLinks from 'remark-external-links';
import components from './wrappers';

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
      gfm,
      highlightjs,
      [footnotes, { inlineNotes: true }],
      [externalLinks, { rel: 'noreferrer' }],
    ]}
    rehypeReactOptions={{
      components,
    }}
  >
    {source}
  </Remark>
);

export default View;
