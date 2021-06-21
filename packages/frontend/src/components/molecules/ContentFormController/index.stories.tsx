import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  cancelLabel: '戻る',
  formDisabled: false,
  handleSubmit: async () => null,
  handleCancel: async () => null,
  message: undefined,
  submitColor: 'teal',
  submitLabel: 'Submit',
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'molecules/ContentSubmit',
  component: View,
} as Meta;
