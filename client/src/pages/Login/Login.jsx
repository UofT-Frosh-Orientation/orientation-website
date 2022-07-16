import React, { useState, useEffect } from 'react';
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

import { resetPassword } from './functions';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { PopupModal } from '../../components/popup/PopupModal';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetSelector, userSelector } from '../userSlice';
import { login, requestPasswordReset } from './saga';

// Messages!
const popupTitle = 'Reset Password';
const popupBodyText = `Enter your email address below, and we'll send you an email to reset your password`;
const emailSuccessMessage = `Success, an email has been sent!`;
const emailErrorMessage = `We didn't recognize that email, please try again!`;

const PageLogin = ({ incorrectEntry }) => {
  // pop up when clicking forget password
  // deafult -- popup off
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, user } = useSelector(userSelector);
  console.log(error);
  // const [loginError, setLoginError] = useState('');
  // const [loginState, setLoginState] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginButtonPress() {
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    console.log(user);
    if (user && !error) {
      navigate('/profile', { state: { frosh: user } });
    }
  }, [user]);

  return (
    <>
      <div className="login-entire-page">
        <div className="login-bg">
          <div className={`login-container ${loading ? 'login-container-disappear' : ''}`}>
            <h1 className="login-title">Login</h1>
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
              <ButtonOutlined
                label="Create account"
                isSecondary
                onClick={() => {
                  navigate('/sign-up');
                }}
              />

              <Button label={'Log in'} onClick={loginButtonPress} />
            </div>
            <ErrorSuccessBox content={error?.message ?? ''} error={true} />
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
  const [email, setEmailInput] = useState(''); // email entered by user
  const [buttonClick, setButtonClick] = useState(0);
  const { loading, error, passwordResetRequest } = useSelector(requestPasswordResetSelector);
  const dispatch = useDispatch();
  console.log(passwordResetRequest && !loading);

  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-container-email">
          <TextInput
            inputType={'text'}
            placeholder={'Email'}
            localStorageKey={'forgot-password-container-email'}
            onChange={(value) => {
              console.log('Email', value);
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
                //console.log(buttonClick);
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
