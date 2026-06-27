import React, { useState, useEffect, useContext, useRef } from 'react';
import { getSlideshowImages, getTimelineEvents, describeArc } from './functions';
import './Home.scss';
import Wave from '../../assets/misc/wave.png';
import WaveReverse from '../../assets/misc/wave-reverse.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import WaveReverseDarkmode from '../../assets/darkmode/misc/wave-reverse.png';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { Link } from 'react-router-dom';

import { Timeline } from '../../components/timeline/Timeline/Timeline';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import MainFroshLogo from '../../assets/logo/2T6logo.png';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { ScheduleComponent } from '../../components/schedule/ScheduleHome/ScheduleHome';
import { PopupModal } from '../../components/popup/PopupModal';
import { sponsors } from '../../util/sponsors';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../../state/user/userSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Header } from '../../components/text/Header/Header';
import { EventCard } from '../../components/OtherEventsCard/EventCard';
import { otherEventsData } from './otherevents';

import ProgressiveImage from '../../components/progressiveImg/ProgressiveImg';
import facultylogo from '../../assets/misc/facultylogo.png';
import bsologo from '../../assets/misc/bsologo.svg';
import slideshow1 from '../../assets/homeSlideshow/2T5/back.jpg';

import DiamondMedal from '../../assets/sponsors/sponsormedals/diamond.png';
import GoldMedal from '../../assets/sponsors/sponsormedals/gold.png';
import SilverMedal from '../../assets/sponsors/sponsormedals/silver.png';
import BronzeMedal from '../../assets/sponsors/sponsormedals/bronze.png';
import { CountdownHome } from '../../components/countdown/countdown';

const PageHome = () => {
  return (
    <>
      <HomePageHeader />
      {/* "What is F!rosh Week? / What is SKULE?" blurb hidden per request */}
      {/* <HomePageAboutBlurb /> */}
      <HomePageFilmStrip />
      <HomePageTimeline />
      {/* Other Events section (heading + spinning vinyl + thumbnail + info panel) hidden per request */}
      {/* <PageAbout /> */}
      <HomePageSponsors />
    </>
  );
};

const HomePageHeader = () => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <div className="home-page-header">
      <div className="header-checker-block">
        <CountdownHome />
      </div>

      {/* Star: top-right corner, independent — links to registration.
          NOTE: don't add `no-link-style` here — the global `a.no-link-style`
          rule uses `all: unset`, which would wipe the star's positioning,
          clip-path and background. The class below already sets the text color. */}
      <Link
        to={loggedIn ? '/profile' : '/sign-up'}
        className="header-register-star"
        style={{ textDecoration: 'none' }}
      >
        <span>
          Register
          <br />
          Now!
        </span>
      </Link>

      <div className="header-text-stack">
        <div className="header-frosh-text">F!rosh</div>
        <div className="header-week-text">
          {'WEEK'.split('').map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
        <span className="home-page-2t6-text">2T6</span>
      </div>
    </div>
  );
};

const HomePageFilmStrip = () => {
  const images = getSlideshowImages();
  const looped = [...images, ...images];
  return (
    <div className="film-strip-container">
      <div className="film-strip-holes" />
      <div className="film-strip-track">
        {looped.map((img, i) => (
          <img key={i} src={img.src} className="film-strip-photo" alt="" />
        ))}
      </div>
      <div className="film-strip-holes" />
    </div>
  );
};

const HomePageAboutBlurb = () => {
  return (
    <div className="home-page-about-blurb">
      <div className="home-page-about-col">
        <h2>What is F!rosh Week?</h2>
        <p>
          F!rosh Week is a week-long orientation where students and faculty welcome over 1000
          incoming students to the U of T Engineering Community! Central to the experience at
          Skule™, F!rosh Week consists of engaging and exciting events designed to introduce
          students to the community, traditions, and spirit of U of T Engineering.
        </p>
      </div>
      <div className="home-page-about-divider" />
      <div className="home-page-about-col">
        <h2>What is SKULE™?</h2>
        <p>
          Skule™ is the name of the University of Toronto&apos;s engineering community at the St.
          George campus. It is made up of about 5000 undergraduate students, hundreds of graduate
          students, and a range of dedicated alumni. It is also home to hundreds of engineering
          clubs, athletics teams, design teams, and traditions.
        </p>
      </div>
    </div>
  );
};

const HomeHeaderButton = () => {
  const loggedIn = useSelector(loggedInSelector);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  return (
    <>
      {isRegistrationOpen || loggedIn ? (
        <Link
          key={loggedIn ? '/profile' : '/sign-up'}
          to={loggedIn ? '/profile' : '/sign-up'}
          style={{ textDecoration: 'none' }}
          className="no-link-style"
        >
          <div className="home-page-header-register-button">
            <div className="desktop-only">
              <ButtonRound
                label={loggedIn ? 'View Profile' : 'Register Now'}
                isSecondary
                style={{
                  margin: '0px',
                  height: '100%',
                  fontSize: 'unset',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </div>
            <div className="mobile-only">
              <ButtonRound
                label={loggedIn ? 'View Profile' : 'Register Now'}
                isSecondary
                style={{ margin: '0px' }}
              />
            </div>
          </div>
        </Link>
      ) : (
        <div className="home-page-header-register-button">
          <div className="desktop-only">
            <ButtonRound
              label={loggedIn ? 'View Profile' : 'Register Now!'}
              isSecondary
              isDisabled
              style={{
                margin: '0px',
                height: '100%',
                fontSize: 'unset',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </div>
          <div className="mobile-only">
            <ButtonRound
              label={loggedIn ? 'View Profile' : 'Register Now!'}
              isSecondary
              isDisabled
              style={{ margin: '0px' }}
              disabled
            />
          </div>
        </div>
      )}
    </>
  );
};

const HomePageSlideshow = () => {
  const properties = {
    duration: 12000,
    autoplay: true,
    transitionDuration: 1000,
    arrows: false,
    infinite: true,
    easing: 'cubic',
  };
  return (
    <Slide {...properties}>
      {getSlideshowImages().map((image, index) => (
        <div key={index} style={{ overflow: 'hidden' }}>
          <ProgressiveImage
            classStyle="home-page-landing-image"
            src={image.src}
            placeholder={image.placeholder}
            alt={'slideshow' + index}
            loading="lazy"
          />
        </div>
      ))}
    </Slide>
  );
};

const HomePageTimeline = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [dates, setDates] = useState();
  const datesSetter = async () => {
    setDates(await getTimelineEvents());
  };
  useEffect(() => {
    datesSetter();
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
      <h2 className="home-page-section-header">Schedule</h2>
      {/* {loggedIn ? (
        <div className="home-page-schedule-warning">
          *Different F!rosh groups have different schedules. This is the basic schedule. To see your
          individual schedule, visit the{' '}
          <Link className="schedule-link" to={'/profile'}>
            Profile
          </Link>{' '}
          page.
        </div>
      ) : (
        <></>
      )} */}
      <ScheduleComponent />
    </div>
  );
};

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection />
        {/* <AboutUsTeamsTabWrapper /> */}
      </div>
    </>
  );
};

const SPIN_DURATION = 25000; // ms, matches CSS 25s
const LABEL_START_ANGLES = [0, 120, 240]; // Each arc starts here

const AboutUsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const activeEvent = otherEventsData[activeIndex];

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const deg = (elapsed / SPIN_DURATION) * 360; // Clockwise rotation degree
      setRotationDeg(deg);

      // The right side (3 o'clock) sits at exactly 90 degrees in this coordinate system
      const ARROW_TARGET_ANGLE = 90;

      // Small tolerance window (in degrees) to ensure requestAnimationFrame catches the alignment
      const INTERSECTION_TOLERANCE = 3;

      let found = -1;

      LABEL_START_ANGLES.forEach((startAngle, i) => {
        // The arc spans 110 degrees, so its exact middle is at startAngle + 55
        const textMidpoint = startAngle + 55;

        // Calculate the current absolute angle of this midpoint as the vinyl spins clockwise
        const currentMidpointAngle = (textMidpoint + deg) % 360;

        // Calculate the shortest angular distance to the right-side arrow (90°)
        const diff = Math.min(
          Math.abs(currentMidpointAngle - ARROW_TARGET_ANGLE),
          360 - Math.abs(currentMidpointAngle - ARROW_TARGET_ANGLE),
        );

        // Only switch the panel data when the middle of the title hits the arrow line
        if (diff < INTERSECTION_TOLERANCE) {
          found = i;
        }
      });

      if (found !== -1) {
        setActiveIndex(found);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="other-events-section">
      <h2 className="other-events-heading">Other Events</h2>
      <div className="other-events-layout">
        {/* Left: Vinyl */}
        <div className="vinyl-wrapper">
          <div className="vinyl-disc">
            <svg className="vinyl-disc-svg" viewBox="0 0 400 400">
              <defs>
                <circle id="discCircle" cx="200" cy="200" r="180" />
                {otherEventsData.map((event, index) => (
                  <path
                    key={`arc-${index}`}
                    id={`labelArc${index}`}
                    d={describeArc(200, 200, [150, 120, 90][index], index * 120, index * 120 + 110)}
                    fill="none"
                  />
                ))}
              </defs>

              {/* Spinning disc group */}
              <g style={{ transformOrigin: '200px 200px', transform: `rotate(${rotationDeg}deg)` }}>
                <use href="#discCircle" fill="#111" />
                {[150, 120, 90, 60].map((r) => (
                  <circle
                    key={r}
                    cx="200"
                    cy="200"
                    r={r}
                    fill="none"
                    stroke="#555"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                ))}
                {otherEventsData.map((event, index) => (
                  <text
                    key={index}
                    className={`vinyl-label-svg ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <textPath href={`#labelArc${index}`} startOffset="0%">
                      {event.title}
                    </textPath>
                  </text>
                ))}
                {/* Yellow center label */}
                <circle cx="200" cy="200" r="30" fill="#FCC600" stroke="#000000" strokeWidth="1" />
                <circle cx="200" cy="200" r="4" fill="#ffffff" />
              </g>

              {/* Fixed Arrow Indicator - Explicitly locked on the RIGHT side pointing LEFT */}
              {/* Tip is at x=365 (inside disc edge), Base is at x=385 (near outer edge) */}
              <polygon
                points="365,200 385,190 385,210"
                fill="#FCC600"
                stroke="#000"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        <div className="other-events-thumb-wrapper">
          <img src={activeEvent.image} alt={activeEvent.title} className="other-events-thumb-img" />
        </div>

        <div className="other-events-info-panel">
          <div className="other-events-info-text">
            <h3>{activeEvent.title}</h3>
            <p>{activeEvent.description}</p>

            <a
              href={activeEvent.link}
              target="_blank"
              rel="noreferrer"
              className="other-events-learn-more"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePageSponsors = () => {
  const loopedSponsors = [...sponsors, ...sponsors, ...sponsors];
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="home-page-sponsors">
      <div className="home-page-sponsors-header">
        <h2 className="sponsors-heading-genty">Our Sponsors</h2>
        <p>F!rosh Week was brought to you thanks to the generous support of our sponsors!</p>
      </div>

      {sponsors.length > 0 && (
        <div
          className="sponsors-carousel-container"
          style={{ '--item-count': loopedSponsors.length }}
        >
          {' '}
          <div className="sponsors-carousel-track">
            {loopedSponsors.map((item, index) => {
              const rankClass = item.rank ? `sponsor-card--${item.rank.toLowerCase()}` : '';
              const sponsorName = item.label.includes(':') ? item.label.split(': ')[1] : item.label;
              const medalIcon = getMedalIcon(item.rank);
              return (
                <div key={`${item.name}-${index}`} className={`sponsor-card ${rankClass}`}>
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    className="sponsor-card-link"
                  >
                    {medalIcon && (
                      <img
                        src={medalIcon}
                        alt={`${item.rank} sponsor`}
                        className="sponsor-medal-icon"
                      />
                    )}
                    <div className="sponsor-image-wrapper">
                      <LazyLoadImage
                        alt={item.name}
                        effect="blur"
                        src={darkMode ? item.darkimage : item.image}
                        className="sponsor-image"
                      />
                    </div>
                    <p className="sponsor-name">{sponsorName}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <PleaseSponsor />
    </div>
  );
};

const PleaseSponsor = () => {
  return (
    <div className="please-sponsor-container">
      <h3 className="please-sponsor-heading">
        Become a<br />
        <span className="sponsor-word-big">Sponsor!</span>
      </h3>
      <div className="please-sponsor-checkers">
        <p className="please-sponsor-text">
          Please contact us at{' '}
          <a href="mailto:sponsorship@orientation.skule.ca">sponsorship@orientation.skule.ca</a> to
          learn more about our sponsorship opportunities.
        </p>
      </div>
    </div>
  );
};

// Create a helper function to map ranks to medal images
const getMedalIcon = (rank) => {
  switch (rank?.toLowerCase()) {
    case 'diamond':
      return DiamondMedal;
    case 'gold':
      return GoldMedal;
    case 'silver':
      return SilverMedal;
    case 'bronze':
      return BronzeMedal;
    default:
      return null;
  }
};

export { PageHome };
