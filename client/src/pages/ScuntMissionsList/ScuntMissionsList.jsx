import React, { useState, useEffect, useRef, useContext } from 'react';
import './ScuntMissionsList.scss';
import { Header } from '../../components/text/Header/Header';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ScuntMissionEntry } from '../ScuntJudgeForm/ScuntJudgeForm';
import { QRNormal } from 'react-qrbtf';
import { Link } from 'react-router-dom';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, registeredSelector, userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();
import star from '../../assets/misc/star-solid.svg';

function getMissionCategories(missions) {
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
  const { user } = useSelector(userSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const leader = user?.userType === 'leadur';
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [revealMissions, setRevealMissions] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (scuntSettings !== undefined) {
      setRevealMissions(scuntSettings[0]?.revealMissions);
    }
  }, [scuntSettings]);

  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: false, setSnackbar }));
  }, []);

  if (revealMissions !== true && !leader) {
    return (
      <>
        <Header text={'Missions'} underlineDesktop={'300px'} underlineMobile={'210px'}>
          <ScuntLinks />
          <div className="scunt-check-soon-title">
            <h1 style={{ color: 'var(--text-light)' }}>Check back soon!</h1>
          </div>
        </Header>
      </>
    );
  }

  return (
    <>
      <Header text={'Missions'} underlineDesktop={'300px'} underlineMobile={'210px'}>
        <ScuntLinks />
      </Header>
      <PageScuntMissionsListShow />
    </>
  );
};

const PageScuntMissionsListShow = () => {
  const { user } = useSelector(userSelector);
  const { missions } = useSelector(scuntMissionsSelector);
  const [mission, setMission] = useState(undefined);
  const [searchedMissions, setSearchedMissions] = useState(missions);
  const [clearText, setClearText] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('ID');
  const [missionStatus, setMissionStatus] = useState(undefined);
  const loggedIn = useSelector(loggedInSelector);
  const [completedMissions, setCompletedMissions] = useState({});

  useEffect(() => {
    getAllTeamTransactions(user?.scuntTeam);
  }, [missions]); // inital run and whenever missions updated

  useEffect(() => {
    setMission(undefined);
    getMissionSearchName('');
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    setSearchedMissions(missions);
  }, [missions]);

  useEffect(() => {
    getMissionStatus(mission, user?.scuntTeam);
  }, [mission]);

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

  const getMissionStatus = async (missionPassed, teamNumber) => {
    const response = await axios.post('/scunt-teams/transaction/check', {
      teamNumber: teamNumber,
      missionNumber: missionPassed?.number,
    });
    setMissionStatus(response?.data?.missionStatus);
  };

  const getAllTeamTransactions = async (teamNumber) => {
    const response = await axios.post('/scunt-teams/transactions', {
      teamNumber: teamNumber,
    });
    const teamTransactions = response?.data?.transactions?.transactions || [];

    teamTransactions.forEach((transaction) => {
      const missionNum = transaction?.missionNumber;

      if (missionNum !== -1) {
        // -1 for bribes for deleted points
        completedMissions[missionNum] = transaction?.points;
      }
    });
  };

  let previousCategory = '';

  let missionStatusText = '';
  if (mission && missionStatus?.points < mission?.points) {
    missionStatusText = 'You have not gained full points for this mission.';
  } else if (mission && missionStatus?.points === mission?.points) {
    missionStatusText = 'You gained full points for this mission.';
  } else if (mission && missionStatus?.points > mission?.points) {
    missionStatusText = 'You earned more than full points for this mission!';
  }

  return (
    <div>
      <div className="scunt-missions-header">
        <h2>Want another way to earn points?</h2>
        <div className="scunt-missions-header-link">
          <Link to={'/scunt-judges'}>Don&apos;t forget to bribe the judges!</Link>
        </div>
        <div className="scunt-missions-judging-station-info">
          <img src={star} className="judging-station-info-star" alt="judging station indication" />
          <p>These indicate Judging Stations, photo/video evidence is not accepted!</p>
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
                values={getMissionCategories(missions)}
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
              <ScuntMissionEntry
                mission={mission}
                selected={true}
                completed={mission?.number in completedMissions}
                pointsAwarded={completedMissions[mission?.number]}
              />
            </div>
          ) : (
            searchedMissions.map((mission) => {
              const missionEntry = (
                <div
                  key={mission?.number}
                  style={{ width: '100%', cursor: 'pointer', paddingRight: '9px' }}
                  onClick={() => {
                    setMission(mission);
                  }}
                >
                  <ScuntMissionEntry
                    mission={mission}
                    completed={mission?.number in completedMissions}
                    pointsAwarded={completedMissions[mission?.number]}
                  />
                </div>
              );
              if (previousCategory !== mission?.category) {
                previousCategory = mission?.category;
                return (
                  <div key={mission?.number} className="scunt-mission-category-separator">
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
      {!loggedIn ? (
        <p>To see mission status and mission QR code please login to your account.</p>
      ) : (
        <></>
      )}
      {loggedIn && mission !== undefined ? (
        missionStatus?.completed ? (
          <>
            <div style={{ height: '15px' }} />
            <div style={{ textAlign: 'center' }}>
              <p className="scunt-mission-status">
                <b>{'This mission has already been completed by your team.'}</b>
              </p>
              <p className="scunt-mission-status">
                <b>{missionStatusText}</b>
              </p>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {loggedIn && user?.scuntTeam && mission !== undefined ? (
        <div className="scunt-mission-qr-code">
          <QRNormal
            value={user?.scuntTeam + '|' + mission?.number}
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
