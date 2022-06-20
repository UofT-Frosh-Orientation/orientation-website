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

import XMark from '../../assets/misc/xmark-solid-white.svg';
import { login, resetPassword } from './functions';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';

const PageLogin = ({ incorrectEntry }) => {
  // pop up when clicking forget password
  // deafult -- popup off
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginState, setLoginState] = useState('');

  let username = '';
  let password = '';

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
                username = value;
              }}
              localStorageKey="email-login"
            />
            <TextInput
              inputType={'password'}
              placeholder={'Password'}
              onChange={(value) => {
                password = value;
              }}
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

              <Button
                label={'Log in'}
                onClick={async () => {
                  setIsLoading(true);
                  if (loginError !== '') {
                    setLoginError('');
                  }
                  const result = await login(username, password);
                  if (result === true) {
                    navigate('/profile'); //The profile page should redirect the Frosh if they haven't yet registered
                  } else {
                    setLoginError(result);
                    setIsLoading(false);
                  }
                }}
              />
            </div>
            <ErrorSuccessBox content={loginError} error={true} />
          </div>
        </div>
        <div className={`login-loading ${isLoading === true ? 'login-loading-appear' : ''}`}>
          <LoadingAnimation size={'60px'} />
        </div>

        <PasswordPopUp trigger={showPopUp} setTrigger={setShowPopUp} />

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

const PasswordPopUp = ({ trigger, setTrigger }) => {
  const [emailError, setEmailError] = useState('');

  let email = '';

  return trigger ? (
    <div className="forgot-password-popup">
      <div className="forgot-password-container">
        <img
          className="forgot-password-x-mark"
          src={XMark}
          alt="x-mark"
          onClick={() => {
            setTrigger(false);
            setEmailError('');
          }}
        ></img>

        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-des">{`Enter your email address below, and we'll send you an email to reset your password.`}</p>
        <TextInput
          inputType={'text'}
          placeholder={'Email'}
          onChange={(value) => {
            email = value;
          }}
          errorFeedback={emailError}
        />

        <Button
          label={'Send'}
          onClick={() => {
            if (emailError !== '') {
              setEmailError('');
            }
            const result = resetPassword(email);

            if (result !== true) {
              setEmailError(result);
            }
          }}
        ></Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

PasswordPopUp.propTypes = {
  trigger: PropTypes.bool,
  setTrigger: PropTypes.func,
};

export { PageLogin };
