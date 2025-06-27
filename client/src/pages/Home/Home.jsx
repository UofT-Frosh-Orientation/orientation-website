import React, { useState, useEffect, useContext } from 'react';
import { getSlideshowImages, getTimelineEvents } from './functions';
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
import MainFroshLogo from '../../assets/logo/main-logo-2T5.png';
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

import DiamondMedal from './sponsormedals/diamond.png';
import GoldMedal from './sponsormedals/gold.png';
import SilverMedal from './sponsormedals/silver.png';
import BronzeMedal from './sponsormedals/bronze.png';

const PageHome = () => {
  return (
    <>
      <HomePageHeader />
      <HomePageTimeline />
      <HomePageSchedule />
      <PageAbout />
      <HomePageSponsors />
    </>
  );
};

const HomePageHeader = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="home-page-header">
      {/* <LazyLoadImage
        src={MainFroshLogo}
        className="FroshHardHatWhite-logo"
        alt="home page frosh logo"
        effect="blur"
      ></LazyLoadImage> */}
      <div className="home-page-header-text">
        <h2>Welcome to</h2>
        <h1>F!rosh</h1>
        <h1>Week</h1>
        {/* <p>Organized by the University of Toronto Engineering Society Orientation Commitee</p> */}
        <HomeHeaderButton />
        <p>Check back soon for registration</p>
      </div>
      <div className="home-page-landing-image-container">
        <HomePageSlideshow />
      </div>
      {/* {darkMode ? (
        <img src={WaveDarkMode} className="wave-image home-page-top-wave-image" alt="wave-img" />
      ) : (
        <img src={Wave} className="wave-image home-page-top-wave-image" alt="wave-img" />
      )} */}
    </div>
  );
};

const HomeHeaderButton = () => {
  const loggedIn = useSelector(loggedInSelector);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

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
        <h2 className="home-page-section-header">TIMELINE</h2>
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
      {loggedIn ? (
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
      )}
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

const AboutUsSection = () => {
  return (
    <Header text="Other Events">
      <>
        {otherEventsData.map((info, index) => {
          return (
            <EventCard
              key={index}
              title={info.title}
              content={info.description}
              photoUrl={info.image}
              bgColorClass={index == 1 ? 'bg-purple' : 'bg-yellow'}
              textColorClass={index == 1 ? 'text-white' : 'text-black'}
              link={info.link}
            />
            // <div className="otherevents-subsubcontainer" key={info.title}>
            //   <div className="otherevents-image-container">
            //     <LazyLoadImage
            //       className="otherevents-image"
            //       src={index === 0 ? bsologo : facultylogo}
            //       alt={info.title}
            //     ></LazyLoadImage>
            //   </div>
            //   <div className="otherevents-info-container" key={info.title}>
            //     <div className="otherevents-info">
            //       <h2 className="otherevents-info-title">{info.title}</h2>
            //       <p
            //         className="otherevents-info-des"
            //         dangerouslySetInnerHTML={{ __html: info.description }}
            //       ></p>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </>
    </Header>
  );
};

const HomePageSponsors = () => {
  // To create a seamless infinite scroll, duplicate the sponsors list.
  const loopedSponsors = [...sponsors, ...sponsors];
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="home-page-sponsors">
      <div className="home-page-sponsors-header">
        <h2>Our Sponsors</h2>
        <p>F!rosh Week was brought to you thanks to the generous support of our sponsors.</p>
      </div>

      {sponsors.length > 0 && (
        <div className="sponsors-carousel-container" style={{ '--item-count': sponsors.length }}>
          <div className="sponsors-carousel-track">
            {loopedSponsors.map((item, index) => {
              // Add a class based on the sponsor's rank for styling
              const rankClass = item.rank ? `sponsor-card--${item.rank.toLowerCase()}` : '';
              // Extract only the sponsor's name from the label
              const sponsorName = item.label.includes(':') ? item.label.split(': ')[1] : item.label;
              // Get the appropriate medal icon
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
                      {darkMode ? (
                        <LazyLoadImage
                          alt={item.name}
                          effect="blur"
                          src={item.darkimage}
                          className="sponsor-image"
                        />
                      ) : (
                        <LazyLoadImage
                          alt={item.name}
                          effect="blur"
                          src={item.image}
                          className="sponsor-image"
                        />
                      )}
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
      <h3>Become a Sponsor</h3>
      <p>
        Please contact us at{' '}
        <a href="mailto:sponsorship@orientation.skule.ca">sponsorship@orientation.skule.ca</a> to
        learn more about our sponsorship opportunities.
      </p>
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
