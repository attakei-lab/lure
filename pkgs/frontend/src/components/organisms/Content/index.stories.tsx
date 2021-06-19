import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  title: 'Hello world',
  body: `
## Hello

This is a pen. [^1]

[^1]: This is footnote

\`\`\`python
def hello():
    return 'world'
\`\`\`
  `,
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'organisms/Content',
  component: View,
} as Meta;
