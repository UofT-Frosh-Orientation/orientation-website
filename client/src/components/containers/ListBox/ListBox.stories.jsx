import React from 'react';

import { ListBox } from './ListBox';

export default {
  title: 'ListBox',
  component: ListBox,
};

export const ListBoxStory = (args) => <ListBox {...args} />;
ListBoxStory.storyName = 'ListBox';
ListBoxStory.args = {
  title: 'Title',
  label: 'Label',
  onClick: (title) => {
    console.log(title);
  },
};
