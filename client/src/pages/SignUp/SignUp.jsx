import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../components/input/TextInput/TextInput';
import './SignUp.scss';
import { Button } from '../../components/button/Button/Button';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { validateEmail, validatePassword } from './functions';
import MainFroshLogo from '../../assets/logo/frosh-main-logo.svg';

const PageSignUp = () => {
  const [errors, setErrors] = useState({});
  const [accountObj, setAccountObj] = useState({});
  const [anyErrors, setAnyErrors] = useState({});
  const checkErrors = (sendFeedback = true, feedbackToSend = []) => {
    let anyErrorsNow = false;
    const errorsCopy = {};
    if (accountObj['email'] === undefined || accountObj['email'] === '') {
      errorsCopy['email'] = 'Please enter an email';
      anyErrorsNow = true;
    } else if (validateEmail(accountObj['email']) === null) {
      errorsCopy['email'] = 'This email is not valid';
      anyErrorsNow = true;
    }
    if (accountObj['password'] === undefined || accountObj['password'] === '') {
      errorsCopy['password'] = 'Please enter a password';
      anyErrorsNow = true;
    } else if (validatePassword(accountObj['password']) === null) {
      errorsCopy['password'] =
        'Your password is too weak, it should be at least 8 characters long, have 1 uppercase letter, 1 lowercase letter and 1 digit';
      anyErrorsNow = true;
    }
    if (accountObj['confirmPassword'] === undefined || accountObj['confirmPassword'] === '') {
      errorsCopy['confirmPassword'] = 'Please confirm your password';
      anyErrorsNow = true;
    } else if (accountObj['confirmPassword'] !== accountObj['password']) {
      errorsCopy['confirmPassword'] = 'Passwords do not match!';
      anyErrorsNow = true;
    }
    if (accountObj['firstName'] === undefined || accountObj['firstName'] === '') {
      errorsCopy['firstName'] = 'Please enter a first name';
      anyErrorsNow = true;
    }
    if (accountObj['lastName'] === undefined || accountObj['lastName'] === '') {
      errorsCopy['lastName'] = 'Please enter a last name';
      anyErrorsNow = true;
    }
    if (sendFeedback) {
      setErrors(errorsCopy);
    }
    if (feedbackToSend !== [] && sendFeedback === false) {
      const errorObject = {};
      for (let send of feedbackToSend) {
        errorObject[send] = errorsCopy[send];
      }
      setErrors(errorObject);
    }
    setAnyErrors(anyErrorsNow);
    return anyErrorsNow;
  };

  return (
    <div className="sign-up-page">
      <div className="navbar-space-top" />
      <div className="sign-up-container">
        <img className="sign-up-logo" src={MainFroshLogo}></img>
        <h1>Create an Account</h1>
        <h3>For F!rosh Week 2T2, UofT Engineering</h3>
        <div className="full-width-input">
          <TextInput
            label="Email"
            isRequiredInput
            placeholder={'john.doe@email.com'}
            errorFeedback={errors['email']}
            onChange={(value) => {
              accountObj['email'] = value;
              checkErrors(false, ['email']);
            }}
            localStorageKey={'sign-up-email'}
          />
        </div>
        <div className="full-width-input">
          <TextInput
            label="Password"
            isRequiredInput
            placeholder={'••••••••••••••'}
            inputType={'password'}
            errorFeedback={errors['password']}
            onChange={(value) => {
              accountObj['password'] = value;
              checkErrors(false, ['password']);
            }}
          />
        </div>
        <div className="full-width-input">
          <TextInput
            label="Confirm Password"
            isRequiredInput
            placeholder={'••••••••••••••'}
            inputType={'password'}
            errorFeedback={errors['confirmPassword']}
            onChange={(value) => {
              accountObj['confirmPassword'] = value;
              checkErrors(false, ['password', 'confirmPassword']);
            }}
          />
        </div>
        <div className="half-width-input">
          <TextInput
            label="First Name"
            isRequiredInput
            placeholder={'John'}
            errorFeedback={errors['firstName']}
            onChange={(value) => {
              accountObj['firstName'] = value;
            }}
            localStorageKey={'sign-up-firstName'}
          />
        </div>
        <div className="half-width-input">
          <TextInput
            label="Last Name"
            isRequiredInput
            placeholder={'Doe'}
            errorFeedback={errors['lastName']}
            onChange={(value) => {
              accountObj['lastName'] = value;
            }}
            localStorageKey={'sign-up-lastName'}
          />
        </div>
        <div className="full-width-input">
          <TextInput
            label="Preferred Name"
            placeholder={'Joey'}
            errorFeedback={errors['preferredName']}
            onChange={(value) => {
              accountObj['preferredName'] = value;
              checkErrors(false);
            }}
            localStorageKey={'sign-up-preferredName'}
          />
        </div>
        <div className="sign-up-button">
          <Button
            label="Create Account"
            style={{ margin: 0 }}
            isDisabled={anyErrors}
            onClick={() => {
              checkErrors(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { PageSignUp };
