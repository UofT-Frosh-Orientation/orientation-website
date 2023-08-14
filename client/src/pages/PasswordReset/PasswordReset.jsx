import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './PasswordReset.scss';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { validateEmail, validatePassword, validatePasswordLength } from '../SignUp/functions';
import { Button } from '../../components/button/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../state/user/saga';
import { passwordResetSelector } from '../../state/user/userSlice';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';

const PasswordReset = () => {
  const { token } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [anyErrors, setAnyErrors] = useState(false);
  const dispatch = useDispatch();

  const { loading, error, resetPasswordSucceeded } = useSelector(passwordResetSelector);

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
    return anyErrors;
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

  const submitForm = () => {
    dispatch(resetPassword({ email, password, token }));
  };

  const isForm = useMemo(() => {
    return !loading && !resetPasswordSucceeded;
  }, [loading, resetPasswordSucceeded]);

  return (
    <div>
      <div
        className={`password-reset-page ${!isForm ? 'password-reset-page-disappear' : ''}`}
        style={{ display: resetPasswordSucceeded ? 'none' : '' }}
      >
        <div className={'navbar-space-top'} />
        <div className={'password-reset-container'}>
          <img className={'password-reset-logo'} src={MainFroshLogo} alt={'Frosh week logo'} />
          <h1 style={{ color: 'var(--text-dynamic)' }}>Reset your password</h1>
          <h3 style={{ color: 'var(--text-dynamic)' }}>For F!rosh Week 2T3, UofT Engineering</h3>
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
          <div
            className="password-reset-button"
            onMouseOver={() => {
              checkErrors(true);
            }}
          >
            <Button
              label="Reset Password"
              style={{ margin: 0 }}
              isDisabled={anyErrors}
              onClick={async () => {
                const anyErrors = checkErrors(true);
                if (anyErrors === false) {
                  submitForm();
                }
              }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <ErrorSuccessBox
              content={
                error
                  ? 'Something went wrong. Please ensure that your email matches the one you made your account with.'
                  : ''
              }
              error
            />
          </div>
        </div>
      </div>
      <div
        className={`password-reset-loading ${loading ? 'password-reset-loading-appear' : ''} ${
          resetPasswordSucceeded ? 'password-reset-loading-disappear' : ''
        }`}
      >
        <LoadingAnimation size={'60px'} />
      </div>
      <div>
        <div
          className={`password-reset-success ${
            resetPasswordSucceeded ? 'password-reset-success-appear' : ''
          }`}
        >
          <div style={{ margin: 'auto auto' }}>
            <div className={'navbar-space-top'} />
            <h2 style={{ color: 'var(--text-dynamic)' }}>
              You&apos;ve successfully reset your password!
            </h2>
            <h3 style={{ color: 'var(--text-dynamic)' }}>
              {' '}
              To access your account, please sign in with your updated password.
            </h3>
            <Link to={'/login'}>
              <div>
                <Button
                  label={'Login'}
                  style={{ padding: '25px 60px', fontSize: '20px', borderRadius: '20px' }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
