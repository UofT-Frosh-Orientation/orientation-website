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
      <ScuntCountdown />
      <ScuntLinks />
      <AboutScunt />
    </>
  );
};

const AboutScunt = () => {
  const { darkMode } = useContext(DarkModeContext);
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
    } catch (error) {
      console.error(error.toString());
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
      let settings = scuntSettings;
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
