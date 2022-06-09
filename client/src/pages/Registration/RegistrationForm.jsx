import React from 'react';
import PropTypes from 'prop-types';
import { fields } from './RegistrationFields';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

const PageRegistrationForm = () => {
  let step = 'Step 1';
  return (
    <div style={{ paddingTop: '90px' }}>
      {Object.keys(fields[step]).map((key, index) => {
        let field = fields[step][key];
        if (field.type === 'text') {
          return (
            <TextInput
              key={Object.keys(fields[step])[index]}
              label={field.label}
              description={field.description}
              // errorFeedback={field.errorMessage}
              hasRestrictedInput={field.hasRestrictedInput}
              // initialValue={field.initialValue}
              inputType={field.inputType}
              isRequiredInput={field.isRequiredInput}
              localStorageKey={field.localStorageKey}
              placeholder={field.placeholder}
            />
          );
        } else if (field.type === 'radio') {
          return (
            <RadioButtons
              key={Object.keys(fields[step])[index]}
              label={field.label}
              disabledIndices={field.disabledIndices}
              initialSelectedIndex={field.initialSelectedIndex}
              values={field.values}
            />
          );
        } else if (field.type === 'dropdown') {
          return (
            <Dropdown
              key={Object.keys(fields[step])[index]}
              label={field.label}
              initialSelectedIndex={field.initialSelectedIndex}
              values={field.values}
              onSelect={() => {}}
            />
          );
        } else if (field.type === 'checkbox') {
          return (
            <Checkboxes
              key={Object.keys(fields[step])[index]}
              label={field.label}
              disabledIndices={field.disabledIndices}
              initialSelectedIndices={field.initialSelectedIndices}
              maxCanSelect={field.maxCanSelect}
              onSelected={() => {}}
              values={field.values}
            />
          );
        }
      })}
    </div>
  );
};

export { PageRegistrationForm };
