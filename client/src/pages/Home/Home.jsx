import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getSlideshowImages, getTimelineEvents } from './functions';
import './Home.scss';
import Wave from '../../assets/misc/wave.png';
import WaveReverse from '../../assets/misc/wave-reverse.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import WaveReverseDarkmode from '../../assets/darkmode/misc/wave-reverse.png';

import { Button } from '../../components/button/Button/Button';
import { Link } from 'react-router-dom';

import Landing1 from '../../assets/landing/landing-1.jpg';
import { Timeline } from '../../components/timeline/Timeline/Timeline';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';
import FroshHardHatWhite from '../../assets/logo/frosh-hard-hat-white.svg';

import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { ScheduleComponent } from '../../components/schedule/ScheduleHome/ScheduleHome';
import { PopupModal } from '../../components/popup/PopupModal';
import { sponsors } from '../../util/sponsors';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../../state/user/userSlice';

const PageHome = () => {
  return (
    <>
      <HomePageHeader />
      <HomePageTimeline />
      <HomePageSchedule />
      <HomePageSponsors />
    </>
  );
};

const HomePageHeader = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <div className="home-page-header">
      <img
        src={FroshHardHatWhite}
        className="FroshHardHatWhite-logo"
        alt="White Fr!osh Hard Hat Logo"
      ></img>
      <div className="home-page-header-text">
        <h2>Welcome to F!rosh Week!</h2>
        <p>Organized by the University of Toronto Engineering Society Orientation Commitee</p>
        <Link
          key={'/registration'}
          to={'/registration'}
          style={{ textDecoration: 'none' }}
          className="no-link-style"
        >
          <div className="home-page-header-register-button">
            <div className="desktop-only">
              <Button
                label="Register"
                isSecondary
                style={{
                  margin: '0px',
                  width: '100%',
                  height: '100%',
                  fontSize: 'unset',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </div>
            <div className="mobile-only">
              <Button label="Register" isSecondary style={{ margin: '0px' }} />
            </div>
          </div>
        </Link>
      </div>
      <div className="home-page-landing-image-container">
        <HomePageSlideshow />
      </div>
      {darkMode ? (
        <img src={WaveDarkMode} className="wave-image home-page-top-wave-image" />
      ) : (
        <img src={Wave} className="wave-image home-page-top-wave-image" />
      )}
    </div>
  );
};

const HomePageSlideshow = () => {
  const properties = {
    duration: 5000,
    autoplay: true,
    transitionDuration: 1000,
    arrows: false,
    infinite: true,
    easing: 'cubic',
  };
  return (
    <Slide {...properties}>
      {getSlideshowImages().map((image, index) => (
        <div key={index}>
          <img className="home-page-landing-image" src={image} alt={'slideshow' + index} />
        </div>
      ))}
    </Slide>
  );
};

const HomePageTimeline = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [dates, setDates] = useState();
  useEffect(async () => {
    setDates(await getTimelineEvents());
  }, []);
  return (
    !(dates === undefined || dates?.length === 0) && (
      <div className="home-page-timeline">
        <h2 className="home-page-section-header">Timeline</h2>
        <Timeline
          dates={dates}
          onClick={(date) => {
            setShowPopUp(true);
            setSelectedEvent(date);
          }}
        />

        <PopupModal
          trigger={showPopUp}
          setTrigger={setShowPopUp}
          blurBackground={false}
          exitIcon={true}
        >
          <div className="home-page-timeline-popup-container">
            <h1>{selectedEvent.eventName}</h1>
            <p>{selectedEvent.description}</p>

            {selectedEvent.link !== '' ? (
              <div className="home-page-timeline-popup-button">
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  className="no-link-style"
                  rel="noreferrer"
                >
                  <Button
                    label={selectedEvent.linkLabel}
                    isSecondary
                    style={{ margin: 0, float: 'right' }}
                  ></Button>
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </PopupModal>
      </div>
    )
  );
};

const HomePageSchedule = () => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <div className="home-page-schedule">
      <h2 className="home-page-section-header">Schedule{loggedIn ? '*' : ''}</h2>
      {loggedIn ? (
        <div className="home-page-schedule-warning">
          *Different Frosh groups have different schedules. The homepage schedule is the basic
          schedule. To see yours, visit the <Link to={'/profile'}>Profile</Link> page.
        </div>
      ) : (
        <></>
      )}
      <ScheduleComponent />
    </div>
  );
};

const HomePageSponsors = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    console.log(sponsors.length)
  }, [])
  return (
    <div className="home-page-sponsors">
      {darkMode ? (
        <img src={WaveReverseDarkmode} className="wave-image home-page-bottom-wave-image" />
      ) : (
        <img src={WaveReverse} className="wave-image home-page-bottom-wave-image" />
      )}
      <h2>Our Sponsors</h2>
      <PleaseSponsor />

      { sponsors.length > 0 && 
      <div>
        {viewAll === false ? (
          <ImageCarousel items={sponsors} />
        ) : (
          <div className="all-sponsors-area">
            {sponsors.map((item, index) => {
              return (
                <div key={item.name + index} className="sponsor-container">
                  <a
                    href={item.website}
                    key={item.name + index}
                    target="_blank"
                    rel="noreferrer"
                    className="no-link-style"
                  >
                    <img src={item.image} alt={item.name} />
                  </a>
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
        )}
        {!viewAll ? (
          <Button
            label={'View All'}
            onClick={() => {
              setViewAll(true);
            }}
          />
        ) : (
          <Button
            label={'View Less'}
            onClick={() => {
              setViewAll(false);
            }}
          />
        )}
      </div>
    }
    </div>
  );
};

const PleaseSponsor = () => {
  return (
    <div className="please-sponsor">
      <h3>Want to sponsor F!rosh Week?</h3>
      <h4>Please contact:</h4>
      <a href="mailto:sponsorship@orientation.skule.ca">sponsorship@orientation.skule.ca</a>
    </div>
  );
};

export { PageHome };
