import React, { useState, useEffect, useContext } from 'react';
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
import { DarkModeContext } from '../../util/DarkModeProvider';
import { ProfilePageScuntToken } from '../Profile/Profile';

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
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <>
      {darkMode ? (
        <img src={WaveDarkMode} className="wave-image wave-image-footer" />
      ) : (
        <img src={Wave} className="wave-image wave-image-footer" />
      )}
      <div className="about-scunt-container">
        <div className="about-scunt-content">
          <div className="about-scunt-token">
            <ProfilePageScuntToken />
          </div>
          <h2>Scunt</h2>
          <h3>What is Scunt?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel fermentum
            justo. Praesent ut sapien venenatis, sagittis sapien sit amet, iaculis ante. Aenean
            elementum laoreet ullamcorper. Aenean odio purus, interdum id consectetur id, tempor
            quis nisl. Mauris vitae nibh congue, ultrices felis non, dignissim purus. Duis feugiat
            sed tortor ac faucibus. Mauris ac elementum purus. Etiam pharetra viverra diam eu porta.
            Fusce nulla magna, posuere vel maximus ut, pharetra ullamcorper enim. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed egestas
            urna vitae ante tincidunt, quis faucibus leo faucibus. Ut et molestie mi, et fermentum
            orci. Cras vel purus vulputate, vestibulum massa id, vestibulum magna. Curabitur ante
            nisl, mattis eu tempor eu, vulputate sed purus. Mauris varius eros ut finibus mattis.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Ut nisi nisl, sodales in ligula at, dapibus dapibus lectus. Aenean vulputate nulla ante,
            vestibulum rutrum tellus molestie id. Etiam consectetur dui ac sapien faucibus maximus.
          </p>
          <h3>Group Meetup</h3>
          <p>Go find your group</p>
        </div>
      </div>
      {darkMode ? (
        <img className="header-page-wave-bottom" src={waveBottomDarkMode} alt="wave"></img>
      ) : (
        <img className="header-page-wave-bottom" src={waveBottom} alt="wave"></img>
      )}
    </>
  );
};

const ScuntCountdown = () => {
  const targetDate = new Date('September 25, 2022 16:56:00');
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
