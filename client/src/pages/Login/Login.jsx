import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';

import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { PopupModal } from '../../components/popup/PopupModal';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetSelector, userSelector } from '../../state/user/userSlice';
import { login, requestPasswordReset } from '../../state/user/saga';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';

// Messages!
const popupTitle = 'Reset Password';
const popupBodyText = `Enter your email address below, and we'll send you an email to reset your password`;
const emailSuccessMessage = `Success, an email has been sent!`;
const emailErrorMessage = `We didn't recognize that email, please try again!`;

const PageLogin = ({ incorrectEntry }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setSnackbar } = useContext(SnackbarContext);

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loading, user } = useSelector(userSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    loginButtonPress();
  };

  function loginButtonPress() {
    setIsLoading(true);
    dispatch(login({ setSnackbar, setIsLoading, email, password }));
  }

  useEffect(() => {
    if (user) {
      navigate('/profile', { state: { frosh: user } });
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      <div className="login-entire-page">
        <div className="login-bg">
          <div className={`login-container ${loading ? 'login-container-disappear' : ''}`}>
            <h1 className="login-title">LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <TextInput
                inputType={'text'}
                placeholder={'Email'}
                autocomplete={'email'}
                onChange={(value) => {
                  setEmail(value);
                }}
                localStorageKey="email-login"
              />
              <TextInput
                inputType={'password'}
                placeholder={'Password'}
                autocomplete={'current-password'}
                onChange={(value) => {
                  setPassword(value);
                }}
                onEnterKey={loginButtonPress}
              />
              <p
                className="forgot-message"
                onClick={() => setShowPopUp(true)}
              >{`Forgot Password?`}</p>

              <div className="login-button-container">
                <Button
                  label="Create Account"
                  isSecondary
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                />
                <Button label={'Log in'} type="submit" />
              </div>
            </form>
          </div>
        </div>
        <div
          style={{ zIndex: 50 }}
          className={`login-loading ${isLoading === true ? 'login-loading-appear' : ''}`}
        >
          <LoadingAnimation size={'60px'} />
        </div>

        <PopupModal
          trigger={showPopUp}
          setTrigger={setShowPopUp}
          blurBackground={false}
          exitIcon={true}
          heading={popupTitle}
          bodyText={popupBodyText}
        >
          <ForgotPassword trigger={showPopUp} setTrigger={setShowPopUp} />
        </PopupModal>
      </div>
    </>
  );
};

PageLogin.propTypes = {
  // if username/email/password are invalid
  incorrectEntry: PropTypes.bool,
};
PageLogin.defaultProps = {
  incorrectEntry: false,
};

const ForgotPassword = ({ trigger, setTrigger }) => {
  const [email, setEmailInput] = useState(''); // email entered by user
  const [buttonClick, setButtonClick] = useState(0);
  const { loading, error, passwordResetRequest } = useSelector(requestPasswordResetSelector);
  const dispatch = useDispatch();

  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-container-email">
          <TextInput
            inputType={'text'}
            placeholder={'Email'}
            localStorageKey={'forgot-password-container-email'}
            onChange={(value) => {
              setEmailInput(value);
            }}
            onEnterKey={() => {
              setButtonClick(buttonClick + 1);
              dispatch(requestPasswordReset(email));
            }}
          />
        </div>

        <div className="password-reset-button-loading-container">
          {loading ? (
            // if loading, then display loading animation
            <div
              className={`password-reset-loading ${loading ? 'password-reset-loading-appear' : ''}`}
            >
              <LoadingAnimation size={'60px'} />
            </div>
          ) : // if not loading, display the buttons
          passwordResetRequest ? (
            <Button
              label={'Close'}
              onClick={() => {
                setTrigger(false);
              }}
            />
          ) : (
            <Button
              label={'Send'}
              onClick={() => {
                setButtonClick(buttonClick + 1);
                dispatch(requestPasswordReset(email));
                // setButtonClick(buttonClick + 1);
              }}
            />
          )}
        </div>

        <div className="password-reset-result-message">
          {
            // added buttonclick, so the message doesn't display immediately
            buttonClick > 0 && !loading ? (
              passwordResetRequest ? (
                <ErrorSuccessBox
                  content={
                    passwordResetRequest
                      ? 'We have sent an email to the address you provided. Please follow the instructions there to reset your password.'
                      : ''
                  }
                  success={true}
                />
              ) : (
                <ErrorSuccessBox
                  content={error ? 'Something went wrong. Please try again later.' : ''}
                  error={true}
                />
              )
            ) : (
              <></>
            )
          }
        </div>
      </div>
    </>
  );
};

ForgotPassword.propTypes = {
  trigger: PropTypes.bool,
  setTrigger: PropTypes.func,
};

export { PageLogin };
