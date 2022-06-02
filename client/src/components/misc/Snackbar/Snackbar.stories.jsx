import React from 'react';

import { Snackbar } from './Snackbar';

export default {
  title: 'Snackbar',
  component: Snackbar,
};

export const SnackbarStory = (args) => <Snackbar {...args} />;
SnackbarStory.storyName = 'Snackbar';
SnackbarStory.args = {
  label: 'Notice! Will close after 2000ms',
  closeAfter: 2000,
  isActive: true,
};
