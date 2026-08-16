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
    <div className="skule-hunt-home-page-header">
      <div className="skule-hunt-header-checker-block">
        <ScuntCountdown />
      </div>
      <div className="skule-hunt-header-text-stack">
        <div className="header-skule-text">Skule™</div>
        <div className="header-hunt-text">
          {'HUNT'.split('').map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScuntCountdown = () => {
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [targetDate, setTargetDate] = useState('2026-09-02T18:00:00');
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
    <div className="skule-hunt-countdown-timer-container">
      <div className="countdown-display">
        <div className="countdown-seg">
          <span className="countdown-label">DAYS</span>
          <div className="countdown-number digit">
            {checkNaN(getDateValues(countDown)[0]).toString().padStart(2, '0')}
          </div>
        </div>
        <span className="divider">:</span>
        <div className="countdown-seg">
          <span className="countdown-label">HOURS</span>
          <div className="countdown-number digit">
            {checkNaN(getDateValues(countDown)[1]).toString().padStart(2, '0')}
          </div>
        </div>
        <span className="divider">:</span>
        <div className="countdown-seg">
          <span className="countdown-label">MINUTES</span>
          <div className="countdown-number digit">
            {checkNaN(getDateValues(countDown)[2]).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};
