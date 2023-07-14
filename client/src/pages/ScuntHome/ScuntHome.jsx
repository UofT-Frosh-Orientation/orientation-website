import React, { useState, useEffect, useContext } from 'react';
import './ScuntHome.scss';
import Wave from '../../assets/misc/wave.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import waveBottom from '../../assets/misc/wave-reverse.png';
import waveBottomDarkMode from '../../assets/darkmode/misc/wave-reverse.png';
import { Confetti } from '../../components/misc/Confetti/Confetti';
import { Link, useLocation } from 'react-router-dom';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { DarkModeContext } from '../../util/DarkModeProvider';
// import { ProfilePageScuntToken } from '../Profile/PageProfileFrosh';
import DiscordIcon from '../../assets/social/discord-brands.svg';
import { aboutScunt, okayToInviteToScunt, scuntDiscord } from '../../util/scunt-constants';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import useAxios from '../../hooks/useAxios';
import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';
const { axios } = useAxios();

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
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [showDiscordLink, setShowDiscordLink] = useState(false);
  const [discordLink, setDiscordLink] = useState('');
  const [revealTeams, setRevealTeams] = useState(false);

  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';

  const dispatch = useDispatch();

  useEffect(() => {
    if (scuntSettings !== undefined) {
      let settings = scuntSettings[0];

      setRevealTeams(settings?.revealTeams);
      setShowDiscordLink(settings?.showDiscordLink);
      setDiscordLink(settings?.discordLink);
    }
  }, [scuntSettings]);

  if (showDiscordLink !== true && revealTeams !== true && !leader) {
    // catch the undef states of the selector using !== true
    return <div />;
  } else {
    const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-20px',
          overflowWrap: 'anywhere',
        }}
      >
        <a href={discordLink} className="no-link-style" target={'_blank'} rel="noreferrer">
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
              {!leader && user?.attendingScunt === true ? (
                <h2 style={{ fontSize: '15px' }}>You are in team {user.scuntTeam}!</h2>
              ) : (
                <></>
              )}
              <p>Join the discord to chat with your team!</p>
              <p>{discordLink}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
};

const AboutScunt = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const [scuntTeams, setScuntTeams] = useState([]);
  const [scuntTeamObjs, setScuntTeamObjs] = useState();

  const getScuntTeams = async () => {
    try {
      const response = await axios.get('/scunt-teams');
      const { teamPoints } = response.data;
      if (teamPoints.length <= 0 || !teamPoints) setScuntTeams([]);
      else {
        setScuntTeamObjs(teamPoints);
        setScuntTeams(
          teamPoints.map((team) => {
            return team?.name;
          }),
        );
      }
    } catch (e) {
      console.error(e.toString());
      setScuntTeams(['Error loading teams']);
    }
  };

  useEffect(() => {
    getScuntTeams();
  }, []);

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
            <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: aboutScunt }} />
          <h4>
            Check the <Link to={'/scunt-rules'}>Rules</Link> for more information
          </h4>
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
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [targetDate, setTargetDate] = useState();
  const [countDownDate, setCountDownDate] = useState();
  //const [targetDate, targetDate]

  useEffect(() => {
    if (scuntSettings !== undefined) {
      let settings = scuntSettings[0];
      const tempDate = new Date(settings?.scuntDate);
      const tempCountDownDate = new Date(tempDate).getTime();

      setTargetDate(tempDate);
      setCountDownDate(tempCountDownDate);
    }
  }, [scuntSettings]);

  //const targetDate = new Date(scuntDate);
  //const countDownDate = new Date(targetDate).getTime();

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

  const checkNaN = (value) => {
    if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  };

  return (
    <div className="scunt-countdown-wrap">
      <div className="scunt-countdown">
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[0])}</h1>
          <h3>days</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[1])}</h1>
          <h3>hours</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[2])}</h1>
          <h3>minutes</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[3])}</h1>
          <h3>seconds</h3>
        </div>
      </div>
      {/* Only show confetti for the first 100 seconds overtime */}
      {countDown <= 0 && countDown / 1000 >= -100 ? <Confetti animate={true} /> : <></>}
    </div>
  );
};
