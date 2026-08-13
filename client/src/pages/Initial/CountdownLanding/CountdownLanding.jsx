import { React, useEffect, useState, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './CountdownLanding.scss';
import { DarkModeContext } from '../../../util/DarkModeProvider';

// Import existing assets from the project
import MainFroshLogo from '../../../assets/logo/2T6logo.png';
import Wave from '../../../assets/misc/wave.png';
import WaveDarkMode from '../../../assets/darkmode/misc/wave.png';

const CountdownLanding = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [progress, setProgress] = useState(0);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    // Set your target date and start date for progress calculation
    const targetDate = new Date('2026-08-31T08:00:00').getTime();
    const startDate = new Date('2025-03-30T07:30:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;

      // Calculate progress percentage (0-100)
      const progressPercent = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      setProgress(progressPercent);

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-landing arcade-theme">
      {/* Subtle arcade header */}
      <div className="arcade-header">
        <div className="arcade-level">
          <span className="level-label">LEVEL</span>
          <span className="level-value">2025</span>
        </div>
      </div>

      <div className="countdown-container">
        <LazyLoadImage
          src={MainFroshLogo}
          className="countdown-logo"
          alt="frosh logo"
          effect="blur"
        />

        <h2 className="countdown-subtitle">COMING AUGUST 31ST</h2>
        <h1 className="countdown-title">F!ROSH WEEK 2T6</h1>

        {/* Secondary time display */}
        {/* <div className="time-remaining">
          <div className="time-text">
            <span className="time-prefix">Only </span>
            {timeLeft.days > 0 && <span className="time-value">{timeLeft.days}d </span>}
            {timeLeft.hours > 0 && <span className="time-value">{timeLeft.hours}h </span>}
            {timeLeft.minutes > 0 && <span className="time-value">{timeLeft.minutes}m </span>}
            <span className="time-value">{timeLeft.seconds || 0}s</span>
            <span className="time-suffix"> until F!ROSH WEEK</span>
          </div>
        </div> */}

        {/* Progress Bar Section with arcade touch */}
        <div className="progress-section">
          <h2 className="progress-heading">CURRENTLY LOADING...</h2>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-shine"></div>
              </div>
            </div>
            <div className="progress-stats">
              <div className="progress-percentage">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>

        {/* Registration Notice */}
        <div className="registration-notice">
          <h3 className="registration-title">Registration Opens Soon!</h3>
          <p className="registration-text">Check back here for registration details and updates</p>
        </div>

        {/* <p className="countdown-description">
          🕹️ Get ready for the most epic week of your university life! 
          <br />
          <strong>Monday, August 26th at 7:30 AM</strong>
        </p> */}

        <div className="countdown-social">
          <p>
            Follow us for updates:
            <a
              href="https://bit.ly/froshig"
              target="_blank"
              rel="noreferrer"
              className="countdown-link"
            >
              @froshweek
            </a>
          </p>
          <p>
            Join our Discord:
            <a
              href="https://discord.gg/C39WHaN3G"
              target="_blank"
              rel="noreferrer"
              className="countdown-link"
            >
              F!rosh Discord
            </a>
          </p>
          <p>
            Contact us:
            <a href="mailto:orientation@skule.ca" className="countdown-link">
              orientation@skule.ca
            </a>
          </p>
        </div>
      </div>

      {/* Wave background image from existing assets */}
      <LazyLoadImage
        src={darkMode ? WaveDarkMode : Wave}
        className="countdown-wave"
        alt="wave background"
        effect="blur"
      />
    </div>
  );
};

export { CountdownLanding };
