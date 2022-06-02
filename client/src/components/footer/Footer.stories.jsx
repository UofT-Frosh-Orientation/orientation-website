import React from 'react';

import { FooterStorybook } from './FooterStorybook';

export default {
  title: 'Footer',
  component: FooterStorybook,
};

export const Template = (args) => <FooterStorybook {...args} />;
Template.storyName = 'Footer';
