import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { fields, terms } from './RegistrationFields';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { Tabs } from '../../components/tabs/tabs';
import './RegistrationForm.scss';
import MainFroshLogo from '../../assets/logo/frosh-main-logo.svg';

const PageRegistrationForm = () => {
  const steps = Object.keys(fields);
  const [froshObject, setFroshObject] = useState({});
  const [formFields, setFormFields] = useState(fields);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabGo, setSelectedTabGo] = useState(true);

  useEffect(() => {
    for (let step of steps) {
      Object.keys(formFields[step]).map((key, index) => {
        // The form components will run onChange at mount if given a default value (so it will already be populated, we don't want to overwrite this value)
        if (froshObject[key] === undefined) return (froshObject[key] = undefined);
      });
    }
  }, []);

  const validateForm = () => {
    let validated = true;
    const formFieldsCopy = { ...formFields };
    for (let step of steps) {
      for (let key of Object.keys(formFields[step])) {
        if (formFields[step][key].type === 'label') {
          continue;
        }
        if (
          (froshObject[key] === undefined || froshObject[key] === '') &&
          formFields[step][key].isRequiredInput === true
        ) {
          formFieldsCopy[step][key].errorFeedback = formFields[step][key].errorMessage;
          if (validated === true) {
            setSelectedTab(steps.indexOf(step, 0));
            setSelectedTabGo(!selectedTabGo);
            validated = false;
          }
        } else {
          formFieldsCopy[step][key].errorFeedback = '';
        }
      }
    }
    setFormFields(formFieldsCopy);
    return validated;
  };

  const disableField = (isDisabled, fieldKey, step) => {
    const formFieldsCopy = { ...formFields };
    formFieldsCopy[step][fieldKey]['isDisabled'] = isDisabled;
    setFormFields(formFieldsCopy);
  };

  const generateStepComponent = (formFieldsAtStep, step) => {
    return (
      <div className="registration-tab-content">
        {Object.keys(formFieldsAtStep).map((key, index) => {
          const field = formFieldsAtStep[key];
          if (field.type === 'text') {
            return (
              <div className={field.className ? field.className : 'full-width-input'}>
                <TextInput
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  description={field.description}
                  errorFeedback={field.errorFeedback}
                  hasRestrictedInput={field.hasRestrictedInput}
                  initialValue={field.initialValue}
                  inputType={field.inputType}
                  isRequiredInput={field.isRequiredInput}
                  localStorageKey={field.localStorageKey}
                  placeholder={field.placeholder}
                  onChange={(value) => {
                    froshObject[key] = value;
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isPhoneNumber={field.isPhoneNumber}
                  isInstagram={field.isInstagram}
                  isDisabled={field.isDisabled}
                  inputTitle={field.inputTitle}
                />
              </div>
            );
          } else if (field.type === 'radio') {
            return (
              <div className={field.className ? field.className : 'full-width-input'}>
                <RadioButtons
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  disabledIndices={field.disabledIndices}
                  initialSelectedIndex={field.initialSelectedIndex}
                  values={field.values}
                  onSelected={(value) => {
                    froshObject[key] = value;
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          } else if (field.type === 'dropdown') {
            return (
              <div className={field.className ? field.className : 'full-width-input'}>
                <Dropdown
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  initialSelectedIndex={field.initialSelectedIndex}
                  values={field.values}
                  onSelect={(value) => {
                    froshObject[key] = value;
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          } else if (field.type === 'checkbox') {
            return (
              <div className={field.className ? field.className : 'full-width-input'}>
                <Checkboxes
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  disabledIndices={field.disabledIndices}
                  initialSelectedIndices={field.initialSelectedIndices}
                  maxCanSelect={field.maxCanSelect}
                  onSelected={(value, index, status, indicesSelected) => {
                    let values = [];
                    for (let i = 0; i < indicesSelected.length; i++) {
                      values.push(field.values[i]);
                    }
                    froshObject[key] = values;
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  values={field.values}
                />
              </div>
            );
          } else if (field.type === 'label') {
            return (
              <div className="text-input-container" style={{ width: '100%' }}>
                <div className="text-input-title-container">
                  {field.label !== undefined ? (
                    <p className="text-input-title">{field.label}</p>
                  ) : (
                    <></>
                  )}
                  {field.isRequiredInput !== undefined &&
                  field.isRequiredInput === true &&
                  field.label !== undefined ? (
                    <p className="text-input-required-star">*</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };
  return (
    <div>
      <div className="navbar-space-top" />
      <div className="registration-form-flex">
        <div className="registration-form">
          <Tabs
            selectedTabPassed={selectedTab}
            go={selectedTabGo}
            tabs={[
              {
                title: 'General',
                component: (
                  <>
                    <div className="registration-first-step-header-container">
                      <img className="registration-icon-logo" src={MainFroshLogo}></img>
                      <div>
                        <h1 className="registration-first-step-title">Hello James</h1>
                        <h2 className="registration-first-step-subtitle">
                          Let&apos;s register for UofT Engineering&apos;s F!rosh Week 2T2
                        </h2>
                      </div>
                    </div>
                    {generateStepComponent(formFields['General'], 'General')}
                  </>
                ),
              },
              {
                title: 'Misc',
                component: generateStepComponent(formFields['Misc'], 'Misc'),
              },
              {
                title: 'Payment',
                component: (
                  <div>
                    <p className="register-terms-of-service">{terms}</p>
                    <b>
                      <p className="register-terms-of-service-below">
                        By proceeding with your payment, you indicate you accept F!rosh Week using
                        your submitted information in order to help plan and deliver Orientation
                        events
                      </p>
                    </b>
                  </div>
                ),
              },
            ]}
          />
        </div>
        <Button
          label={'Check'}
          onClick={() => {
            console.log(froshObject);
            console.log(validateForm());
          }}
        />
      </div>
    </div>
  );
};

export { PageRegistrationForm };
