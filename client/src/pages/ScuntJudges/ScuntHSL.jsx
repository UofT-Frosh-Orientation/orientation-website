import React, { useEffect, useState } from 'react';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';
// Replacing ExecProfile overlay interaction with custom modal presentation for judges
import { scuntJudges, people } from '../../util/scunt-hsl';
import { PopupModal } from '../../components/popup/PopupModal';
import PropTypes from 'prop-types';
import { ScuntTitle } from '../../components/ScuntTitle/ScuntTitle.jsx';

import './ScuntJudges.scss';

import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';

const ScuntHSL = () => {
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector); // returns array
  const [revealJudgesAndBribes, setRevealJudgesAndBribes] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
  }, [dispatch]);

  useEffect(() => {
    if (scuntSettings !== undefined) {
      setRevealJudgesAndBribes(scuntSettings?.revealJudgesAndBribes);
    }
  }, [scuntSettings]);

  if (revealJudgesAndBribes !== true && !leader) {
    return (
      <div className="hidden-scunt-judges-container">
        <ScuntTitle />
        <ScuntLinks />
        <div className="scunt-check-soon-title">
          <h1 style={{ fontFamily: 'Gliker' }}>Check back soon!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScuntTitle />
      {/* <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}> */}
      {/* <div className='scunt-judges-container'> */}
      {/* <ScuntTitle /> */}
      <ScuntLinks />
      <ScuntJudgesShowWrapper />
      {/* </div> */}
      {/* </Header> */}
    </>
  );
};

// Fisher-Yates shuffle all judges
function shuffleJudges(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ScuntJudgesShowWrapper = () => {
  // Enrich base judge list with description & bribes from people[] by loose name match (startsWith)
  const enriched = scuntJudges.map((j) => {
    const detail = people.find(
      (p) =>
        p.name.toLowerCase() === j.name.toLowerCase() ||
        p.name.toLowerCase().startsWith(j.name.toLowerCase() + ' '),
    );
    if (detail) {
      return { ...j, description: detail.description, content: detail.content };
    }
    return j;
  });
  return <ScuntJudgesShow judges={enriched} />;
};

const ScuntJudgesShow = ({ judges }) => {
  // simplified: no more secret unlock logic
  const [openPopup, setOpenPopup] = useState(true);
  const [selectedJudge, setSelectedJudge] = useState(null); // modal content

  useEffect(() => {
    const popupdata = window.localStorage.getItem('scunt-judges-popup');
    if (popupdata !== null) setOpenPopup(JSON.parse(popupdata));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('scunt-judges-popup', JSON.stringify(openPopup));
  }, [openPopup]);

  // Persist popup dismissal only

  // no-op effects previously for secret judge removed

  return (
    <>
      {/* <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}>
        <ScuntLinks />
      </Header> */}
      <h2 className="legend-text"> Head Skule (Hunt) Leaders </h2>
      <div className="scunt-judges-container">
        {judges.map((judge) => (
          <JudgeCard key={judge.name} judge={judge} onOpen={() => setSelectedJudge(judge)} />
        ))}
      </div>
      <PopupModal
        trigger={!!selectedJudge}
        setTrigger={(val) => {
          if (!val) setSelectedJudge(null);
        }}
        blurBackground={true}
        heading={selectedJudge ? selectedJudge.name : undefined}
      >
        {selectedJudge && <JudgeModal judge={selectedJudge} />}
      </PopupModal>
    </>
  );
};

ScuntJudgesShow.propTypes = {
  judges: PropTypes.arrayOf(PropTypes.object),
};

// Child component for each judge to keep hooks stable & add 16-bit style wrappers
const JudgeCard = ({ judge, onOpen }) => {
  const isCoChair = judge.coChair === true || ['Maria', 'Novera'].includes(judge.name);
  const isTechTeam = judge.name === 'Tech Team';
  return (
    <div
      className={`judge-card ${isCoChair ? 'cochair-card' : ''} ${
        isTechTeam ? 'tech-team-card' : ''
      }`}
      onClick={onOpen}
    >
      <div className="judge-card-frame">
        <img
          src={judge.img}
          alt={judge.name + ' photo'}
          className="judge-photo"
          data-name={judge.name}
        />
        <div className="judge-name-bar">
          <span>{judge.name}</span>
        </div>
        {isCoChair && <span className="cochair-badge">CO-CHAIR</span>}
      </div>
    </div>
  );
};
JudgeCard.propTypes = { judge: PropTypes.object, onOpen: PropTypes.func };

// Modal content for a judge
const JudgeModal = ({ judge }) => {
  return (
    <div className="judge-modal-content">
      {judge.description && <p className="judge-modal-bio">{judge.description}</p>}
      {/* {Array.isArray(judge.content) && judge.content.length > 0 && (
        <div className="judge-modal-bribes">
          <h3>Bribes</h3>
          <ul className="judge-modal-bribe-list">
            {judge.content.map((b) => (
              <p key={b} className="judge-modal-bribe-item">{b}</p>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
JudgeModal.propTypes = { judge: PropTypes.object };

export { ScuntHSL };
