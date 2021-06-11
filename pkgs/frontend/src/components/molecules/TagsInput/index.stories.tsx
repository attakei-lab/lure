import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  handleInput: (input) => input,
  input: '',
  label: 'Tags',
  placeholder: 'Input tags',
  tags: [],
  tagColor: 'grey',
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

export const Editing = ViewTemplate.bind({});
Editing.args = {
  ...defaultProps,
  input: 'sample',
};

export const WithTags = ViewTemplate.bind({});
WithTags.args = {
  ...defaultProps,
  tags: ['hello', 'world'],
};

export const WithColoredTags = ViewTemplate.bind({});
WithColoredTags.args = {
  ...defaultProps,
  tags: ['hello', 'world'],
  tagColor: 'teal',
};

export default {
  title: 'molecules/TagEditInput',
  component: View,
} as Meta;