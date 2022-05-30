import React from 'react';
import { NavbarStorybook } from './Navbar-Storybook';

export default {
  title: 'Navbar',
  component: NavbarStorybook,
};

const Template = (args) => <NavbarStorybook {...args} />;

export const Primary = Template.bind({});
