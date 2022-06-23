import React from 'react';
import PropTypes from 'prop-types';
import './About.scss';
import { getInformation } from './functions';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import { ExecProfile } from './ExecProfile/ExecProfile';

import froshJames from '../../assets/about/froshJames_1000.png';
import Landing1 from '../../assets/landing/landing-1.jpg';
import waveTop from '../../assets/misc/wave.png';
import waveBottom from '../../assets/misc/wave-reverse.png';
import profileWave from '../../assets/about/wave-about.svg';

const PageAbout = () => {
  return (
    <>
      {/* <AboutUsHeader /> */}
      <div className="aboutus-page-components">
        <AboutUsSection />

        <div style={{ paddingTop: '25px' }}>
          <h2 className="exec-title">Meet the Exec Team</h2>
          <div className="exec-title-underline"></div>
        </div>
        <OCSection />
        <VCSection />
      </div>
    </>
  );
};

// const AboutUsHeader = () => {
//   return (
//     <div className="aboutus-header">
//       <img className="aboutus-main-picture" src={Landing1}></img>
//       <img className="aboutus-wave-top" src={waveTop} alt="wave"></img>
//     </div>
//   );
// };

const AboutUsSection = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-subcontainer">
        <h2 className="aboutus-title">About Us</h2>
        <div className="aboutus-title-underline"></div>

        <div className="aboutus-subsubcontainer">
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
        console.log(info.name);
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
