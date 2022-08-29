import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ScuntMissionsList.scss';
import { Header } from '../../components/text/Header/Header';
import { list } from '../ScuntJudgeForm/scuntTempData';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ScuntMissionEntry } from '../ScuntJudgeForm/ScuntJudgeForm';
import { QRNormal } from 'react-qrbtf';
import { Link } from 'react-router-dom';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';

function getMissionCategories() {
  const missions = list;
  let currentCategory = '';
  let output = ['All Categories'];
  for (let mission of missions) {
    if (mission?.category !== currentCategory) {
      output.push(mission.category);
    }
    currentCategory = mission?.category;
  }
  return output;
}

const PageScuntMissionsList = () => {
  return (
    <>
      <Header text={'Missions'} underlineDesktop={'300px'} underlineMobile={'210px'}>
        <ScuntLinks />
      </Header>
      <ScuntMissionsListContent />
    </>
  );
};

const ScuntMissionsListContent = () => {
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [revealMissions, setRevealMissions] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   // updating the selector
  //   dispatch(getScuntSettings());
  // }, [loading]);

  // useEffect(() => {
  //   if (scuntSettings !== undefined) {
  //     if (Array.isArray(scuntSettings)) {
  //       // checks above are to access game settings since selector is initialy undef
  //       setRevealMissions(scuntSettings[0]?.revealMissions);
  //     }
  //   }
  // }, [scuntSettings]);

  if (revealMissions !== true && !leader) {
    return (
      <h1 style={{ color: 'var(--text-dynamic)', textAlign: 'center', margin: '35px' }}>
        Check back once Scunt has begun!
      </h1>
    );
  } else {
    return <PageScuntMissionsListShow />;
  }
};

const PageScuntMissionsListShow = () => {
  const missions = list;
  const [mission, setMission] = useState(undefined);
  const [searchedMissions, setSearchedMissions] = useState(missions);
  const [clearText, setClearText] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('ID');

  useEffect(() => {
    setMission(undefined);
    getMissionSearchName('');
  }, [selectedCategory, selectedSort]);

  const getMissionSearchName = (searchName) => {
    const sortedMissions = [...missions];
    if (selectedSort !== 'ID') {
      sortedMissions.sort(function (a, b) {
        if (selectedSort === 'Greatest to Least Points') {
          if (parseInt(a?.points) < parseInt(b?.points)) return 1;
          if (parseInt(a?.points) > parseInt(b?.points)) return -1;
        } else if (selectedSort === 'Least to Greatest Points') {
          if (parseInt(a?.points) < parseInt(b?.points)) return -1;
          if (parseInt(a?.points) > parseInt(b?.points)) return 1;
        }

        return 0;
      });
    }
    if (searchName === '' && selectedCategory === 'All Categories') {
      setSearchedMissions(sortedMissions);
      return;
    }
    const output = [];
    for (let mission of sortedMissions) {
      if (selectedCategory !== 'All Categories') {
        if (mission?.category !== selectedCategory) {
          continue;
        }
      }
      if (mission?.name?.toLowerCase().includes(searchName.toLowerCase())) {
        output.push(mission);
      }
    }
    setSearchedMissions(output);
  };

  const getMissionSearchID = (searchNumber) => {
    for (let mission of missions) {
      if (mission?.number?.toString() === searchNumber.toString()) {
        setSearchedMissions([mission]);
        setMission(mission);
        return;
      }
    }
    getMissionSearchName('');
  };

  let previousCategory = '';
  return (
    <div>
      <div className="scunt-missions-header">
        <h2>Want another way to earn points?</h2>
        <div className="scunt-missions-header-link">
          <Link to={'/scunt-judges'}>Don&apos;t forget to bribe the judges!</Link>
        </div>
      </div>

      <div className="scunt-mission-list">
        <div style={{ zIndex: 10 }} className="scunt-mission-list-max-width">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div className="small-width-input">
              <TextInput
                clearText={clearText}
                setClearText={setClearText}
                placeholder={'#'}
                errorFeedback={''}
                onChange={(value) => {
                  setMission(undefined);
                  getMissionSearchID(value);
                }}
                onEnterKey={(value) => {
                  setMission(searchedMissions[0]);
                }}
              />
            </div>
            <div className="fill-remaining-width-input">
              <TextInput
                clearText={clearText}
                setClearText={setClearText}
                placeholder={'Search by name'}
                errorFeedback={''}
                onChange={(value) => {
                  setMission(undefined);
                  getMissionSearchName(value);
                }}
                onEnterKey={(value) => {
                  setMission(searchedMissions[0]);
                }}
              />
            </div>
            <div className="scunt-missions-filters">
              <Dropdown
                initialSelectedIndex={0}
                values={getMissionCategories()}
                onSelect={(value) => {
                  setSelectedCategory(value);
                }}
                isDisabled={false}
                localStorageKey={'scunt-selected-category-choice'}
                maxLetters={window.innerWidth <= 767 ? 13 : 40}
              />
              <Dropdown
                initialSelectedIndex={0}
                values={['ID', 'Greatest to Least Points', 'Least to Greatest Points']}
                onSelect={(value) => {
                  setSelectedSort(value);
                }}
                isDisabled={false}
                localStorageKey={'scunt-selected-sort-choice'}
                maxLetters={window.innerWidth <= 767 ? 5 : 40}
              />
            </div>
          </div>
          <div style={{ height: '15px' }} />
          {mission !== undefined ? (
            <div
              style={{ width: '100%', cursor: 'pointer', paddingRight: '9px' }}
              onClick={() => {
                setMission(undefined);
                setSearchedMissions(missions);
                setClearText(true);
              }}
            >
              <ScuntMissionEntry mission={mission} selected />
            </div>
          ) : (
            searchedMissions.map((mission) => {
              const missionEntry = (
                <div
                  key={mission?.number}
                  style={{ width: '100%', cursor: 'pointer', paddingRight: '9px' }}
                  onClick={() => {
                    setMission(mission);
                    window.scrollTo(0, 0);
                  }}
                >
                  <ScuntMissionEntry mission={mission} />
                </div>
              );
              if (previousCategory !== mission?.category) {
                previousCategory = mission?.category;
                return (
                  <div className="scunt-mission-category-separator">
                    <div className="separator" />
                    <h3>{mission?.category}</h3>
                    {missionEntry}
                  </div>
                );
              } else {
                previousCategory = mission?.category;
                return missionEntry;
              }
            })
          )}
          {searchedMissions.length <= 0 ? (
            <p>No search results</p>
          ) : mission === undefined ? (
            <div className="separator" />
          ) : (
            <></>
          )}
        </div>
      </div>
      {mission !== undefined ? (
        <div className="scunt-mission-qr-code">
          <QRNormal
            value={'Team 1' + '|' + mission?.number}
            styles={{ svg: { width: '120%', margin: '-10%', zIndex: 0 } }}
            type="round"
            opacity={100}
            posType="round"
            otherColor="#320846"
            posColor="#28093A"
            backgroundColor="white"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { PageScuntMissionsList };
