import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';
import { ExecProfile } from '../About/ExecProfile/ExecProfile';
import { scuntJudges } from '../../util/scunt-judges';
import { PopupModal } from '../../components/popup/PopupModal';
import { Confetti } from '../../components/misc/Confetti/Confetti';

import './ScuntJudges.scss';

const ScuntJudges = () => {
  let clicks = 3; // only show tech team if this number of profiles have been clicked
  const [totalClicks, setTotalClicks] = useState(0);
  const [openPopup, setOpenPopup] = useState(true);
  const [showTechTeam, setShowTechTeam] = useState(false);

  useLayoutEffect(() => {
    // do this first!
    console.log('layout');
    const popupdata = window.localStorage.getItem('scunt-judges-popup');
    const showtechteamdata = window.localStorage.getItem('show-tech-team-secret-judge');
    if (popupdata !== null) {
      setOpenPopup(JSON.parse(popupdata));
      setShowTechTeam(JSON.parse(showtechteamdata));
    }
  }, []);

  useEffect(() => {
    console.log('use effect');
    const data = window.localStorage.getItem('Profile_Clicks_Scunt_Judges');
    if (data !== null) {
      setTotalClicks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Profile_Clicks_Scunt_Judges', JSON.stringify(totalClicks));
    window.localStorage.setItem('show-tech-team-secret-judge', JSON.stringify(showTechTeam));
  }, [totalClicks]);

  useEffect(() => {
    window.localStorage.setItem('scunt-judges-popup', JSON.stringify(openPopup));
  }, [openPopup]);

  useEffect(() => {
    if (totalClicks === clicks) {
      setShowTechTeam(true);
      window.scrollTo(0, 400);
    }
  }, [totalClicks]);

  useEffect(() => {
    setTimeout(() => {
      setShowTechTeam(false);
    }, 5000);
  }, [totalClicks]);

  return (
    <>
      <>
        {/* this popup will automatically disapear */}
        <Confetti animate={showTechTeam} />
        <PopupModal
          trigger={showTechTeam}
          setTrigger={setShowTechTeam}
          blurBackground={false}
          exitIcon={false}
        >
          <div className="scunt-judges-bribe-message-popup">
            Secret Judges have been revealed! 🤫
          </div>
        </PopupModal>
      </>{' '}
      :<></>
      {openPopup ? (
        <PopupModal trigger={openPopup} setTrigger={setOpenPopup} blurBackground={false}>
          <div className="scunt-judges-bribe-message-popup">
            Click the judges to reveal bribes! 😏
          </div>
        </PopupModal>
      ) : (
        <></>
      )}
      <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}>
        <ScuntLinks />
      </Header>
      <div className="scunt-judges-container">
        {scuntJudges.map((judge) => {
          const [clickProfile, setClickProfile] = useState(false);
          const [numClicks, setNumClicks] = useState(0);

          useEffect(() => {
            const data = window.localStorage.getItem('Profile-Clicks-Scunt-Judges-' + judge.name);
            if (data !== null) {
              setNumClicks(JSON.parse(data));
            }
          }, []);

          useEffect(() => {
            window.localStorage.setItem(
              'Profile-Clicks-Scunt-Judges-' + judge.name,
              JSON.stringify(numClicks),
            );
            if (numClicks === 1 && clickProfile) {
              setTotalClicks(totalClicks + 1);
            }
          }, [numClicks]);
          if (judge.name === 'Tech Team') {
            if (totalClicks >= clicks) {
              return (
                <div key={judge.name}>
                  <ExecProfile
                    image={judge.img}
                    name={judge.name}
                    scuntJudge={true}
                    bribes={judge.content}
                    description={judge.description}
                  />
                </div>
              );
            } else {
              return <div key={judge.name} style={{ display: 'none' }}></div>;
            }
          } else {
            return (
              <div
                key={judge.name}
                onClick={() => {
                  setClickProfile(!clickProfile);
                  setNumClicks(numClicks + 1);
                }}
              >
                <ExecProfile
                  image={judge.img}
                  name={judge.name}
                  scuntJudge={true}
                  bribes={judge.content}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export { ScuntJudges };
