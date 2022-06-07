import React from 'react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  isSecondary: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  isDisabled: true,
};
