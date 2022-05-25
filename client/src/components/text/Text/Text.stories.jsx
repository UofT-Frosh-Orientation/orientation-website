import React from 'react';

import { Text } from './Text';

export default {
  title: 'Text',
  component: Text,
};

const Template = (args) => <Text {...args} />;

export const TextParagraph = Template.bind({});
TextParagraph.args = {
  type: 'paragraph',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore libero officiis quibusdam. Ad\n' +
    '    doloremque eos ipsa labore laborum obcaecati ratione.',
};

export const TextInfo = Template.bind({});
TextInfo.args = {
  type: 'info',
  children: 'Lorem ipsum dolor sit amet.',
};

export const TextAccent = Template.bind({});
TextAccent.args = {
  type: 'accent',
  children: 'Lorem ipsum dolor sit amet.',
};

export const TextAccentSmall = Template.bind({});
TextAccentSmall.args = {
  type: 'accent-small',
  children: 'Lorem ipsum dolor sit amet.',
};

export const TextAccentSecondary = Template.bind({});
TextAccentSecondary.args = {
  type: 'accent-secondary',
  children: 'Lorem ipsum dolor sit amet.',
};

export const TextAccentSmallSecondary = Template.bind({});
TextAccentSmallSecondary.args = {
  type: 'accent-small-secondary',
  children: 'Lorem ipsum dolor sit amet.',
};

export const TextLink = Template.bind({});
TextLink.args = {
  type: 'link',
  onClick: () => alert('Clicked!'),
  href: 'https://www.google.com',
  children: 'Google',
};
