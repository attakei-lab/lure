import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  handleInput: (input) => input,
  input: '',
  handleImages: () => null,
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

export default {
  title: 'atoms/MarkdownEditor',
  component: View,
} as Meta;
