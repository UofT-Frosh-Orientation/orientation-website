import React, { useState, useEffect, useRef, useContext } from 'react';
import './ScuntMissionsList.scss';
import { Header } from '../../components/text/Header/Header';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ScuntMissionEntry } from '../ScuntJudgeForm/ScuntJudgeForm';
import { QRNormal } from 'react-qrbtf';
import { Link } from 'react-router-dom';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { ScuntTitle } from '../../components/ScuntTitle/ScuntTitle.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, registeredSelector, userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();
import greenCheck from '../../assets/misc/check-solid-green.svg';
import { scuntTeamTransactionsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { getScuntTeamTransactions } from '../../state/scuntTeams/saga';
import { PopupModal } from '../../components/popup/PopupModal';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';

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
  const loggedIn = useSelector(loggedInSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const leader = user?.userType === 'leadur';
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [revealMissions, setRevealMissions] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (scuntSettings?.revealMissions) setRevealMissions(true);
  }, [scuntSettings]);

  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: false }));
  }, [dispatch]);

  if ((revealMissions !== true && !leader) || !loggedIn) {
    return (
      <>
        <div className="hidden-scunt-missions-container">
          <ScuntTitle />
          <ScuntLinks />
          <div className="scunt-check-soon-title">
            <h1
              style={{
                textAlign: 'center',
                color: 'var(--text-primary)',
                fontWeight: '900',
                padding: '25px 4% 0 4%',
              }}
            >
              Check back soon!
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="hidden-scunt-missions-container">
        <ScuntTitle />
        <ScuntLinks />
        <PageScuntMissionsListShow />
      </div>
      {/* <Header text={'Missions'} underlineDesktop={'300px'} underlineMobile={'210px'}>
        
      </Header> */}
    </>
  );
};

const ReportMission = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <PopupModal trigger={click} setTrigger={setClick} exitIcon={true} blurBackground={false}>
        <ReportMissionPopup></ReportMissionPopup>
      </PopupModal>
      <ButtonRound
        style={{ marginTop: '15px', marginBottom: '25px' }}
        class_options=""
        label={<div className="scunt-report-popup-button">Report Mission</div>}
        onClick={() => {
          setClick(true);
        }}
      ></ButtonRound>
    </>
  );
};

const ReportMissionPopup = () => {
  const initialFormData = {
    optionalName: '',
    reportReason: '',
    preferredAction: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const { setSnackbar } = useContext(SnackbarContext);
  const [clearText, setClearText] = useState(false);

  const handleInputChange = (text, field) => {
    let newFormData = { ...formData };
    newFormData[field] = text;
    setFormData(newFormData);
  };

  async function handleSubmit(text) {
    if (formData.reportReason?.length <= 0) {
      setSnackbar('Please provide a reason for reporting', true);
    } else if (formData.preferredAction?.length <= 0) {
      setSnackbar('Please provide a preferred action', true);
    } else {
      // using faq services
      const reqObj = {
        email: formData.name,
        question:
          'Report Reason: ' +
          formData.reportReason +
          ' | Preferred Action: ' +
          formData.preferredAction,
        category: 'Scunt Reports',
      };

      try {
        const result = await axios.post('/faq/create', reqObj);
        if (result.status !== 200) {
          setSnackbar('There was an error submitting your report' + result, true);
        } else {
          setSnackbar('Thank you for submitting your report!', false);
          setClearText(true);
        }
      } catch (error) {
        return error;
      }
    }
  }

  return (
    <div className="scunt-report-popup-container">
      <h1 style={{ fontWeight: '900' }}>Report Mission</h1>
      <p style={{ marginBottom: '10px', marginTop: '15px' }}>
        Your report will be shared with F!rosh Execs, we aim to review reports within 30 minutes.
      </p>

      <div className="scunt-report-input">
        <TextInput
          label={'Name (Optional)'}
          onChange={(text) => handleInputChange(text, 'optionalName')}
          inputType={'text'}
          clearText={clearText}
          setClearText={setClearText}
        />
        <TextInput
          label={'Reason for Reporting'}
          isRequiredInput={true}
          onChange={(text) => handleInputChange(text, 'reportReason')}
          inputType={'textArea'}
          clearText={clearText}
          setClearText={setClearText}
        />
        <TextInput
          label={'Preferred Action'}
          isRequiredInput={true}
          onChange={(text) => handleInputChange(text, 'preferredAction')}
          inputType={'textArea'}
          placeholder={'Remove the item'}
          clearText={clearText}
          setClearText={setClearText}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <ButtonRound label={'Submit'} onClick={handleSubmit} style={{ marginTop: '25px' }}>
          Submit
        </ButtonRound>
      </div>
    </div>
  );
};

const PageScuntMissionsListShow = () => {
  const { user } = useSelector(userSelector);
  const { missions } = useSelector(scuntMissionsSelector);
  const { scuntTeamTransactions } = useSelector(scuntTeamTransactionsSelector);
  const [mission, setMission] = useState(undefined);
  const [searchedMissions, setSearchedMissions] = useState(missions);
  const [clearText, setClearText] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('ID');
  const [missionStatus, setMissionStatus] = useState(undefined);
  const loggedIn = useSelector(loggedInSelector);
  const [completedMissions, setCompletedMissions] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntTeamTransactions({ teamNumber: user?.scuntTeam }));
  }, [dispatch]);

  useEffect(() => {
    if (scuntTeamTransactions?.length) {
      setCompletedMissions(
        scuntTeamTransactions.reduce((missions, transaction) => {
          if (transaction?.missionNumber > 0) {
            // -1 for bribes for deleted points
            missions[transaction?.missionNumber] = transaction?.points;
          }

          return missions;
        }, {}),
      );
    }
  }, [scuntTeamTransactions]);

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
          <Link to={'/skule-hunt-judges'}>
            Don&apos;t forget you can get bonus points from the judges!
          </Link>
        </div>
        <div className="scunt-missions-judging-station-info">
          {/* <img
            src={greenCheck}
            className="judging-station-info-star"
            alt="judging station indication"
          /> */}
          {/* <p>Click a mission to get a QR code judges can scan!</p> */}
        </div>
        <ReportMission></ReportMission>
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
          <p>
            Click a mission to get a QR code judges can scan! Missions with a check mark have
            already been completed by your team.
          </p>
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
          ) : null}
        </div>
      </div>
      {!loggedIn ? (
        <p>To see mission status and mission QR code please login to your account.</p>
      ) : null}
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
        ) : null
      ) : null}
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
      ) : null}
    </div>
  );
};

export { PageScuntMissionsList };
