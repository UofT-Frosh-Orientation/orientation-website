import { React, useState, useRef } from 'react';
import './About.scss';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';

import { ExecProfile } from './ExecProfile/ExecProfile';
import newAboutLogo from '../../assets/about/F! Purple.png';
import { Header } from '../../components/text/Header/Header';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import gachamachine from '../../assets/about/gachamachine.png';
import clawmachine from '../../assets/about/clawmachine.png';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection className="header-section-top" />
        <AboutUsExecTeam />
      </div>
    </>
  );
};

const AboutUsSection = () => {
  return (
    <Header text="About Us">
      <div className="aboutus-subsubcontainer">
        <div className="aboutus-image-container">
          <LazyLoadImage className="aboutus-image" src={newAboutLogo} alt="logo"></LazyLoadImage>
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
    </Header>
  );
};

const OCSection = () => {
  return (
    <div className="aboutus-oc-grid-container">
      {[...execInfo.ocs].map((info) => {
        return (
          <ExecProfile
            key={info.name}
            className="oc-grid-item"
            image={info.image}
            name={info.name}
            role={info.role}
            discipline={info.discipline}
            roleDescription={info.description}
            exec={true}
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
            key={info.name}
            className="vc-grid-item"
            image={info.image}
            name={info.name}
            role={info.role}
            discipline={info.discipline}
            roleDescription={info.description}
            exec={true}
          />
        );
      })}
    </div>
  );
};

const AboutUsExecTeam = () => {
  const [displayGame, setDisplayGame] = useState(true);
  const [execIndex, setExecIndex] = useState(0);

  const getNextExec = () => {
    // Consider implementing randomization
    shake();
    setTimeout(() => {
      setExecIndex((execIndex + 1) % (execInfo.vcs.length + execInfo.ocs.length));
    }, 2000);
  };

  const machineRef = useRef(null);
  const shake = () => {
    const el = machineRef.current;
    if (!el) return;

    el.classList.add('shake-animation');

    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove('shake-animation');
      },
      { once: true },
    );
  };

  return (
    <>
      <div>
        <h1 className="executive-title">Meet the Executives</h1>
      </div>

      <div className="toggle-container">
        <button
          className={`exec-display-toggle ${displayGame ? 'game-view' : 'card-view'}`}
          onClick={() => setDisplayGame(!displayGame)}
        >
          <div className={`thumb ${displayGame ? 'thumb-game' : 'thumb-card'}`}>
            {displayGame ? 'Game View' : 'Card View'}
          </div>
        </button>
      </div>

      {displayGame ? (
        <div className="exec-game-container">
          <button onClick={getNextExec} ref={machineRef}>
            <LazyLoadImage
              src={gachamachine}
              alt="exec-game-machine"
              className="exec-game-machine-large"
            />
            <LazyLoadImage
              src={clawmachine}
              alt="claw-machine"
              className="exec-game-machine-small"
            />
          </button>
          <div className="exec-info-container">
            <h2>You got...</h2>
            {execIndex < execInfo.ocs.length ? (
              <>
                <h1>{execInfo.ocs[execIndex].name}</h1>
                <LazyLoadImage src={execInfo.ocs[execIndex].image} className="exec-img" />
                <p>{execInfo.ocs[execIndex].description}</p>
              </>
            ) : (
              <>
                <h1>{execInfo.vcs[execIndex - execInfo.ocs.length].name}</h1>
                <LazyLoadImage
                  src={execInfo.vcs[execIndex - execInfo.ocs.length].image}
                  className="exec-img"
                />
                <p>{execInfo.vcs[execIndex - execInfo.ocs.length].description}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <OCSection />
          <VCSection />
        </>
      )}
    </>
  );
};

export { PageAbout };
