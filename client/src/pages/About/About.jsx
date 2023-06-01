import { React, useState } from 'react';
import './About.scss';
import { getInformation } from './functions';

import { aboutUsInfo } from '../../util/about/aboutus';
import { execInfo } from '../../util/about/execs';
import { techTeam } from '../../util/about/techteam';
import { headLeedurs } from '../../util/about/headleedurs';
import { subComs } from '../../util/about/subcoms';

import { ExecProfile } from './ExecProfile/ExecProfile';
import ExecLogo from '../../assets/about/exec-tshirt-logo.svg';
import { useEffect } from 'react';
import { object } from 'prop-types';
import { Header } from '../../components/text/Header/Header';

import InstagramIcon from '../../assets/social/instagram-brands.svg';
import MailIcon from '../../assets/social/envelope-solid.svg';
import { instagramAccounts } from '../../util/instagramAccounts';

import { Button } from '../../components/button/Button/Button';

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection />
        <AboutUsTeamsTabWrapper />
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
    <Header text="About Us">
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
    </Header>
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
            favPart={info.favPart}
            exec={true}
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

const AboutUsTechTeam = () => {
  let count = 0;
  let members = techTeam.length;

  return (
    <>
      <div className="aboutus-techteam-grid-container" style={{ marginBottom: '0px' }}>
        {techTeam.first.map((info) => {
          return (
            <ExecProfile
              key={info.fullName}
              className="vc-grid-item"
              image={info.img}
              name={info.fullName}
              discipline={info.discipline}
              quote={info.quote}
              exec={false}
            />
          );
        })}
      </div>
    </>
  );
};

const AboutUsSubcom = () => {
  let subcomGroups = Object.keys(subComs);

  return (
    <>
      {/* <div className="check-back-message">
        <h2>Check back to see our photos and our roles in F!rosh Week!</h2>
      </div> */}
      {subcomGroups.map((com) => {
        return (
          <div key={com} className="aboutus-commitee-container">
            <h1 className="aboutus-subcom">{com}</h1>
            <div className="aboutus-subcom-grid-container">
              {subComs[com].map((subcom) => {
                //console.log(subcom.coChair);
                return (
                  <ExecProfile
                    key={subcom.subcom}
                    className="vc-grid-item"
                    name={subcom.subcom}
                    exec={false}
                    subcom={true}
                    roleDescription={subcom.description}
                    cochairs={subcom.coChair}
                    image={subcom.img}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const AboutUsHL = () => {
  return (
    <>
      <div className="aboutus-hl-grid-container">
        {headLeedurs.map((info) => {
          const [open, setOpen] = useState(true); // open is set to hl with greek letter page
          const [clickLink, setClickLink] = useState(false); // icon links have not been clicked
          const [hover, setHover] = useState(false);

          useEffect(() => {
            console.log(clickLink);
            if (clickLink) {
              setOpen(false);
            }
            setClickLink(false);
          }, [clickLink]);

          return (
            <div
              onMouseOver={() => {
                setHover(true);
                if (hover === false)
                  setTimeout(() => {
                    setHover(false);
                  }, 1000);
              }}
              key={info.group}
              className="aboutus-hl-container"
              onClick={() => {
                console.log('clicklink', clickLink);
                if (!clickLink) {
                  setOpen(!open);
                } else {
                  setOpen(open);
                }
              }}
            >
              <div
                className={`${open ? 'aboutus-hl-container-show' : 'aboutus-hl-container-hide'}`}
              >
                <div className="aboutus-hl-frosh-group-container">
                  <h1
                    className={`aboutus-hl-frosh-group ${
                      hover ? 'aboutus-hl-frosh-group-spin' : ''
                    }`}
                  >
                    {info.letter}
                  </h1>
                  <h3 className="aboutus-hl-frosh-group-name">{info.group}</h3>
                </div>
                <p className="aboutus-leedur">{info.leedur1}</p>
                <p className="aboutus-leedur">{info.leedur2}</p>
              </div>

              <div
                style={{ position: 'absolute' }}
                className={`${open ? 'aboutus-hl-container-hide' : 'aboutus-hl-container-show'}`}
              >
                <p className="aboutus-leedur aboutus-leedur-contact-message">
                  Contact Your Head Leedurs!
                </p>
                <div className="aboutus-hl-contacts-container">
                  {instagramAccounts[info.group] ? (
                    <a
                      className="no-link-style"
                      href={instagramAccounts[info.group]}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        setClickLink(true);
                      }}
                    >
                      <img
                        className="aboutus-hl-contacts-icon"
                        src={InstagramIcon}
                        alt="instagram-icon"
                      ></img>
                    </a>
                  ) : (
                    <></>
                  )}
                  {/* <a
                    className="no-link-style"
                    href={`mailto:${info.email}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setClickLink(true);
                    }}
                  >
                    <img className="aboutus-hl-contacts-icon" src={MailIcon} alt="email-icon"></img>
                  </a> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const tabs = [
  {
    title: 'Exec Team',
    component: <AboutUsExecTeam />,
    active: true,
  },
  {
    title: 'Tech Team',
    component: <AboutUsTechTeam />,
    active: true,
  },
  {
    title: 'Subcoms',
    component: <AboutUsSubcom />,
    active: true,
  },
  {
    title: 'Head Leedurs',
    component: <AboutUsHL />,
    active: true,
  },
];

const AboutUsTeamsTab = () => {
  const [currentTab, setCurrentTab] = useState('Exec Team');

  let tabsCounter = 0;
  let numTabs = tabs.length;
  let tabComponent;

  if (tabs.every((value, index, array) => value.active))
    return (
      <>
        <div className="aboutus-teams-all-tabs">
          <div className="aboutus-teams-all-tabs-scroll">
            {tabs.map((tab) => {
              if (tab.active) {
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
                      {tabsCounter > 1 ? (
                        <div className="aboutus-short-vertical-line"></div>
                      ) : (
                        <></>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'start',
                        }}
                      >
                        <h1
                          className={
                            currentTab === tab.title
                              ? 'aboutus-teams-tabs-title-selected'
                              : 'aboutus-teams-tabs-title'
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
              } else {
                return;
              }
            })}
          </div>
        </div>

        <div className="aboutus-tabs-component">
          {tabs.map((tab) => {
            if (currentTab === tab.title && tab.active) {
              return tab.component;
            }
          })}
        </div>
      </>
    );
  else
    return (
      <>
        <h2 className="about-introduction-title">Stay tuned to meet the team!</h2>
      </>
    );
};

const AboutUsTeamsTabWrapper = () => {
  const [showAboutUs, setShowAboutUs] = useState(true);

  if (!showAboutUs) tabs.map((tab) => (tab.active = false));
  else tabs.map((tab) => (tab.active = true));

  return (
    <>
      <AboutUsTeamsTab />
    </>
  );
};

export { PageAbout };
