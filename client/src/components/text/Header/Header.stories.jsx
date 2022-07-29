import React from 'react';

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
};

export const HeaderStory = (args) => <Header {...args} />;
HeaderStory.storyName = 'Header';
HeaderStory.args = {
  text: 'About Us',
  children: <div>Hello</div>,
};
