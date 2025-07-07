import { React, useEffect, useState, useContext, useRef } from 'react';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './countdown.scss';

const CountdownHome = () => {
  const { darkMode } = useContext(DarkModeContext);
  //const [eventName, setEventName] = useState("");
  //const [eventDate, setEventDate] = useState("");
  //const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    //if (countdownStarted) {
    const countdownInterval = setInterval(() => {
      // get current time and end time
      const currentTime = new Date().getTime();
      const targetDate = new Date('2025-08-26T07:30:00').getTime();

      let remainingTime = targetDate - currentTime;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
      }

      setTimeLeft({
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
    //}
  }, []);

  return (
    <div className="countdown-timer-container">
      <div className="countdown-display">
        <div className="countdown-value">
          {(timeLeft.days ?? 0).toString().padStart(2, '0')} <span>DAYS</span>
        </div>
        <div className="countdown-value">
          {(timeLeft.hours ?? 0).toString().padStart(2, '0')} <span>HOURS</span>
        </div>
        <div className="countdown-value">
          {(timeLeft.minutes ?? 0).toString().padStart(2, '0')} <span>MINUTES</span>
        </div>
        {/* { <div className="countdown-value"> }
            {seconds.toString().padStart(2, "0")} <span>seconds</span>
            </div> */}
      </div>
    </div>
  );
};

export { CountdownHome };
