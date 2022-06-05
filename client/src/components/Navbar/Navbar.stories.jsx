import React from 'react';

import { NavbarStorybook } from './NavbarStorybook';

export default {
  title: 'Navbar',
  component: NavbarStorybook,
};

export const Template = (args) => <NavbarStorybook {...args} />;
Template.storyName = 'Navbar';
