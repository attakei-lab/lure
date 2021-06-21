import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  created: new Date(),
  updated: new Date(),
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'molecules/ContentHistory',
  component: View,
} as Meta;
