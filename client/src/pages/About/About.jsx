import React from 'react';
import './About.scss';
import { getInformation } from './functions';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import { ExecProfile } from './ExecProfile/ExecProfile';

import waveBottom from '../../assets/misc/wave-reverse.png';
import ExecLogo from '../../assets/about/exec-tshirt-logo.svg';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection />

        <div className="exec-title-container">
          <h2 className="exec-title">Meet the Exec Team</h2>
          <div className="exec-title-underline"></div>
        </div>
        <OCSection />
        <VCSection />
        <div className="about-attribution-container">
          <p className="about-attribution-message">
            Thank you to{' '}
            <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">
              Font Awesome
            </a>{' '}
            and{' '}
            <a href="https://www.freepik.com/" target="_blank" rel="noreferrer">
              Freepik
            </a>{' '}
            for various icons and graphics used throughout the website!
          </p>
        </div>
      </div>
    </>
  );
};

const AboutUsSection = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-subcontainer">
        <h2 className="aboutus-title">About Us</h2>
        <div className="aboutus-title-underline"></div>

        <div className="aboutus-subsubcontainer">
          <div className="aboutus-image-container">
            <img className="aboutus-image" src={ExecLogo} alt="logo"></img>
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
      <img className="aboutus-wave-bottom" src={waveBottom} alt="wave"></img>
    </div>
  );
};

const OCSection = () => {
  return (
    <div className="aboutus-oc-container">
      {[execInfo.oc].map((info) => {
        return (
          <ExecProfile
            key={info.name}
            image={info.image}
            name={info.name}
            role={info.role}
            discipline={info.discipline}
            roleDescription={info.description}
            favPart={info.favPart}
          />
        );
      })}
    </div>
  );
};

const VCSection = () => {
  return (
    <div className="aboutus-vc-grid-container">
      {[...execInfo.vcs].map((info) => {
        return (
          <ExecProfile
            className="vc-grid-item"
            key={info.name}
            image={info.image}
            name={info.name}
            role={info.role}
            discipline={info.discipline}
            roleDescription={info.description}
            favPart={info.favPart}
          />
        );
      })}
    </div>
  );
};

export { PageAbout };
