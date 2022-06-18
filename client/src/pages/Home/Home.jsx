import React from 'react';
import PropTypes from 'prop-types';
import { getTimelineDates, getScheduleData } from './functions';
import './Home.scss';
import Wave from '../../assets/misc/wave.png';
import WaveReverse from '../../assets/misc/wave-reverse.png';

import { Button } from '../../components/button/Button/Button';

import Landing1 from '../../assets/landing/landing-1.jpg';
import { Timeline } from '../../components/timeline/Timeline/Timeline';
import { Schedule } from '../../components/schedule/schedule/Schedule';

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
          <Button label="Register" isSecondary style={{ margin: '0px' }} />
        </div>
      </div>
      <img src={Landing1} className="home-page-landing-image" />
      <img src={Wave} className="wave-image home-page-top-wave-image" />
    </div>
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
      <h2 className="">Our Sponsors</h2>
      <div style={{ height: '200px', width: '50px', padding: '50px' }}>Placeholder</div>
    </div>
  );
};

export { PageHome };
