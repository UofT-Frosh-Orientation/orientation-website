import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PasswordReset.scss';
import MainFroshLogo from '../../assets/logo/frosh-main-logo.svg';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { validateEmail, validatePassword, validatePasswordLength } from '../SignUp/functions';

export const PasswordReset = () => {
  const { token } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [anyErrors, setAnyErrors] = useState(false);

  const checkErrors = (sendFeedback = true, feedbackToSend = []) => {
    let anyErrors = false;
    let formErrorsCopy = {};
    if (email === '' || email === undefined) {
      formErrorsCopy['email'] = 'Please enter an email';
      anyErrors = true;
    } else if (validateEmail(email) === null) {
      formErrorsCopy['email'] = 'This email is not valid';
      anyErrors = true;
    }
    if (password === undefined || password === '') {
      formErrorsCopy['password'] = 'Please enter a password';
      anyErrors = true;
    } else if (validatePasswordLength(password) === false) {
      formErrorsCopy['password'] = 'Your password is too long. Please keep under 35 characters.';
      anyErrors = true;
    } else if (validatePassword(password) === null) {
      formErrorsCopy['password'] =
        'Your password is too weak, it should be at least 8 characters long, have 1 uppercase letter, 1 lowercase letter, 1 digit, and one special character';
      anyErrors = true;
    }
    if (confirmPassword === undefined || confirmPassword === '') {
      formErrorsCopy['confirmPassword'] = 'Please confirm your password';
      anyErrors = true;
    } else if (confirmPassword !== password) {
      formErrorsCopy['confirmPassword'] = 'Passwords do not match!';
      anyErrors = true;
    }
    if (sendFeedback) {
      setFormErrors(formErrorsCopy);
    }
    if (sendFeedback === false) {
      const errorObject = {};
      for (let send of feedbackToSend) {
        errorObject[send] = formErrorsCopy[send];
      }
      setFormErrors(errorObject);
    }
    setAnyErrors(anyErrors);
  };

  useEffect(() => {
    checkErrors(false, ['email']);
  }, [email]);

  useEffect(() => {
    checkErrors(false, ['password']);
  }, [password]);

  useEffect(() => {
    checkErrors(false, ['password', 'confirmPassword']);
  }, [confirmPassword]);

  return (
    <div className={'password-reset-page'}>
      <div className={'navbar-space-top'} />
      <div className={'password-reset-container'}>
        <img className={'password-reset-logo'} src={MainFroshLogo} alt={'Frosh week logo'} />
        <h1>Reset your password</h1>
        <h3>For F!rosh Week 2T2, UofT Engineering</h3>
        <div className={'full-width-input'}>
          <TextInput
            label={'Email'}
            isRequiredInput
            placeholder={'john.doe@email.com'}
            errorFeedback={formErrors['email']}
            autocomplete={'email'}
            onChange={(val) => {
              setEmail(val);
            }}
            localStorageKey={'email-login'}
          />
        </div>
        <div className={'full-width-input'}>
          <TextInput
            label={'Password'}
            isRequiredInput
            placeholder={'••••••••••••••'}
            inputType={'password'}
            errorFeedback={formErrors['password']}
            autocomplete={'new-password'}
            onChange={(val) => {
              setPassword(val);
            }}
          />
        </div>
        <div className={'full-width-input'}>
          <TextInput
            label={'Confirm Password'}
            isRequiredInput
            placeholder={'••••••••••••••'}
            inputType={'password'}
            errorFeedback={formErrors['confirmPassword']}
            autocomplete={'new-password'}
            onChange={(val) => {
              setConfirmPassword(val);
            }}
          />
        </div>
      </div>
    </div>
  );
};
