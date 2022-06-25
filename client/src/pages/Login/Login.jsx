import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';

import BrachioR from '../../assets/login/brachiosaurus-ground-right.svg';
import BrachioL from '../../assets/login/brachiosaurus-ground-left.svg';
import Ground from '../../assets/login/ground.svg';
import MountainB from '../../assets/login/mountain-back.svg';
import MountainFL from '../../assets/login/mountain-front-left.svg';
import MountainFR from '../../assets/login/mountain-front-right.svg';
import MountainM from '../../assets/login/mountain-mid.svg';
import Ptero from '../../assets/login/ptero.svg';

import { login, resetPassword } from './functions';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { PopupModal } from '../../components/popup/PopupModal';
import { useDeferredValue } from 'react';

// Messages!
const popupTitle = 'Reset Password';
const popupBodyText = `Enter your email address below, and we'll send you an email to reset your password`;
const emailSuccessMessage = `Success, an email has been sent!`;
const emailErrorMessage = `We didn't recognize that email, please try again!`;

const PageLogin = ({ incorrectEntry }) => {
  // pop up when clicking forget password
  // deafult -- popup off
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginState, setLoginState] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginButtonPress() {
    setIsLoading(true);
    if (loginError !== '') {
      setLoginError('');
    }
    const result = await login(username, password);
    if (result === true) {
      navigate('/profile');
      //The profile page should redirect the Frosh if they haven't yet registered
    } else {
      setLoginError(result);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="login-entire-page">
        <div className="login-bg">
          <div className={`login-container ${isLoading ? 'login-container-disappear' : ''}`}>
            <h1 className="login-title">Login</h1>
            <TextInput
              inputType={'text'}
              placeholder={'Email'}
              onChange={(value) => {
                setUsername(value);
              }}
              localStorageKey="email-login"
            />
            <TextInput
              inputType={'password'}
              placeholder={'Password'}
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
              <ButtonOutlined
                label="Create account"
                isSecondary
                onClick={() => {
                  navigate('/sign-up');
                }}
              />

              <Button label={'Log in'} onClick={loginButtonPress} />
            </div>
            <ErrorSuccessBox content={loginError} error={true} />
          </div>
        </div>
        <div className={`login-loading ${isLoading === true ? 'login-loading-appear' : ''}`}>
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

        <LoginBackgroundImages />
      </div>
    </>
  );
};

const LoginBackgroundImages = () => {
  return (
    <>
      <div className="login-bg-images">
        <img className="mountain-back" src={MountainB} alt="mountain"></img>
        <img className="mountain-front-right" src={MountainFR} alt="mountain"></img>
        <img className="mountain-mid" src={MountainM} alt="mountain"></img>
        <img className="mountain-front-left" src={MountainFL} alt="mountain"></img>

        <img className="ground" src={Ground} alt="ground"></img>
        <img className="brachio-left" src={BrachioL} alt="brachiosaurus"></img>
        <img className="brachio-right" src={BrachioR} alt="brachiosaurus"></img>
        <img className="ptero" src={Ptero} alt="ptero"></img>
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
  const [emailError, setEmailError] = useState(''); // error message returned -- either a success or error
  const [passwordResetSuccess, setpasswordResetSuccess] = useState(false); // success or not
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [emailInput, setEmailInput] = useState(''); // email entered by user
  const [buttonClick, setButtonClick] = useState(0);

  async function resetButtonPress() {
    setIsLoadingPassword(true);
    setButtonClick(buttonClick + 1);
    if (emailError !== '') {
      setEmailError('');
    }
    const result = await resetPassword(emailInput);
    if (result === true) {
      // this will display success message and change Button to close
      setpasswordResetSuccess(true);
      setIsLoadingPassword(false);
    } else {
      setEmailError(result);
      setIsLoadingPassword(false);
      setpasswordResetSuccess(false);
    }
  }

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
            onEnterKey={resetButtonPress}
          />
        </div>

        <div className="password-reset-button-loading-container">
          {isLoadingPassword ? (
            // if loading, then display loading animation
            <div
              className={`password-reset-loading ${
                isLoadingPassword === true ? 'password-reset-loading-appear' : ''
              }`}
            >
              <LoadingAnimation size={'60px'} />
            </div>
          ) : // if not loading, display the buttons
          passwordResetSuccess ? (
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
                resetButtonPress();
                // setButtonClick(buttonClick + 1);
                //console.log(buttonClick);
              }}
            />
          )}
        </div>

        <div className="password-reset-result-message">
          {
            // added buttonclick, so the message doesn't display immediately
            buttonClick > 0 && !isLoadingPassword ? (
              passwordResetSuccess ? (
                <ErrorSuccessBox content={emailSuccessMessage} success={true} />
              ) : (
                <ErrorSuccessBox content={emailErrorMessage} error={true} />
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
