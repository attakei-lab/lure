import React from 'react';
import { Form } from 'semantic-ui-react';
import { Meta } from '@storybook/react';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => (
  <Form>
    <View {...args} />
  </Form>
);

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
