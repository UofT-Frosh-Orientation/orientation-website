import React from 'react';

import { Confetti } from './Confetti';

export default {
  title: 'Confetti',
  component: Confetti,
};

export const ConfettiStory = (args) => <Confetti {...args} />;
ConfettiStory.storyName = 'Confetti';
ConfettiStory.args = {
  animate: true,
};
