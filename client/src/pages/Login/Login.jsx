import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';

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

const PageLogin = ({ incorrectEntry }) => {
  // pop up when clicking forget password
  // deafult -- popup off
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <div className="login-entire-page">
        <div className="login-bg">
          <div className="login-container">
            <h1 className="login-title">Login</h1>
            <TextInput inputType={'text'} placeholder={'Email'}></TextInput>
            <TextInput
              inputType={'password'}
              placeholder={'Password'}
              errorFeedback={'Invalid email or password. Please try again!'}
            ></TextInput>

            {/* Invalid Username or Password */}
            {/* {incorrectEntry ? <p className="login-error-message">Incorrect Username or Password, please try again!</p> : <></>} */}

            <div className="login-button-container">
              <p
                className="forgot-message"
                onClick={() => setShowPopUp(true)}
              >{`Forgot Password?`}</p>
              <Button label={'Log in'}></Button>
            </div>
          </div>
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
  // const [showPopUp, setShowPopUp] = useState(true);

  return trigger ? (
    <div className="forgot-password-popup">
      <div className="forgot-password-container">
        <img className="x-mark" src={XMark} alt="x-mark" onClick={() => setTrigger(false)}></img>

        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-des">{`Enter your email address below, and we'll send you an email to reset your password.`}</p>
        <TextInput inputType={'text'} placeholder={'Email'}></TextInput>
        <Button label={'Send'}></Button>

        {/* when button is clicked message appears */}
        <div className="reset-password-message-con">
          <p className="reset-password-message"></p>
        </div>
        {/* We couldn't find your email, try again!  OR  Email sent successfully */}
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
