import { React, useContext } from 'react';
import { useEffect } from 'react';
import './ProfileEditUnregistered.scss';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../state/user/saga';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainFroshLogo from '../../assets/logo/main-logo-2T5.png';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { SnackbarContext } from '../../util/SnackbarProvider';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

const PageProfileEditUnregistered = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountObj, setAccountObj] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    preferredName: user.preferredName || '',
    phoneNumber: user.phoneNumber || '',
    phoneNumberCountryCode: user.phoneNumberCountryCode || '',
    emergencyContactName: user.emergencyContactName || '',
    emergencyContactRelationship: user.emergencyContactRelationship || '',
    emergencyContactCountryCode: user.emergencyContactCountryCode || '',
    emergencyContactNumber: user.emergencyContactNumber || '',
    medicalInfo: user.medicalInfo || '',
    specficMedicalInfo: user.specficMedicalInfo || '',
    medication: user.medication || '',
    allergies: Array.isArray(user.allergies) ? user.allergies : [],
    allergiesOther: user.allergiesOther || '',
  });
  const [anyErrors, setAnyErrors] = useState({});
  const [pageState, setPageState] = useState('form');
  const [errors, setErrors] = useState({});

  const { setSnackbar } = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [disabledFields, setDisabledFields] = useState({
    specficMedicalInfo: true,
    medication: true,
    allergiesOther: true,
    // other fields...
  });

  const handleDisableField = (disable, fieldName) => {
    setDisabledFields((prev) => ({ ...prev, [fieldName]: disable }));
  };

  useEffect(() => {
    const otherChecked = accountObj.allergies?.includes('Other');
    handleDisableField(!otherChecked, 'allergiesOther');
    if (!otherChecked) {
      setAccountObj((prev) => ({ ...prev, allergiesOther: '' }));
      setErrors((prev) => ({ ...prev, allergiesOther: undefined }));
      localStorage.setItem('allergiesOther', '');
    }
  }, [accountObj.allergies]);

  const handleMedicalInfoChange = (value) => {
    setAccountObj((prev) => ({
      ...prev,
      medicalInfo: value,
      ...(value !== 'Yes' && {
        specficMedicalInfo: '',
        medication: '',
      }),
    }));
    if (value === 'Yes') {
      handleDisableField(false, 'specficMedicalInfo');
      handleDisableField(false, 'medication');
    } else if (value === 'No') {
      handleDisableField(true, 'specficMedicalInfo');
      handleDisableField(true, 'medication');

      localStorage.setItem('profile-edit-medication', '');
      localStorage.setItem('profile-edit-specficMedicalInfo', '');
    }
  };

  const handleCheckboxChange = (value, index, isSelected) => {
    const allergies = Array.isArray(accountObj.allergies) ? accountObj.allergies : [];
    let updatedAllergies;

    updatedAllergies = allergies.includes(value)
      ? allergies.filter((allergy) => allergy !== value)
      : [...allergies, value];

    setAccountObj({ ...accountObj, allergies: updatedAllergies });

    if (value === 'Other') {
      handleDisableField(!isSelected, 'allergiesOther');
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setAccountObj((prevAccountObj) => ({
      ...prevAccountObj,
      [fieldName]: value,
    }));
    console.log(`Field ${fieldName} changed to ${value}`);

    if (fieldName === 'medicalInfo') {
      const disable = value !== 'Yes';
      handleDisableField(disable, 'specficMedicalInfo');
      handleDisableField(disable, 'medication');
    }
  };

  useEffect(() => {
    // This useEffect will log the state changes to help with debugging
    console.log('accountObj:', accountObj);
    console.log('disabledFields:', disabledFields);
  }, [accountObj, disabledFields]);

  useEffect(() => {
    if (isRegistered) {
      navigate('/profile');
    }
  }, [isRegistered]);

  const submitForm = (newInfo) => {
    setIsLoading(true);
    console.log('Submitting:', accountObj);
    dispatch(
      updateUserInfo({ setSnackbar, setIsLoading, newInfo, accountObj, navigate, isRegistered }),
    );
  };

  const checkErrors = (sendFeedback = true, feedbackToSend = []) => {
    let anyErrorsNow = false;
    const errorsCopy = {};
    if (accountObj['firstName'] === undefined || accountObj['firstName'] === '') {
      errorsCopy['firstName'] = 'Please enter a first name';
      anyErrorsNow = true;
    }
    if (accountObj['lastName'] === undefined || accountObj['lastName'] === '') {
      errorsCopy['lastName'] = 'Please enter a last name';
      anyErrorsNow = true;
    }
    if (accountObj['phoneNumber'] === undefined || accountObj['phoneNumber'] === '') {
      errorsCopy['phoneNumber'] = 'Please enter a phone number';
      anyErrorsNow = true;
    }
    if (
      accountObj['phoneNumberCountryCode'] === undefined ||
      accountObj['phoneNumberCountryCode'] === ''
    ) {
      errorsCopy['phoneNumberCountryCode'] = ' ';
      anyErrorsNow = true;
    } else if (!/^[+0-9]*$/.test(accountObj['phoneNumberCountryCode'])) {
      errorsCopy['phoneNumberCountryCode'] = 'Must contain characters 0-9 or +';
      anyErrorsNow = true;
    } else if (accountObj['phoneNumberCountryCode'].length > 4) {
      errorsCopy['phoneNumberCountryCode'] = 'Must be at most 4 characters';
      anyErrorsNow = true;
    }
    if (accountObj['emergencyContactName'].length > 50) {
      errorsCopy['emergencyContactName'] = 'Please try to use 50 characters or less';
      anyErrorsNow = true;
    }
    if (accountObj['emergencyContactRelationship'].length > 50) {
      errorsCopy['emergencyContactRelationship'] = 'Please try to use 50 characters or less';
      anyErrorsNow = true;
    }
    if (
      accountObj['emergencyContactNumber'] === undefined ||
      accountObj['emergencyContactNumber'] === ''
    ) {
      errorsCopy['emergencyContactNumber'] = 'Please enter a phone number';
      anyErrorsNow = true;
    }
    if (
      accountObj['emergencyContactCountryCode'] === undefined ||
      accountObj['emergencyContactCountryCode'] === ''
    ) {
      errorsCopy['emergencyContactCountryCode'] = ' ';
      anyErrorsNow = true;
    } else if (!/^[+0-9]*$/.test(accountObj['emergencyContactCountryCode'])) {
      errorsCopy['emergencyContactCountryCode'] = 'Must contain characters 0-9 or +';
      anyErrorsNow = true;
    } else if (accountObj['emergencyContactCountryCode'].length > 4) {
      errorsCopy['emergencyContactCountryCode'] = 'Must be at most 4 characters';
      anyErrorsNow = true;
    }

    if (
      (accountObj['specficMedicalInfo'] === '' || accountObj['specficMedicalInfo'] === undefined) &&
      accountObj['medicalInfo'] === 'Yes'
    ) {
      errorsCopy['specficMedicalInfo'] = 'Please fill out the form above';
      anyErrorsNow = true;
      //console.log('Medical Info Error oopsie');
    }

    if (
      (accountObj['medication'] === '' || accountObj['medication'] === undefined) &&
      accountObj['medicalInfo'] === 'Yes'
    ) {
      errorsCopy['medication'] = 'Please fill out the form above';
      anyErrorsNow = true;
      //console.log('Medical Info Error oopsie 2');
    }

    if (accountObj.allergies.includes('Other')) {
      if (accountObj['allergiesOther'] === '') {
        errorsCopy['allergiesOther'] = 'Please list any other allergies you have';
        anyErrorsNow = true;
      }
    } else {
      errorsCopy['allergiesOther'] = undefined;
    }

    if (sendFeedback) {
      setErrors(errorsCopy);
    }
    if (sendFeedback === false) {
      const errorObject = {};
      for (let send of feedbackToSend) {
        errorObject[send] = errorsCopy[send];
      }
      setErrors(errorObject);
    }
    // console.log(errorObject)
    setAnyErrors(anyErrorsNow);
    return anyErrorsNow;
  };

  return (
    <>
      {!isRegistered && (
        <>
          <div>
            <div
              className={`profile-edit-page ${
                pageState !== 'form' ? 'profile-edit-page-disappear' : ''
              }`}
              style={{ display: pageState === 'success' ? 'none' : '' }}
            >
              <div className="navbar-space-top" />
              <div className="profile-edit-container">
                <img className={`profile-edit-logo`} src={MainFroshLogo}></img>
                <h1>Edit Account Info</h1>
                <h3 className="proxima-nova-text">For F!rosh Week 2T5, UofT Engineering</h3>

                {!isLoading ? (
                  <>
                    <div className="profile-edit-input">
                      <TextInput
                        label="First Name"
                        isRequiredInput
                        placeholder={'John'}
                        value={accountObj.firstName}
                        errorFeedback={errors['firstName']}
                        onChange={(value) => {
                          handleFieldChange('firstName', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-firstName'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Last Name"
                        isRequiredInput
                        placeholder={'Doe'}
                        value={accountObj.lastName}
                        errorFeedback={errors['lastName']}
                        onChange={(value) => {
                          handleFieldChange('lastName', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-lastName'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Preferred Name"
                        placeholder={'Joey'}
                        value={accountObj.preferredName}
                        errorFeedback={errors['preferredName']}
                        onChange={(value) => {
                          handleFieldChange('preferredName', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-preferredName'}
                      />
                    </div>
                    <div className="text-input-container" style={{ width: '100%' }}>
                      <div className="text-input-title-container">
                        <p className="text-input-title">
                          Phone Number<span className="isRequired">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="profile-edit-input small-width-input">
                      <TextInput
                        // label="Country Code"
                        placeholder={'+1'}
                        isRequiredInput
                        errorFeedback={errors['phoneNumberCountryCode']}
                        value={accountObj.phoneNumberCountryCode}
                        onChange={(value) => {
                          handleFieldChange('phoneNumberCountryCode', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-phoneNumberCountryCode'}
                      />
                    </div>
                    <div className="profile-edit-input fill-remaining-width-input">
                      <TextInput
                        // label="Phone Number"
                        placeholder={'(123) 456 7890'}
                        isRequiredInput
                        value={accountObj.phoneNumber}
                        errorFeedback={errors['phoneNumber']}
                        onChange={(value) => {
                          handleFieldChange('phoneNumber', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-phoneNumber'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Emergency Contact Full Name"
                        placeholder={'Jane Doe'}
                        value={accountObj.emergencyContactName}
                        errorFeedback={errors['emergencyContactName']}
                        onChange={(value) => {
                          handleFieldChange('emergencyContactName', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-emergencyContactName'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Emergency Contact Relationship"
                        placeholder={'Parent / Guardian'}
                        value={accountObj.emergencyContactRelationship}
                        errorFeedback={errors['emergencyContactRelationship']}
                        onChange={(value) => {
                          handleFieldChange('emergencyContactRelationship', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-emergencyContactRelationship'}
                      />
                    </div>
                    <div className="text-input-container" style={{ width: '100%' }}>
                      <div className="text-input-title-container">
                        <p className="text-input-title">
                          Emergency Contact Phone Number<span className="isRequired">*</span>
                        </p>
                      </div>
                    </div>
                    <div className="profile-edit-input small-width-input">
                      <TextInput
                        // label="Emergency Contact Phone Number Country Code"
                        placeholder={'+1'}
                        errorFeedback={errors['emergencyContactCountryCode']}
                        value={accountObj.emergencyContactCountryCode}
                        onChange={(value) => {
                          handleFieldChange('emergencyContactCountryCode', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-emergencyContactCountryCode'}
                      />
                    </div>
                    <div className="profile-edit-input fill-remaining-width-input">
                      <TextInput
                        // label="Emergency Contact Phone Number"
                        placeholder={'(123) 456 7890'}
                        errorFeedback={errors['emergencyContactNumber']}
                        value={accountObj.emergencyContactNumber}
                        onChange={(value) => {
                          handleFieldChange('emergencyContactNumber', value);
                          checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-emergencyContactNumber'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <RadioButtons
                        label="Medical Conditions"
                        values={['Yes', 'No']}
                        value={accountObj.medicalInfo}
                        onSelected={(value) => {
                          handleMedicalInfoChange(value);
                          checkErrors(false);
                        }}
                        initialSelectedIndex={1}
                        localStorageKey={'profile-edit-MedicalInfo'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Specific Medical Conditions"
                        placeholder={'Respiratory Conditions'}
                        value={accountObj.specficMedicalInfo}
                        isRequiredInput
                        errorFeedback={errors['specficMedicalInfo']}
                        onChange={(value) => {
                          handleFieldChange('specficMedicalInfo', value);
                          checkErrors(false);
                        }}
                        isDisabled={disabledFields.specficMedicalInfo}
                        localStorageKey={'profile-edit-specficMedicalInfo'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Medication (e.g. Epi-Pen, inhaler, ...)"
                        placeholder={'Carries 2 Inhalers'}
                        value={accountObj.medication}
                        isRequiredInput
                        errorFeedback={errors['medication']}
                        onChange={(value) => {
                          handleFieldChange('medication', value);
                          checkErrors(false);
                        }}
                        isDisabled={disabledFields.medication}
                        localStorageKey={'profile-edit-medication'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <Checkboxes
                        label="Do you have any of the following dietary restrictions or allergies?"
                        values={[
                          'Lactose Intolerance/Dairy-Free',
                          'Gluten Intolerance/Allergy',
                          'Vegetarian',
                          'Vegan',
                          'Kosher',
                          'Nut Allergy',
                          'No Pork & Pork by-products',
                          'No Red meat',
                          'Other',
                        ]}
                        selectedValues={accountObj.allergies}
                        onSelected={handleCheckboxChange}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="If you have any other restrictions not listed above, please list them here."
                        placeholder={'Allergic to Berries'}
                        value={accountObj.allergiesOther}
                        errorFeedback={errors['allergiesOther']}
                        isRequiredInput
                        onChange={(value) => {
                          handleFieldChange('allergiesOther', value);
                          checkErrors(false);
                        }}
                        isDisabled={disabledFields.allergiesOther}
                        localStorageKey="profile-edit-allergiesOther"
                      />
                    </div>
                    <ButtonRound
                      label="Confirm Change"
                      onClick={async () => {
                        const anyErrors = checkErrors(true);
                        if (anyErrors === false) {
                          submitForm(accountObj);
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ zIndex: 10, padding: '50px' }}>
                      <LoadingAnimation size={'60px'} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { PageProfileEditUnregistered };
