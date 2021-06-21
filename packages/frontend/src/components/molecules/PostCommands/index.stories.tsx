import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  post: {
    id: 'mocked-id',
    ref: null,
    authorRef: null,
    author: {
      id: 'my-user',
      ref: null,
      name: 'test-user',
      avatarUrl: 'http://example.com',
      created: new Date(),
    },
    body: '',
    tags: [],
    title: '',
    created: new Date(),
    updated: new Date(),
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
  title: 'molecules/PostCommands',
  component: View,
} as Meta;
