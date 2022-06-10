import React from 'react';
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

const PageLogin = ({ incorrectEntry }) => {
  return (
    <div className="login-entire-page">
      <div className="login-bg">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <TextInput inputType={'text'} placeholder={'Username or Email'}></TextInput>
          <TextInput
            inputType={'password'}
            placeholder={'Password'}
            errorFeedback={'Invalid username or password. Please try again!'}
          ></TextInput>

          {/* Invalid Username or Password */}
          {/* {incorrectEntry ? <p className="login-error-message">Incorrect Username or Password, please try again!</p> : <></>} */}

          <div className="login-button-container">
            <p className="forgot-message">Forgot Password?</p>
            <Button label={'Log in'}></Button>
          </div>
        </div>
      </div>

      <div className="login-bg-images">
        <img className="mountain-back" src={MountainB} alt="mountain"></img>
        <img className="mountain-front-right" src={MountainFR} alt="mountain"></img>
        <img className="mountain-mid" src={MountainM} alt="mountain"></img>
        <img className="mountain-front-left" src={MountainFL} alt="mountain"></img>

        <img className="ground" src={Ground} alt="ground"></img>
        <img className="brachio-left" src={BrachioL} alt="brachiosaurus"></img>
        <img className="brachio-right" src={BrachioR} alt="brachiosaurus"></img>
      </div>
    </div>
  );
};

PageLogin.propTypes = {
  // if username/email/password are invalid
  incorrectEntry: PropTypes.bool,
};

PageLogin.defaultProps = {
  incorrectEntry: false,
};

export { PageLogin };
