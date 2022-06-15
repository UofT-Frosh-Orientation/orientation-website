import React from 'react';

import { Tabs } from './tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

export const TabsStory = (args) => <Tabs {...args} />;

TabsStory.storyName = 'Tabs';

TabsStory.args = {
  tabs: [
    {
      title: 'Step 1',
      component: <input style={{ height: '100px', backgroundColor: 'red' }}></input>,
    },
    {
      title: 'Step 2',
      component: <div style={{ height: '100px', backgroundColor: 'green' }}></div>,
    },
    {
      title: 'Step 3',
      component: <div style={{ height: '100px', backgroundColor: 'black' }}></div>,
    },
  ],
  maxWidthTab: '85px',
};
