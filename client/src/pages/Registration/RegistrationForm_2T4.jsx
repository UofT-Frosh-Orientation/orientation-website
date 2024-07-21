import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fields, terms } from './RegistrationFields';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { Tabs } from '../../components/tabs/tabs';
import './RegistrationForm.scss';
import MainFroshLogo from '../../assets/logo/main-logo.png';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { PopupModal } from '../../components/popup/PopupModal';
import useAxios from '../../hooks/useAxios';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useSelector } from 'react-redux';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';

const PageRegistrationForm = ({ editFieldsPage, initialValues, onEditSubmit }) => {
  console.log('This is a new version of Registration Form since 2T4, by ChatGPT');
  const steps = useMemo(() => Object.keys(fields), []);
  const [froshObject, setFroshObject] = useState({});
  const [formFields, setFormFields] = useState(fields);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabGo, setSelectedTabGo] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [canRegister, setCanRegister] = useState(true);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [errorAfterEdit, setErrorAfterEdit] = useState(false);

  const { axios } = useAxios();
  const navigate = useNavigate();

  const registered = useSelector(registeredSelector);
  const user = useSelector(userSelector)?.user;

  useEffect(() => {
    if (registered && !editFieldsPage) {
      navigate('/profile');
    }
  }, [registered, editFieldsPage, navigate]);

  useEffect(() => {
    if (Object.keys(froshObject).length === 0) {
      const initialFroshObject = {};
      for (let step of steps) {
        Object.keys(formFields[step]).forEach((key) => {
          const initialValue = editFieldsPage
            ? initialValues[key]
            : formFields[step][key].initialValue;
          const validation = validateField(initialValue, formFields[step][key]);
          initialFroshObject[key] = { value: initialValue, ...validation };
        });
      }
      console.log('Initial Frosh Object:', initialFroshObject);
      setFroshObject(initialFroshObject);
    }
  }, [formFields, steps, initialValues, editFieldsPage, froshObject]);

  const validateField = (value, field) => {
    console.log(`Validating field ${field.label} with value:`, value);
    if (value === undefined || value === '') {
      return {
        isValid: !field.isRequiredInput,
        errorMessage: field.isRequiredInput ? field.errorMessage || 'This field is required' : '',
      };
    }
    if (field.validation) {
      const validateResult = field.validation(value);
      if (validateResult !== true) {
        return { isValid: false, errorMessage: validateResult };
      }
    }
    return { isValid: true, errorMessage: '' };
  };

  const validateForm = () => {
    let validated = true;
    const updatedFroshObject = { ...froshObject };

    for (let step of steps) {
      if (step === 'EditFieldsOnly' && !editFieldsPage) {
        continue;
      }
      for (let key of Object.keys(formFields[step])) {
        const value = updatedFroshObject[key]?.value;
        const field = formFields[step][key];
        const validation = validateField(value, field);
        updatedFroshObject[key] = { value, ...validation };

        if (!validation.isValid && validated) {
          console.log(`Invalid field detected: ${field.label}`);
          setSelectedTab(steps.indexOf(step));
          setSelectedTabGo(!selectedTabGo);
          validated = false;
        }
      }
    }

    console.log('Updated Frosh Object after validation:', updatedFroshObject);
    setFroshObject(updatedFroshObject);
    return validated;
  };

  const handleRegister = async () => {
    console.log('Handling registration');
    const isFormValid = validateForm();
    if (!isFormValid) {
      setCanRegister(true);
      console.log('Form is not valid, cannot register');
      return;
    }

    setCanRegister(false);
    try {
      let formData = new FormData();
      for (const [key, obj] of Object.entries(froshObject)) {
        if (obj.value !== undefined) {
          formData.append(key, obj.value);
        }
      }

      froshObject['id'] = user.id;
      const ReactPDF = await import('@react-pdf/renderer');
      const { MakeReceipt } = await import('../../components/MakeReceipt/MakeReceipt');
      const dataReceipt = await ReactPDF.pdf(MakeReceipt(froshObject)).toBlob();
      formData.append('dataReceipt', dataReceipt);

      const response = await axios.post('/frosh/register', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      console.log('Registration successful, redirecting to:', response.data.url);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during registration:', error);
      setCanRegister(true);
    }
  };

  const disableField = (isDisabled, fieldKey, step) => {
    const formFieldsCopy = { ...formFields };
    formFieldsCopy[step][fieldKey]['isDisabled'] = isDisabled;
    setFormFields(formFieldsCopy);
  };

  const handleChange = (key, step) => (value) => {
    console.log(`Handling change for field ${key} in step ${step} with value:`, value);
    const field = formFields[step][key];
    const validation = validateField(value, field);
    setFroshObject((prevState) => ({
      ...prevState,
      [key]: { value, ...validation },
    }));
  };

  const generateStepComponent = (formFieldsAtStep, step) => {
    return (
      <div key={step} className="registration-tab-content">
        {Object.keys(formFieldsAtStep).map((key, index) => {
          const field = formFieldsAtStep[key];
          const fieldError = froshObject[key]?.errorMessage || '';
          const isFieldValid = froshObject[key]?.isValid ?? true;

          if (field.type === 'text') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <TextInput
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  description={field.description}
                  errorFeedback={fieldError}
                  hasRestrictedInput={field.hasRestrictedInput}
                  initialValue={froshObject[key]?.value || ''}
                  inputType={field.inputType}
                  isRequiredInput={field.isRequiredInput}
                  localStorageKey={editFieldsPage ? undefined : field.localStorageKey}
                  placeholder={field.placeholder}
                  onChange={handleChange(key, step)}
                  isPhoneNumber={field.isPhoneNumber}
                  isInstagram={field.isInstagram}
                  isUtorID={field.isUtorID}
                  maxLength={field.maxLength}
                  isDisabled={
                    editFieldsPage && field.isDisabled !== true ? field.noEdit : field.isDisabled
                  }
                  inputTitle={field.inputTitle}
                  autoFocus={index === 0}
                  isValid={isFieldValid}
                />
              </div>
            );
          } else if (field.type === 'radio') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <RadioButtons
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  disabledIndices={field.disabledIndices}
                  initialSelectedIndex={parseInt(froshObject[key]?.value || 0)}
                  values={field.values}
                  onSelected={(value) => {
                    handleChange(key, step)(value === 'Yes');
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={
                    editFieldsPage && field.isDisabled !== true ? field.noEdit : field.isDisabled
                  }
                  localStorageKey={editFieldsPage ? undefined : field.localStorageKey}
                  autoFocus={index === 0}
                  isRequiredInput={field.isRequiredInput}
                  errorFeedback={fieldError}
                  isValid={isFieldValid}
                />
              </div>
            );
          } else if (field.type === 'dropdown') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <Dropdown
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  initialSelectedIndex={parseInt(froshObject[key]?.value || 0)}
                  values={field.values}
                  onSelect={(value) => {
                    handleChange(key, step)(value);
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={
                    editFieldsPage && field.isDisabled !== true ? field.noEdit : field.isDisabled
                  }
                  localStorageKey={editFieldsPage ? undefined : field.localStorageKey}
                  isRequiredInput={field.isRequiredInput}
                  errorFeedback={fieldError}
                  isValid={isFieldValid}
                />
              </div>
            );
          } else if (field.type === 'checkbox') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <Checkboxes
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  disabledIndices={field.disabledIndices}
                  initialSelectedIndices={froshObject[key]?.value || []}
                  maxCanSelect={field.maxCanSelect}
                  onSelected={(value, index, status, indicesSelected) => {
                    let values = [];
                    for (let idx of indicesSelected) {
                      values.push(field.values[idx]);
                    }
                    handleChange(key, step)(values);
                    if (field.onChanged) field.onChanged(values, disableField);
                  }}
                  values={field.values}
                  localStorageKey={editFieldsPage ? undefined : field.localStorageKey}
                  autoFocus={index === 0}
                  errorFeedback={fieldError}
                  isValid={isFieldValid}
                />
              </div>
            );
          } else if (field.type === 'label') {
            return (
              <div key={index} className="text-input-container" style={{ width: '100%' }}>
                <div className="text-input-title-container">
                  {field.label !== undefined ? (
                    field.isBold === true ? (
                      <b>
                        <p className="text-input-title">{field.label}</p>
                      </b>
                    ) : (
                      <p className="text-input-title">{field.label}</p>
                    )
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

  if (editFieldsPage === true) {
    return (
      <div>
        <PopupModal
          trigger={showPopUp}
          setTrigger={setShowPopUp}
          blurBackground={false}
          exitIcon={true}
        >
          <div className="registration-edit-popup">
            <h1>Discard changes?</h1>
            <h2>Any changes will be lost.</h2>
            <div className="registration-edit-popup-buttons">
              <Link to={'/profile'} className="no-link-style">
                <Button label="Discard" isSecondary />
              </Link>
              <Button label="Keep editing" onClick={() => setShowPopUp(false)} />
            </div>
          </div>
        </PopupModal>

        <div className="registration-form-flex">
          <div className="registration-form">
            {Object.keys(fields).map((fieldsKey, index) => {
              return generateStepComponent(formFields[fieldsKey], fieldsKey);
            })}
          </div>
          <div style={{ marginBottom: '55px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ButtonOutlined
                label={'Discard changes'}
                onClick={() => {
                  setShowPopUp(true);
                }}
              />
              <Button
                label={'Save changes'}
                onClick={() => {
                  setErrorAfterEdit(false);
                  if (validateForm() === true) onEditSubmit(froshObject);
                  else setErrorAfterEdit(true);
                }}
              />
            </div>
            {errorAfterEdit === true ? (
              <ErrorSuccessBox
                content={'Please make sure you have completed all necessary fields.'}
                error={true}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="registration-form-flex">
          <div className="registration-form" style={{ marginBottom: '65px' }}>
            <Tabs
              scrollToTopAfterChange={true}
              selectedTabPassed={selectedTab}
              go={selectedTabGo}
              tabs={[
                {
                  title: 'General',
                  component: (
                    <>
                      <div className="registration-first-step-header-container">
                        <img
                          className="registration-icon-logo"
                          src={MainFroshLogo}
                          alt="Main Frosh Logo"
                        ></img>
                        <div>
                          <h1 className="registration-first-step-title">
                            {'HELLO ' +
                              (user && (user.preferredName === '' || !user.preferredName)
                                ? user.firstName
                                : user
                                ? user.preferredName.toUpperCase()
                                : '')}
                          </h1>
                          <h2 className="registration-first-step-subtitle">
                            LET&apos;S REGISTER FOR UOFT ENGINEERING&apos;S F!ROSH WEEK 2T4
                          </h2>
                        </div>
                      </div>
                      {generateStepComponent(formFields['General'], 'General')}
                    </>
                  ),
                },
                {
                  title: 'Health & Safety',
                  component: generateStepComponent(formFields['HealthSafety'], 'HealthSafety'),
                },
                {
                  title: 'Extra Events',
                  component: generateStepComponent(formFields['ExtraEvents'], 'ExtraEvents'),
                },
                {
                  title: 'Payment',
                  component: (
                    <div className="registration-payment-page">
                      <p className="register-terms-of-service">{terms}</p>
                      <b>
                        <p className="register-terms-of-service-below">
                          By proceeding with your payment, you indicate you accept F!rosh Week using
                          your submitted information in order to help plan and deliver Orientation
                          events
                        </p>
                      </b>
                      <Button
                        style={{ margin: '0 auto', marginTop: '15px' }}
                        label={'Pay Now'}
                        onClick={handleRegister}
                        isDisabled={!canRegister}
                      />
                      <p className="register-terms-of-service" style={{ marginTop: '20px' }}>
                        Note: We will be making bursary decisions after Frosh week and will refund
                        the amount to the students after the decisions. Our team will reach out to
                        you for more details regarding the bursary program. Bursaries range from
                        partial to complete settlement of the ticket price.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
};

PageRegistrationForm.propTypes = {
  editFieldsPage: PropTypes.bool,
  initialValues: PropTypes.object,
  onEditSubmit: PropTypes.func,
};

export { PageRegistrationForm };
