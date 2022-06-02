import React from 'react';

import { RadioButtons } from './RadioButtons';

export default {
  title: 'RadioButtons',
  component: RadioButtons,
};

export const RadioButtonsStory = (args) => <RadioButtons {...args} />;
RadioButtonsStory.storyName = 'RadioButtons';
RadioButtonsStory.args = {
  values: ['hello', 'hi', '1', '2'],
  initialSelectedIndex: 1,
  onSelected: (value) => {
    console.log(value);
  },
  disabledIndices: [3],
};
