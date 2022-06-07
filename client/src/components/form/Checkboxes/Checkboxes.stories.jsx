import React from 'react';

import { Checkboxes } from './Checkboxes';

export default {
  title: 'Checkboxes',
  component: Checkboxes,
};

export const CheckboxesStory = (args) => <Checkboxes {...args} />;
CheckboxesStory.storyName = 'Checkboxes';
CheckboxesStory.args = {
  values: ['hello', 'hi', '1', '2', '3', '4', '5'],
  initialSelectedIndices: [1, 3, 4],
  onSelected: (value, index, state, selectedIndices) => {
    console.log(value, index, state, selectedIndices);
  },
  disabledIndices: [2, 4],
  maxCanSelect: 3,
};
