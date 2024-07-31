import React, { useState, useEffect, useContext } from 'react';
import './ScuntHome.scss';
import Wave from '../../assets/misc/wave.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import waveBottom from '../../assets/misc/wave-reverse.png';
import waveBottomDarkMode from '../../assets/darkmode/misc/wave-reverse.png';
import { Confetti } from '../../components/misc/Confetti/Confetti';
import { Link } from 'react-router-dom';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { DarkModeContext } from '../../util/DarkModeProvider';
// import DiscordIcon from '../../assets/social/discord-brands.svg';
import { aboutScunt, okayToInviteToScunt, scuntDiscord } from '../../util/scunt-constants';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import useAxios from '../../hooks/useAxios';
// import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import { getScuntTeams } from '../../state/scuntTeams/saga';
// import { ProfilePageScuntTeam } from '../Profile/PageProfileFrosh';
const { axios } = useAxios();
import scuntLogo from '../../assets/scuntlogo/scunt_color_2t4.svg';
import arrowLogo from '../../assets/misc/left-arrow-svgrepo-com.svg';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';

export const PageScuntHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
    dispatch(getScuntTeams());
  }, [dispatch]);

  return (
    <>
      <BackToProfileButton />
      <ScuntCountdown />
      <ScuntLinks />
      <AboutScunt />
    </>
  );
};

const BackToProfileButton = () => {
  return (
    <Link to="/profile" className="back-button">
      <div className="circle"></div>
      <img src={arrowLogo} alt="Back" className="back-icon" />
    </Link>
  );
};

const AboutScunt = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <br />
      <br />
      <img src={darkMode ? WaveDarkMode : Wave} className="wave-image wave-image-footer" />

      <div className="about-scunt-container">
        <div className="about-scunt-content">
          {/* <div className="about-scunt-token">
            <ProfilePageScuntTeam />
          </div> */}

          <img src={scuntLogo} style={{ width: '300px', margin: '20px' }} />
          <div className="text-content">
            <h2>THE HUNT</h2>
            Come participate in the most iconic event that is part of Frosh Week: Skule™ Hunt!
            <br />
            <br />
            Skule™ Hunt takes place the night of <b>Wednesday August 28th from 6PM to 11PM</b>. It
            is completely free, so hurry and sign up by clicking YES on your registration!
            <br />
            <br />
          </div>
        </div>
      </div>
      <img
        className="header-page-wave-bottom"
        src={darkMode ? waveBottomDarkMode : waveBottom}
        alt="wave"
      />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SkuleHuntFAQ />
      </div>

      <div style={{ height: '30px' }} />
    </>
  );
};

const ScuntCountdown = () => {
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [targetDate, setTargetDate] = useState();
  const [countDownDate, setCountDownDate] = useState();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    if (scuntSettings !== undefined) {
      let settings = scuntSettings;
      //const tempDate = new Date(settings?.scuntDate);
      const tempDate = new Date('2024-08-28T18:00:00'); // Hardcoded date??
      const tempCountDownDate = new Date(tempDate).getTime();

      setTargetDate(tempDate);
      setCountDownDate(tempCountDownDate);
    }
  }, [scuntSettings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const getDateValues = (countDown) => {
    if (countDown <= 0) {
      return [0, 0, 0, 0];
    }
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  const checkNaN = (value) => {
    if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  };

  return (
    <div className="scunt-countdown-wrap">
      <div className="scunt-countdown">
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[0])}</h1>
          <h3>DAYS</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[1])}</h1>
          <h3>HOURS</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[2])}</h1>
          <h3>MINUTES</h3>
        </div>
        <div className="scunt-countdown-number">
          <h1>{checkNaN(getDateValues(countDown)[3])}</h1>
          <h3>SECONDS</h3>
        </div>
      </div>
      {/* Only show confetti for the first 100 seconds overtime */}
      {countDown <= 0 && countDown / 1000 >= -100 ? <Confetti animate={true} /> : <></>}
    </div>
  );
};

const scuntFAQs = [
  {
    title: 'What is Skule™ Hunt?',
    description: [
      "Skule™ Hunt is a long-standing traditional event that is part of Skule's annual Frosh Week.",
      'Frosh are placed in teams and participate in a city-wide scavenger hunt where the tasks are designed to help them learn about Skule™ history and traditions, all while exploring the city of Toronto.',
      "We safely encourage you to step out of your comfort zone for an unforgettable and fun night! It's the last event of Frosh Week for a reason, gotta go big before you go home right?",
      ' ',
      'Trust us, this is going to be the craziest scavenger hunt of your life so you do NOT want to miss signing up!',
    ],
  },
  {
    title: 'Am I expected to stay for the entire event?',
    description: [
      'Absolutely not! You can stay for as long as you feel like, and we have leedurs to help you get home safely if you need them.',
    ],
  },
  {
    title: 'How much does Skule™ Hunt cost?',
    description: ['NOTHING. We’re talking about 0 (zero) dollars here. '],
  },
];

const SkuleHuntFAQ = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'var(--white)',
          width: '70%',
          alignSelf: 'center',
        }}
      >
        {scuntFAQs.map((item, index) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <React.Fragment key={item.title}>
              <SingleAccordion
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                header={<div className={'faq-search-result-question-accordion'}>{item.title}</div>}
                style={{
                  backgroundColor: 'var(--faq-answer-containers)',
                  margin: '10px',
                  padding: '0px 30px',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {Array.isArray(item.description) ? (
                  <>
                    <ul className="frosh-retreat-faq-bullet">
                      {item.description.map((listItem, index) => {
                        return <li key={listItem}>{listItem}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: 0 }}>{item.description}</p>
                  </>
                )}
              </SingleAccordion>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

// const ScuntDiscord = () => {
//   const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
//   const [showDiscordLink, setShowDiscordLink] = useState(false);
//   const [discordLink, setDiscordLink] = useState('');
//   const [revealTeams, setRevealTeams] = useState(false);

//   const { user } = useSelector(userSelector);
//   const leader = user?.userType === 'leadur';

//   useEffect(() => {
//     if (scuntSettings !== undefined) {
//       let settings = scuntSettings[0];

//       setRevealTeams(settings?.revealTeams);
//       setShowDiscordLink(settings?.showDiscordLink);
//       setDiscordLink(settings?.discordLink);
//     }
//   }, [scuntSettings]);

//   if (showDiscordLink !== true && revealTeams !== true && !leader) {
//     // catch the undef states of the selector using !== true
//     return null;
//   } else {
//     const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: '-20px',
//           overflowWrap: 'anywhere',
//         }}
//       >
//         <a href={discordLink} className="no-link-style" target={'_blank'} rel="noreferrer">
//           <div
//             className="frosh-instagram-container"
//             style={{ padding: '15px 20px', margin: '10px 9px' }}
//           >
//             <img
//               src={DiscordIcon}
//               alt="Discord"
//               style={{ filter: darkMode ? 'unset' : 'invert(1)' }}
//             />
//             <div>
//               {!leader && user?.attendingScunt === true ? (
//                 <h2 style={{ fontSize: '15px' }}>You are in team {user.scuntTeam}!</h2>
//               ) : (
//                 <></>
//               )}
//               <p>Join the discord to chat with your team!</p>
//               <p>{discordLink}</p>
//             </div>
//           </div>
//         </a>
//       </div>
//     );
//   }
// };
