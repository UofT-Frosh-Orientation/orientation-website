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
import DiscordIcon from '../../assets/social/discord-brands.svg';
import {
  aboutScunt,
  okayToInviteToScunt,
  scuntDate,
  scuntDiscord,
} from '../../util/scunt-constants';
import { useDispatch, useSelector } from 'react-redux';
import { showDiscordLinkSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';

export const PageScuntHome = () => {
  return (
    <>
      <div className="navbar-space-top"></div>
      <ScuntCountdown />
      <ScuntLinks />
      <ScuntDiscord />
      <AboutScunt />
    </>
  );
};

const ScuntDiscord = () => {
  // if (okayToInviteToScunt === false) {
  //   return <div />;
  // }
  const [showDiscordLink, setShowDiscordLink] = useState(false);
  const [discordLink, setDiscordLink] = useState('');
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  //console.log(scuntSettings);
  // const [scuntSettings, setScuntSettings] = useState([]);
  const [localScuntSettings, setLocalScuntSettings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
  }, [loading]);

  useEffect(() => {
    // //setScuntSettings(dispatch(getScuntSettings()));
    // //console.log(showDiscordLink);
    // dispatch(getScuntSettings());

    // //console.log(scuntSettings);

    if (scuntSettings !== undefined) {
      if (Array.isArray(scuntSettings)) {
        // need to check!
        //console.log('here!');
        setLocalScuntSettings(scuntSettings[0]);
        setShowDiscordLink(scuntSettings[0]?.showDiscordLink);
        setDiscordLink(scuntSettings[0]?.discordLink);

        // console.log(scuntSettings[0]);
        // console.log('show discord?', showDiscordLink);
        // console.log('discord link', discordLink);
      }

      //console.log(scuntSettings[0]);
      //   console.log('show discord?', showDiscordLink);
      // console.log('discord link', discordLink);
    }

    // // setShowDiscordLink(scuntSettings.showDiscordLink);
    // // setDiscordLink(scuntSettings.discordLink);

    // // console.log('show discord?', showDiscordLink);
    // // console.log('discord link', discordLink);
    // // console.log(scuntSettings);
  }, [scuntSettings]);

  //console.log(scuntSettings);

  if (showDiscordLink !== true) {
    return <div />;
  } else {
    const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
    //console.log(scuntSettings);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-20px',
          overflowWrap: 'anywhere',
        }}
      >
        <a href={scuntDiscord} className="no-link-style" target={'_blank'} rel="noreferrer">
          <div
            className="frosh-instagram-container"
            style={{ padding: '15px 20px', margin: '10px 9px' }}
          >
            <img
              src={DiscordIcon}
              alt="Discord"
              style={{ filter: darkMode ? 'unset' : 'invert(1)' }}
            />
            <div>
              <p>Join the discord to chat with your team!</p>
              <h2 style={{ fontSize: '15px' }}>{discordLink}</h2>
            </div>
          </div>
        </a>
      </div>
    );
  }
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
          <div dangerouslySetInnerHTML={{ __html: aboutScunt }} />
        </div>
      </div>
      {darkMode ? (
        <img className="header-page-wave-bottom" src={waveBottomDarkMode} alt="wave"></img>
      ) : (
        <img className="header-page-wave-bottom" src={waveBottom} alt="wave"></img>
      )}
      <div style={{ height: '30px' }} />
    </>
  );
};

const ScuntCountdown = () => {
  const targetDate = new Date(scuntDate);
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
