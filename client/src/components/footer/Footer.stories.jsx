import React from 'react';

import { FooterStorybook } from './FooterStorybook';

export default {
  title: 'Footer',
  component: FooterStorybook,
};

const Template = (args) => <FooterStorybook {...args} />;

export const Primary = Template.bind({});
