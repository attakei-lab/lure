import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  createdAt: new Date(),
  createdBy: {
    id: 'my-user',
    ref: null,
    name: 'test-user',
    avatarUrl: 'http://example.com',
    created: new Date(),
  },
  updatedAt: new Date(),
  updatedBy: {
    id: 'my-user',
    ref: null,
    name: 'test-user',
    avatarUrl: 'http://example.com',
    created: new Date(),
  },
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'molecules/ContentHistory',
  component: View,
} as Meta;
