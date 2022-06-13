import React from 'react';
import PropTypes from 'prop-types';
import './About.scss';
import { getInformation } from './functions';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import froshJames from '../../assets/about/froshJames_1000.png';
import Landing1 from '../../assets/landing/landing-1.jpg';
import waveTop from '../../assets/misc/wave.png';
import waveBottom from '../../assets/misc/wave-reverse.png';
import profileWave from '../../assets/about/wave-about.svg';

const PageAbout = () => {
  return (
    <>
      <AboutUsSection />
      <OCSection />
      <VCSection />
    </>
  );
};

const AboutUsSection = () => {
  return (
    <div className="aboutus-container">
      <img className="wave-top" src={waveTop} alt="wave"></img>
      <div className="aboutus-subcontainer">
        <h2 className="aboutus-title">About Us</h2>
        <div className="aboutus-title-underline"></div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="aboutus-image-container">
            <img className="aboutus-image" src={froshJames} alt="froshJames"></img>
          </div>

          <div className="aboutus-info-container">
            {aboutUsInfo.map((info) => {
              return (
                <div className="aboutus-info" key={info.title}>
                  <h2 className="aboutus-info-title">{info.title}</h2>
                  <p className="aboutus-info-des">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <img className="wave-bottom" src={waveBottom} alt="wave"></img>
    </div>
  );
};

const OCSection = () => {
  return (
    <div className="execteam-container">
      <h2 className="exec-title">Meet the Exec Team</h2>
      <div className="exec-title-underline"></div>

      {[execInfo.oc].map((info) => {
        return (
          <div className="oc-container" key={info.name}>
            <div className="oc-image"></div>
            <div className="oc-info">
              <div className="oc-title">
                <h2 className="oc-info-name">{info.name}</h2>
                <h3 className="oc-info-role">{info.role.toUpperCase()}</h3>
              </div>

              <p className="oc-info-des">{info.description}</p>
              <p className="oc-info-fav">{info.favPart}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const VCSection = () => {
  return (
    <div className="vc-section-container">
      {[execInfo.vcs].map((info) => {
        return (
          <div className="exec-profile-container" key={info.role}>
            <div className="exec-profile-image"></div>
            <img className="profile-wave" src={profileWave}></img>
            <div className="exec-profile-title">
              <h2 className="exec-profile-position">{info.position}</h2>
              <h2 className="exec-profile-name">{info.name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// const ExecProfile = () => {
//   return (

//   );
// };

export { PageAbout };
