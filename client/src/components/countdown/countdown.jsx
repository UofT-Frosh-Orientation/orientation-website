import { React, useEffect, useState, useContext, useRef } from 'react';
import { DarkModeContext } from '../../util/DarkModeProvider';

import './countdown.scss';

const CountdownHome = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      // get current time and end time
      const currentDate = new Date().getTime();
      const targetDate = new Date('2026-08-31T07:30:00').getTime();

      let remainingTime = targetDate - currentDate;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
      }

      setTimeLeft({
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="countdown-timer-container">
      <div className="countdown-display">
        <div className="countdown-seg">
          <span className="countdown-label">DAYS</span>
          <div className="countdown-number">
            {(timeLeft.days ?? 0)
              .toString()
              .padStart(2, '0')
              .split('')
              .map((digit, i) => (
                <span key={`day-${i}`} className="digit">
                  {digit}
                </span>
              ))}
          </div>
        </div>
        <span className="divider">:</span>
        <div className="countdown-seg">
          <span className="countdown-label">HOURS</span>
          <div className="countdown-number">
            {(timeLeft.hours ?? 0)
              .toString()
              .padStart(2, '0')
              .split('')
              .map((digit, i) => (
                <span key={`hour-${i}`} className="digit">
                  {digit}
                </span>
              ))}
          </div>
        </div>
        <span className="divider">:</span>
        <div className="countdown-seg">
          <span className="countdown-label">MINUTES</span>
          <div className="countdown-number">
            {(timeLeft.minutes ?? 0)
              .toString()
              .padStart(2, '0')
              .split('')
              .map((digit, i) => (
                <span key={`minutes-${i}`} className="digit">
                  {digit}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CountdownHome };
