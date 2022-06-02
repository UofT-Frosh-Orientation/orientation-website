import React from 'react';

import { NavbarStorybook } from './NavbarStorybook';

export default {
  title: 'Navbar',
  component: NavbarStorybook,
};

const Template = (args) => <NavbarStorybook {...args} />;
export const Primary = Template.bind({});

// Primary.args = {
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Secondary',
//   isSecondary: true,
// };

// export const Disabled = Template.bind({});
// Disabled.args = {
//   label: 'Disabled',
//   isDisabled: true,
// };
