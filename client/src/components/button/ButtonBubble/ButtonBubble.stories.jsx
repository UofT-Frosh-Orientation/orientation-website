import React from 'react';

import { ButtonBubble } from './ButtonBubble';

export default {
  title: 'ButtonBubble',
  component: ButtonBubble,
};

const Template = (args) => <ButtonBubble {...args} />;

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
