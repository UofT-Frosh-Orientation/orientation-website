import React from 'react';

import { ButtonOutlined } from './ButtonOutlined';

export default {
  title: 'ButtonOutlined',
  component: ButtonOutlined,
};

const Template = (args) => <ButtonOutlined {...args} />;

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
