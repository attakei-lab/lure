import React from 'react';
import { Remark } from 'react-remark';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';

export type Props = {
  source: string;
};

export const View: React.FC<Props> = ({ source }) => (
  <Remark remarkPlugins={[remarkGfm, [remarkFootnotes, { inlineNotes: true }]]}>
    {source}
  </Remark>
);

export default View;
