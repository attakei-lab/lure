import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

export const Default = ViewTemplate.bind({});
Default.args = {
  source: `
# Hello

This is a pen.
  `,
};

export const WithCodeblock = ViewTemplate.bind({});
WithCodeblock.args = {
  source: `
# Codeblock example

\`\`\`python
def hello():
    return 'world'
\`\`\`
  `,
};

export const WithFootnote = ViewTemplate.bind({});
WithFootnote.args = {
  source: `
# Footnote example

This sentence have note in foot of contents [^1]

[^1]: This is footnote
  `,
};

export default {
  title: 'atoms/MarkdownViewer',
  component: View,
} as Meta;
