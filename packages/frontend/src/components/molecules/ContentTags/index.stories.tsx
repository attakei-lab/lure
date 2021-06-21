import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  tags: ['hello', 'world'],
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'molecules/ContentTags',
  component: View,
} as Meta;
