import React from 'react';

import { ErrorSuccessBox } from './ErrorSuccessBox';

export default {
  title: 'ErrorSuccessBox',
  component: ErrorSuccessBox,
};

export const ErrorSuccessBoxStory = (args) => <ErrorSuccessBox {...args} />;
ErrorSuccessBoxStory.storyName = 'ErrorSuccessBoxBox';
ErrorSuccessBoxStory.args = {
  content: 'content',
  success: true,
  error: false,
};
