import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';

import BackgroundColourDark from '../../assets/darkmode/login/background-colour-dark.svg';
import BackgroundDark from '../../assets/darkmode/login/background-dark.svg';
import CloudsDark from '../../assets/darkmode/login/clouds-dark.svg';
import CloudsLongDark from '../../assets/darkmode/login/clouds-long-dark.svg';
import ForegroundDark from '../../assets/darkmode/login/foreground-dark.svg';
import MidgroundDark from '../../assets/darkmode/login/midground-dark.svg';

import Background from '../../assets/login/background.svg';
import Birds from '../../assets/login/birds.svg';
import Clouds from '../../assets/login/clouds.svg';
import CloudsLong from '../../assets/login/clouds-long.svg';
import Foreground from '../../assets/login/foreground.svg';
import Midground from '../../assets/login/midground.svg';

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
  // pop up when clicking forget password
  // deafult -- popup off
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setSnackbar } = useContext(SnackbarContext);

  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loading, user } = useSelector(userSelector);
  // const [loginState, setLoginState] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          </div>
        </div>
        <div
          style={{ zIndex: 1 }}
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

        <LoginBackgroundImages />
      </div>
    </>
  );
};

const LoginBackgroundImages = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <>
      <div className="login-bg-images">
        {!darkMode ? (
          <img className="bg-colour" alt="background-colour"></img>
        ) : (
          <img className="bg-colour" src={BackgroundColourDark} alt="background-colour"></img>
        )}

        {!darkMode ? (
          <img className="bg" src={Background} alt="background"></img>
        ) : (
          <img className="bg" src={BackgroundDark} alt="background"></img>
        )}

        {!darkMode ? (
          <img className="birds" src={Birds} alt="birds"></img>
        ) : (
          <img className="birds" src={Birds} alt="birds"></img>
        )}

        {!darkMode ? (
          <img className="clouds" src={Clouds} alt="clouds"></img>
        ) : (
          <img className="clouds" src={CloudsDark} alt="clouds"></img>
        )}

        {!darkMode ? (
          <img className="clouds-long" src={CloudsLong} alt="clouds"></img>
        ) : (
          <img className="clouds-long" src={CloudsLongDark} alt="clouds"></img>
        )}

        {!darkMode ? (
          <img className="midground" src={Midground} alt="midground"></img>
        ) : (
          <img className="midground" src={MidgroundDark} alt="midground"></img>
        )}

        {!darkMode ? (
          <img className="foreground" src={Foreground} alt="foreground"></img>
        ) : (
          <img className="foreground" src={ForegroundDark} alt="foreground"></img>
        )}
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
