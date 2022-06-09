import React from 'react';

import { Tabs } from './tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

export const TabsStory = (args) => <Tabs {...args} />;

TabsStory.storyName = 'Steps';
TabsStory.args = {
  tabs: [
    {
      tabTitle: 'Step 1',
      component: <div style={{ height: '100px', backgroundColor: 'red' }}></div>,
    },
    {
      tabTitle: 'Step 2',
      component: <div style={{ height: '100px', backgroundColor: 'green' }}></div>,
    },
    {
      tabTitle: 'Step 3',
      component: <div style={{ height: '100px', backgroundColor: 'black' }}></div>,
    },
  ],
};
