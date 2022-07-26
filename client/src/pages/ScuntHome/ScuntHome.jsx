import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScuntHome.scss';
import Wave from '../../assets/misc/wave.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import waveBottom from '../../assets/misc/wave-reverse.png';
import waveBottomDarkMode from '../../assets/darkmode/misc/wave-reverse.png';
import { Confetti } from '../../components/misc/Confetti/Confetti';
import { Button } from '../../components/button/Button/Button';
import { Link, useLocation } from 'react-router-dom';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { pages } from '../../util/pages';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';

export const PageScuntHome = () => {
  return (
    <>
      <div className="navbar-space-top"></div>
      <ScuntCountdown />
      <ScuntLinks />
      <AboutScunt />
    </>
  );
};

const AboutScunt = () => {
  return (
    <>
      <img src={Wave} className="wave-image wave-image-footer" />
      <img src={WaveDarkMode} className="wave-image wave-image-footer-darkmode" />
      <div className="about-scunt-container">
        <div className="home-page-schedule">
          <h2>Scunt</h2>
          <h3>What is Scunt?</h3>
          <p>This is Scunt</p>
          <h3>Group Meetup</h3>
          <p>Go find your group</p>
        </div>
      </div>
      <img className="header-page-wave-bottom" src={waveBottom} alt="wave"></img>
      <img className="header-page-wave-bottom-darkmode" src={waveBottomDarkMode} alt="wave"></img>
    </>
  );
};

const ScuntCountdown = () => {
  const targetDate = new Date('July 25, 2022 16:56:00');
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const getDateValues = (countDown) => {
    if (countDown <= 0) {
      return [0, 0, 0, 0];
    }
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  return (
    <div className="scunt-countdown-wrap">
      <div className="scunt-countdown">
        <div className="scunt-countdown-number">
          <h1>{getDateValues(countDown)[0]}</h1>
          <h3>days</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{getDateValues(countDown)[1]}</h1>
          <h3>hours</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{getDateValues(countDown)[2]}</h1>
          <h3>minutes</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{getDateValues(countDown)[3]}</h1>
          <h3>seconds</h3>
        </div>
      </div>
      {/* Only show confetti for the first 100 seconds overtime */}
      {countDown <= 0 && countDown / 1000 >= -100 ? <Confetti animate={true} /> : <></>}
    </div>
  );
};
