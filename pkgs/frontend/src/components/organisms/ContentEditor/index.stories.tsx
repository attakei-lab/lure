import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  handleBodyInput: (input) => input,
  handleTagsInput: (input) => input,
  handleTitleInput: (input) => input,
  bodyInput: '',
  tagsInput: '',
  tags: [],
  titleInput: '',
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

export default {
  title: 'organisms/ContentEditor',
  component: View,
} as Meta;
