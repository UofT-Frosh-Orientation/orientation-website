import React, { useState, useEffect, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import useAxios from '../../hooks/useAxios';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import { getScuntTeams } from '../../state/scuntTeams/saga';
const { axios } = useAxios();
import './ScuntTitle.scss';
import bannerphoto from '../../assets/scunt/scunt-photo.jpg';

export const ScuntTitle = () => {
  return (
    <div className="scunt-title-container">
      <img className="scunt-title-image" src={bannerphoto}></img>
      <div className="scunt-title-gradient"></div>
      <h1 className="scunt-home-title-text">
        SKULE
        <br />
        HUNT
      </h1>
      {/* <ScuntCountdown /> */}
    </div>
  );
};

const ScuntCountdown = () => {
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [targetDate, setTargetDate] = useState('2025-08-27T18:00:00');
  const [countDownDate, setCountDownDate] = useState(new Date(targetDate).getTime());
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    if (scuntSettings !== undefined) {
      let settings = scuntSettings;
      // const tempDate = settings?.scuntDate;
      const tempCountDownDate = new Date(targetDate).getTime();

      // setTargetDate(tempDate);
      setCountDownDate(tempCountDownDate);
    }
  }, [scuntSettings]);

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
    <div className="scunt-countdown-wrap desktop-only">
      <div className="scunt-countdown desktop-only">
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[0])}</h1>
          <h3>DAYS</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[1])}</h1>
          <h3>HOURS</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[2])}</h1>
          <h3>MINUTES</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[3])}</h1>
          <h3>SECONDS</h3>
        </div>
      </div>
      {/* Only show confetti for the first 100 seconds overtime */}
      {/* {countDown <= 0 && countDown / 1000 >= -100 ? <Confetti animate={true} /> : <></>} */}
    </div>
  );
};
