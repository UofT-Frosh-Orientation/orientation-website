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

const PageLogin = ({ incorrectEntry }) => {
  // pop up when clicking forget password
  // deafult -- popup off
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginState, setLoginState] = useState('');

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // if the email is successful, send button disappears

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

        {/* <PasswordPopUp trigger={showPopUp} setTrigger={setShowPopUp} /> */}
        <PopupModal
          trigger={showPopUp}
          setTrigger={setShowPopUp}
          blurBackground={false}
          exitIcon={true}
          heading={'hellooooooo'}
          bodyText={
            'ashfihdfoenvaoiypbt8wybrhi ogsdrohvnfkl osyn io;sbin inhosgbnioh;gf inoh;g isgoi h;gifh;'
          }
          // bgHeight="150vh"
          // bgHeightMobile="100vh"
          // containerTop="25vh"
        >
          <>
            <ForgotPassword />
            <div
              className="hihihihih"
              style={{ width: '100px', height: '100px', background: 'blue' }}
            ></div>
          </>
        </PopupModal>

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

const ForgotPassword = () => {
  const [emailError, setEmailError] = useState(''); // error message returned -- either a success or error
  const [passwordResetSuccess, setpasswordResetSuccess] = useState('false'); // success or not
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [emailInput, setEmailInput] = useState(''); // email entered by user

  // let email = '';

  return (
    <div
      className={`forgot-password-container ${
        isLoadingPassword ? 'forgot-password-container-disappear' : ''
      }`}
    >
      <h2 className="reset-password-title">Reset Password</h2>
      <p className="reset-password-des">{`Enter your email address below, and we'll send you an email to reset your password.`}</p>
      <TextInput
        inputType={'text'}
        placeholder={'Email'}
        onChange={(value) => {
          setEmailInput(value);
          // email = value;
        }}
        // errorFeedback={emailError}
      />

      {/* if email was correct and password email will send, do not display button */}
      {passwordResetSuccess ? (
        <Button
          label={'Send'}
          onClick={async () => {
            setIsLoadingPassword(true);

            if (emailError !== '') {
              setEmailError('');
            }
            const result = await resetPassword(emailInput);

            if (result === true) {
              setpasswordResetSuccess(true);
            } else {
              setIsLoadingPassword(false);
              setEmailError(result);
              setpasswordResetSuccess(false);
            }
          }}
          style={{ zIndex: '10' }}
        />
      ) : (
        <></>
      )}

      {/* if email was valid display success message, else display errorBox */}
      {/* { passwordResetSuccess ?  */}
      <div
        className={`password-reset-loading ${
          isLoadingPassword === true ? 'password-reset-loading-appear' : ''
        }`}
      >
        <LoadingAnimation size={'60px'} />
      </div>

      {/* if email valid, success box appears, else, error box appears */}
      {passwordResetSuccess ? (
        <div className="success-password-reset-container-message">
          <ErrorSuccessBox
            content={"We didn't recognize that email, please try again!"}
            success={true}
          />
        </div>
      ) : (
        <div className="error-password-reset-container-message">
          <ErrorSuccessBox content={emailError} error={true} />
        </div>
      )}
    </div>
  );
};

export { PageLogin };
