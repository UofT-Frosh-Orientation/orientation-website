import React from 'react';

import { TextInput } from './TextInput';
import '../../../App.scss';

export default {
  title: 'Text Input',
  component: TextInput,
};

const Template = (args) => (
  <TextInput
    {...args}
    onEnterKey={(text) => {
      console.log(text);
    }}
    onChange={(text) => {
      console.log(text);
    }}
  />
);

export const General = Template.bind({});
General.args = {
  description:
    'Enter your name here! This will persist in local storage. This input also has restricted input and will not accept other ascii characters.',
  localStorageKey: 'Name',
  initialValue: 'Hello',
  hasRestrictedInput: true,
};

export const RequiredWithError = Template.bind({});
RequiredWithError.args = {
  label: 'Address',
  errorFeedback: 'Missing required field!',
  isRequiredInput: true,
  placeholder: 'Enter address here...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Nothing',
  isDisabled: true,
  initialValue: 'Disabled',
};

export const Password = Template.bind({});
Password.args = {
  inputType: 'password',
  placeholder: 'Password',
};

export const TextArea = Template.bind({});
TextArea.args = {
  inputType: 'textArea',
  label: 'Text Area',
  placeholder: 'Enter text here...',
};

export const Date = Template.bind({});
Date.args = {
  label: 'Date',
  inputArgs: { type: 'date' },
  description: 'You can pass in custom arguments into the <input> element',
};
