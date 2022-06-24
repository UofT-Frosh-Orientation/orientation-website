import React from 'react';

import { PopupModal } from './PopupModal';

export default {
  title: 'PopupModal',
  component: PopupModal,
};

export const PopupModalStory = (args) => <PopupModal {...args} />;
PopupModalStory.storyName = 'PopupModal';

PopupModalStory.args = {
  trigger: true,

  children: <div style={{ height: '200px', width: '200px', background: 'yellow' }}></div>,

  showHeading: true,
  heading: 'This is a Popup',

  bgWidth: '100vw',
  bgHeight: '100vh',

  containerTop: '25vh',
};
