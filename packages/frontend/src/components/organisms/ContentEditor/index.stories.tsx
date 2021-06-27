import React from 'react';
import { Form } from 'semantic-ui-react';
import { Meta } from '@storybook/react';
import { Content } from '@/applications/posts/types';
import { Props, View } from '.';

const ViewTemplate = ({ ...args }: Props) => (
  <Form>
    <View {...args} />
  </Form>
);

const defaultProps: Props = {
  content: {
    body: '',
    title: '',
    tags: [],
  },
  setContent: (content) => content,
  handleSubmit: async () => null,
  submitLabel: 'Submit',
};

export const Init = ViewTemplate.bind({});
Init.args = defaultProps;

export default {
  title: 'organisms/ContentEditor',
  component: View,
} as Meta;
