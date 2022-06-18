import React from 'react';
import PropTypes from 'prop-types';
import { getTimelineDates, getScheduleData } from './functions';
import { getSlideshowImages, getTimelineDates } from './functions';

import './Home.scss';
import Wave from '../../assets/misc/wave.png';
import WaveReverse from '../../assets/misc/wave-reverse.png';

import { Button } from '../../components/button/Button/Button';

import Landing1 from '../../assets/landing/landing-1.jpg';
import { Timeline } from '../../components/timeline/Timeline/Timeline';

import { Schedule } from '../../components/schedule/schedule/Schedule';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import MainFroshLogo from '../../assets/logo/frosh-main-logo.svg';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

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
  return (
    <div className="home-page-header">
      <div className="home-page-header-text">
        <h2>F!rosh Week</h2>
        <h1>2T2</h1>
        <p>Organized by the University of Toronto&apos;s Engineering Orientation Commitee</p>
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
      </div>
      <div className="home-page-landing-image-container">
        <HomePageSlideshow />
      </div>
      <img src={Wave} className="wave-image home-page-top-wave-image" />
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
  return (
    <div className="home-page-timeline">
      <h2 className="home-page-section-header">Timeline</h2>
      <Timeline dates={getTimelineDates()} />
    </div>
  );
};

const HomePageSchedule = () => {
  return (
    <div className="home-page-schedule">
      <h2 className="home-page-section-header">Schedule</h2>
      <Schedule scheduleList={getScheduleData()}></Schedule>
    </div>
  );
};

const HomePageSponsors = () => {
  return (
    <div className="home-page-sponsors">
      <img src={WaveReverse} className="wave-image home-page-bottom-wave-image" />
      <h2>Our Sponsors</h2>
      <ImageCarousel
        items={[
          {
            website: 'https://www.utoronto.ca/',
            image: MainFroshLogo,
          },
          {
            website: 'https://www.utoronto.ca/',
            image: MainFroshLogo,
          },
          {
            website: 'https://www.utoronto.ca/',
            image: MainFroshLogo,
          },
          {
            website: 'https://www.utoronto.ca/',
            image: MainFroshLogo,
          },
          {
            website: 'https://www.utoronto.ca/',
            image: MainFroshLogo,
          },
        ]}
      />
    </div>
  );
};

export { PageHome };
