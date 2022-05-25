import React from 'react';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const HeaderSection = Template.bind({});
HeaderSection.args = {
  type: 'section',
  children: 'Header Section',
};

export const HeaderParagraph = Template.bind({});
HeaderParagraph.args = {
  type: 'paragraph',
  children: 'Header Paragraph',
};

export const HeaderBold = Template.bind({});
HeaderBold.args = {
  type: 'bold',
  children: 'Header Bold',
};

export const HeaderFancy = Template.bind({});
HeaderFancy.args = {
  type: 'fancy',
  children: 'Header Fancy',
};
