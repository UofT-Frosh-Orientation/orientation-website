import { React, useState } from 'react';
import './About.scss';
import { getInformation } from './functions';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import { ExecProfile } from './ExecProfile/ExecProfile';

import waveBottom from '../../assets/misc/wave-reverse.png';
import ExecLogo from '../../assets/about/exec-tshirt-logo.svg';
import { useEffect } from 'react';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection />
        <AboutUsTeamsTab />

        {/* <div className="exec-title-container">
          <h2 className="exec-title">Meet the Exec Team</h2>
          <div className="exec-title-underline"></div>
        </div>
        <OCSection />
        <VCSection /> */}

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

const AboutUsExecTeam = () => {
  return (
    <>
      <OCSection />
      <VCSection />
    </>
  );
};

const tabs = [
  {
    title: 'Exec Team',
    component: <AboutUsExecTeam />,
  },
  {
    title: 'Tech Team',
  },
  {
    title: 'Subcoms',
  },
  {
    title: 'HLs',
  },
];

const AboutUsTeamsTab = () => {
  const [currentTab, setCurrentTab] = useState('Exec Team');

  let tabsCounter = 0;
  let numTabs = tabs.length;
  let tabComponent;

  return (
    <>
      <div className="aboutus-teams-all-tabs">
        <div className="aboutus-teams-all-tabs-scroll">
          {tabs.map((tab) => {
            tabsCounter++;
            //console.log(tabsCounter);
            return (
              <div key={tab.title} className="aboutus-teams-tabs">
                <div
                  className="aboutus-teams-tabs-container"
                  onClick={() => {
                    setCurrentTab(tab.title);
                  }}
                >
                  {tabsCounter > 1 ? <div className="aboutus-short-vertical-line"></div> : <></>}
                  <div
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
                  >
                    <h1
                      className="aboutus-teams-tabs-title"
                      style={
                        currentTab === tab.title
                          ? { color: 'var(--purple-shades-dark)', transition: 'color 200ms' }
                          : {}
                      }
                    >
                      {tab.title}
                    </h1>
                    <div
                      className={`aboutus-yellow-bubble ${
                        currentTab === tab.title
                          ? 'aboutus-yellow-bubble-show'
                          : 'aboutus-yellow-bubble-noshow'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="aboutus-tabs-component">
        {tabs.map((tab) => {
          if (currentTab === tab.title) {
            return tab.component;
          }
        })}
      </div>
    </>
  );
};

export { PageAbout };
