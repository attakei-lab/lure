import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  post: {
    id: 'mocked-id',
    ref: null,
    createdRef: null,
    updatedRef: null,
    createdBy: {
      id: 'my-user',
      ref: null,
      name: 'test-user',
      avatarUrl: 'http://example.com',
      created: new Date(),
    },
    updatedBy: {
      id: 'my-user',
      ref: null,
      name: 'test-user',
      avatarUrl: 'http://example.com',
      created: new Date(),
    },
    title: 'Example for storybook',
    body: `
## Hello

This is a pen. [^1]

[^1]: This is footnote

\`\`\`python
def hello():
    return 'world'
\`\`\`
      `,
    tags: ['hello', 'world', 'example'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  user: {
    id: 'not-me',
    ref: null,
    name: 'other-user',
    avatarUrl: 'http://example.com',
    created: new Date(),
  },
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export const CanDelete = ViewTemplate.bind({});
CanDelete.args = {
  ...defaultProps,
  user: defaultProps.post.author,
};

export default {
  title: 'organisms/PostContent',
  component: View,
} as Meta;
