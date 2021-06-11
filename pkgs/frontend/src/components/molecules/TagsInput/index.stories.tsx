import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  handleTags: (tags) => tags,
  label: 'Tags',
  placeholder: 'Input tags',
  tags: [],
  tagColor: 'grey',
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

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
  title: 'molecules/TagInput',
  component: View,
} as Meta;
