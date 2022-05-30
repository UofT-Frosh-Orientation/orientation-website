import React from 'react';
import { NavbarMobileStorybook } from './NavbarMobile-Storybook';

export default {
  title: 'Navbar Mobile',
  component: NavbarMobileStorybook,
};

const Template = (args) => <NavbarMobileStorybook {...args} />;

export const Primary = Template.bind({});
