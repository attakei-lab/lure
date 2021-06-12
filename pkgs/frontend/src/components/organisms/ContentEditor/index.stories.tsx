import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  handleBody: (input) => input,
  handleTags: (input) => input,
  handleTitle: (input) => input,
  handleSubmit: async () => null,
  body: '',
  tags: [],
  title: '',
  submitLabel: 'Submit',
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

export default {
  title: 'organisms/ContentEditor',
  component: View,
} as Meta;
