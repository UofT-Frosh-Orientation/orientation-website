import React, { useContext, useEffect, useState } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import './SignUp.scss';
import { Button } from '../../components/button/Button/Button';
import { validateEmail, validatePassword, validatePasswordLength } from './functions';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { signUp } from '../../state/user/saga';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { SnackbarContext } from '../../util/SnackbarProvider';

const PageSignUp = () => {
  const [errors, setErrors] = useState({});
  const [accountObj, setAccountObj] = useState({});
  const [anyErrors, setAnyErrors] = useState({});
  const [pageState, setPageState] = useState('form');
  const [revealLeaderSignup, setRevealLeaderSignup] = useState(0);

  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setPageState('success');
    }
  }, [user]);

  const submitForm = () => {
    setPageState('loading');
    const setIsLoading = (isLoading) => {
      if (isLoading) setPageState('loading');
      else setPageState('form');
    };
    dispatch(signUp({ setSnackbar, setIsLoading, user: accountObj }));
  };

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
    } else if (validatePasswordLength(accountObj['password']) === false) {
      errorsCopy['password'] = 'Your password is too long. Please keep under 35 characters.';
      anyErrorsNow = true;
    } else if (validatePassword(accountObj['password']) === null) {
      errorsCopy['password'] =
        'Your password is too weak, it should be at least 8 characters long, have 1 uppercase letter, 1 lowercase letter, 1 digit, and one special character';
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
    if (sendFeedback === false) {
      const errorObject = {};
      for (let send of feedbackToSend) {
        errorObject[send] = errorsCopy[send];
      }
      setErrors(errorObject);
    }

    setAnyErrors(anyErrorsNow);
    return anyErrorsNow;
  };

  const handleLeaderReveal = () => {
    setRevealLeaderSignup(revealLeaderSignup + 1);
  };

  return (
    <div>
      <div
        className={`sign-up-page ${pageState !== 'form' ? 'sign-up-page-disappear' : ''}`}
        style={{ display: pageState === 'success' ? 'none' : '' }}
      >
        <div className="sign-up-container">
          <img
            className={`sign-up-logo ${revealLeaderSignup >= 5 ? 'sign-up-logo-expand' : ''}`}
            src={MainFroshLogo}
            onClick={handleLeaderReveal}
          ></img>
          <h1 style={{ color: 'var(--black)' }}>Create an Account</h1>
          <h3 style={{ color: 'var(--black)' }}>For F!rosh Week 2T2, UofT Engineering</h3>
          <div className="full-width-input">
            <TextInput
              label="Email"
              isRequiredInput
              placeholder={'john.doe@email.com'}
              errorFeedback={errors['email']}
              autocomplete={'email'}
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
              autocomplete={'new-password'}
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
              autocomplete={'new-password'}
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
                checkErrors(false);
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
                checkErrors(false);
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
          {revealLeaderSignup >= 5 ? (
            <div style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
              <Checkboxes
                values={['Request Leedur Account']}
                onSelected={(value, index, state, selectedIndices) => {
                  accountObj['leadur'] = state;
                }}
              />
            </div>
          ) : (
            <></>
          )}
          {/* <div
            style={{
              color: 'var(--text-dynamic)',
              textAlign: 'center',
              fontSize: '15px',
              width: '100%',
              margin: '20px',
            }}
          >
            <h2>You can no longer signup and register for Frosh events.</h2>
          </div> */}
          {/* <div
            className="sign-up-button"
            onMouseOver={() => {
              checkErrors(true);
            }}
          > */}
          <Button
            label="Create Account"
            style={{ margin: 0 }}
            isDisabled={anyErrors}
            onClick={async () => {
              const anyErrors = checkErrors(true);
              if (anyErrors === false) {
                submitForm();
              }
            }}
          />
          {/* </div> */}
        </div>
      </div>
      <div
        className={`sign-up-loading ${pageState === 'loading' ? 'sign-up-loading-appear' : ''} ${
          pageState === 'success' ? 'sign-up-loading-disappear' : ''
        }`}
      >
        <LoadingAnimation size={'60px'} />
      </div>
      <div>
        <div
          className={`sign-up-success ${pageState === 'success' ? 'sign-up-success-appear' : ''}`}
        >
          <div style={{ margin: 'auto auto' }}>
            <h2>{`Thank you for creating an account, ${
              accountObj['preferredName'] === null ||
              accountObj['preferredName'] === undefined ||
              accountObj['preferredName'] === ''
                ? accountObj['firstName']
                : accountObj['preferredName']
            }.`}</h2>
            {accountObj['leadur'] === true ? (
              <h3>
                Check your inbox for a link to verify your email. Your account will be reviewed and
                shortly become an official Leedur account.
              </h3>
            ) : (
              <>
                <h1>You aren&apos;t done just yet!</h1>
                <h3>
                  Check your inbox for a link to verify your email. You still need to register and
                  pay for the F!rosh Week event.
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageSignUp };
