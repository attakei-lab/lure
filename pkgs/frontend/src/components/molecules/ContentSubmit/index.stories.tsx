import React from 'react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => <View {...args} />;

const defaultProps: Props = {
  buttonColor: 'teal',
  buttonLabel: 'Submit',
  formDisabled: false,
  handleSubmit: async () => null,
  message: undefined,
};

export const Default = ViewTemplate.bind({});
Default.args = defaultProps;

export default {
  title: 'molecules/ContentSubmit',
  component: View,
} as Meta;
