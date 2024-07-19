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
  const steps = useMemo(() => Object.keys(fields), [fields]);
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
    const initialFroshObject = {};
    for (let step of steps) {
      Object.keys(formFields[step]).forEach((key) => {
        initialFroshObject[key] = undefined;
      });
    }
    setFroshObject(initialFroshObject);
  }, [formFields, steps]);

  const validateForm = () => {
    console.log('Validating Form');
    let validated = true;
    const formFieldsCopy = { ...formFields };
    const updatedFroshObject = { ...froshObject };

    for (let step of steps) {
      if (step === 'EditFieldsOnly' && !editFieldsPage) {
        continue;
      }

      for (let key of Object.keys(formFields[step])) {
        let localValidated = true;

        if (formFields[step][key].type === 'label') {
          continue;
        }

        const value = updatedFroshObject[key];
        const field = formFields[step][key];

        if (field.validation) {
          if (value === undefined || value === '') {
            formFieldsCopy[step][key].errorFeedback = field.errorMessage || 'This should be empty!';
          }
          console.log('the value here is ');
          console.log(step);
          console.log(key);
          console.log(value.length);
          const validateResult = field.validation(value);
          if (validateResult !== true) {
            formFieldsCopy[step][key].errorFeedback = validateResult;
            localValidated = false;
            if (validated) {
              //We subtract one because the first key, which is EditFieldsOnly is skipped by the registration form
              setSelectedTab(steps.indexOf(step) - 1);
              setSelectedTabGo(!selectedTabGo);
              console.log('Not Good 1: ');
              validated = false;
            }
          }
        }

        if ((value === undefined || value === '') && field.isRequiredInput) {
          formFieldsCopy[step][key].errorFeedback = field.errorMessage || 'This field is required';
          localValidated = false;
          if (validated) {
            //We subtract one because the first key, which is EditFieldsOnly is skipped by the registration form
            setSelectedTab(steps.indexOf(step) - 1);
            setSelectedTabGo(!selectedTabGo);
            validated = false;
            console.log('Not Good: ');
            console.log(key);
            console.log(formFields[step][key].errorMessage);
          }
        }

        if (localValidated) {
          formFieldsCopy[step][key].errorFeedback = '';
        }
      }
    }

    setFormFields(formFieldsCopy);
    console.log('Validation result:');
    console.log(validated);
    return validated;
  };

  const handleRegister = async () => {
    setCanRegister(false);
    const isFormValid = validateForm();
    if (!isFormValid) {
      setCanRegister(true);
      return;
    }

    try {
      let formData = new FormData();
      for (const [key, value] of Object.entries(froshObject)) {
        if (value !== undefined) {
          formData.append(key, value);
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

      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      setCanRegister(true);
    }
  };

  const disableField = (isDisabled, fieldKey, step) => {
    const formFieldsCopy = { ...formFields };
    formFieldsCopy[step][fieldKey]['isDisabled'] = isDisabled;
    setFormFields(formFieldsCopy);
  };

  const generateStepComponent = (formFieldsAtStep, step) => {
    return (
      <div key={step} className="registration-tab-content">
        {Object.keys(formFieldsAtStep).map((key, index) => {
          const field = formFieldsAtStep[key];
          if (field.type === 'text') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <TextInput
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  description={field.description}
                  errorFeedback={field.errorFeedback}
                  hasRestrictedInput={field.hasRestrictedInput}
                  initialValue={editFieldsPage === true ? initialValues[key] : field.initialValue}
                  inputType={field.inputType}
                  isRequiredInput={field.isRequiredInput}
                  localStorageKey={editFieldsPage === true ? undefined : field.localStorageKey}
                  placeholder={field.placeholder}
                  onChange={(value) => {
                    setFroshObject((prevState) => ({
                      ...prevState,
                      [key]: value,
                    }));
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isPhoneNumber={field.isPhoneNumber}
                  isInstagram={field.isInstagram}
                  isUtorID={field.isUtorID}
                  maxLength={field.maxLength}
                  isDisabled={
                    editFieldsPage === true && field.isDisabled !== true
                      ? field.noEdit
                      : field.isDisabled
                  }
                  inputTitle={field.inputTitle}
                  autoFocus={index === 0}
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
                  initialSelectedIndex={
                    editFieldsPage === true
                      ? field.values.findIndex((val) => (val === 'Yes') === initialValues[key])
                      : field.initialSelectedIndex
                  }
                  values={field.values}
                  onSelected={(value) => {
                    setFroshObject((prevState) => ({
                      ...prevState,
                      [key]: value === 'Yes',
                    }));
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={
                    editFieldsPage === true && field.isDisabled !== true
                      ? field.noEdit
                      : field.isDisabled
                  }
                  localStorageKey={editFieldsPage === true ? undefined : field.localStorageKey}
                  autoFocus={index === 0}
                  isRequiredInput={field.isRequiredInput}
                />
              </div>
            );
          } else if (field.type === 'dropdown') {
            return (
              <div key={index} className={field.className ? field.className : 'full-width-input'}>
                <Dropdown
                  key={Object.keys(formFields[step])[index]}
                  label={field.label}
                  initialSelectedIndex={
                    editFieldsPage === true
                      ? field.values.findIndex((val) => val === initialValues[key])
                      : field.initialSelectedIndex
                  }
                  values={field.values}
                  onSelect={(value) => {
                    setFroshObject((prevState) => ({
                      ...prevState,
                      [key]: value,
                    }));
                    if (field.onChanged) field.onChanged(value, disableField);
                  }}
                  isDisabled={
                    editFieldsPage === true && field.isDisabled !== true
                      ? field.noEdit
                      : field.isDisabled
                  }
                  localStorageKey={editFieldsPage === true ? undefined : field.localStorageKey}
                  isRequiredInput={field.isRequiredInput}
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
                  initialSelectedIndices={
                    editFieldsPage === true
                      ? field.values.reduce((prev, curr, index) => {
                          if (initialValues[key].includes(curr)) {
                            prev.push(index);
                          }
                          return prev;
                        }, [])
                      : field.initialSelectedIndices
                  }
                  maxCanSelect={field.maxCanSelect}
                  onSelected={(value, index, status, indicesSelected) => {
                    let values = [];
                    for (let index of indicesSelected) {
                      values.push(field.values[index]);
                    }
                    setFroshObject((prevState) => ({
                      ...prevState,
                      [key]: values,
                    }));
                    if (field.onChanged) field.onChanged(values, disableField);
                  }}
                  values={field.values}
                  localStorageKey={editFieldsPage === true ? undefined : field.localStorageKey}
                  autoFocus={index === 0}
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
              {/* TODO: SHow popup to ask if they would like to discard all changes when editing fields */}
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
            {errorAfterEdit == true ? (
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
