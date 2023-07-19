import React from 'react';

import { ExecProfile } from './ExecProfile';

export default {
  title: 'ExecProfile',
  component: ExecProfile,
};

export const ExecProfileStory = (args) => <ExecProfile {...args} />;
ExecProfileStory.storyName = 'ExecProfile';
