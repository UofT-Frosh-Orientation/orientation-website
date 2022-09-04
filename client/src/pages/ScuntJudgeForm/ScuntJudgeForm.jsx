import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import './ScuntJudgeForm.scss';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { list } from './scuntTempData';
import ReactSlider from 'react-slider';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Button } from '../../components/button/Button/Button';
import { QRScannerDisplay } from '../../components/QRScannerDisplay/QRScannerDisplay';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import { submitBribePoints } from './functions';
import star from '../../assets/misc/star-solid.svg';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export const PageScuntJudgeForm = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { missions } = useSelector(scuntMissionsSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  console.log(missions);
  const [teams, setTeams] = useState(['Select Team']);

  const getScuntTeams = async () => {
    try {
      const response = await axios.get('/scunt-teams');
      const { teamPoints } = response.data;
      if (teamPoints.length <= 0 || !teamPoints) setTeams([]);
      else
        setTeams(
          teamPoints.map((team) => {
            return team?.name;
          }),
        );
    } catch (e) {
      setTeams(['Error loading teams']);
    }
  };

  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: false }));
    getScuntTeams();
  }, []);

  return (
    <>
      {/* <Header text={"Missions"}/> */}
      <div className="navbar-space-top" />
      <div className="scunt-judge-form-page">
        <div className="scunt-judge-form-container">
          <h1>Judge Dashboard</h1>
          <h3>
            Hello,{' '}
            {user?.preferredName === '' || !user?.preferredName
              ? user?.firstName
              : user?.preferredName}
          </h3>
          <ScuntMissionSelection teams={teams} missions={missions} />
          <div className="separator" />
          <ScuntBribePoints teams={teams} />
          <div className="separator" />
          <ScuntNegativePoints teams={teams} />
        </div>
      </div>
    </>
  );
};

const ScuntNegativePoints = ({ teams }) => {
  const maxRemovePoints = 1000;
  const [assignedPoints, setAssignedPoints] = useState(0);
  const [assignedTeam, setAssignedTeam] = useState('');
  const [clearPointsInput, setClearPointsInput] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '15px' }} />
      <h2>Remove Points</h2>
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '100%' }}>
            <Dropdown
              label={'Team'}
              initialSelectedIndex={0}
              values={teams}
              onSelect={(value) => {
                setAssignedTeam(value);
              }}
              isDisabled={false}
              localStorageKey={'scunt-team-choice'}
            />
          </div>
          <div>
            <TextInput
              label={'Points'}
              placeholder={assignedPoints}
              onChange={(value) => {
                if (isNaN(parseInt(value))) {
                  return;
                }
                if (value === '' || value === undefined) {
                  setAssignedPoints(0);
                } else if (parseInt(value) >= maxRemovePoints) {
                  setAssignedPoints(maxRemovePoints);
                } else {
                  setAssignedPoints(parseInt(value));
                }
              }}
              setClearText={setClearPointsInput}
              clearText={clearPointsInput}
            />
          </div>
        </div>
        <div style={{ height: '10px' }} />
        <ReactSlider
          value={assignedPoints}
          defaultValue={0}
          max={maxRemovePoints}
          min={0}
          className="horizontal-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onChange={(value) => {
            setAssignedPoints(value);
            setClearPointsInput(true);
          }}
        />
        <div style={{ height: '60px' }} />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Button
            label={'Remove Points'}
            onClick={async () => {
              setAssignedPoints(0);
              //Subtract points here
              const response = await axios.post('/scunt-teams/transaction/subtract', {
                teamName: assignedTeam,
                points: assignedPoints,
              });
              setSnackbar(response?.data?.message);
              setClearPointsInput(true);
            }}
          />
        </div>
        <h2 style={{ textAlign: 'center' }}>{assignedTeam}</h2>
        <h3 style={{ textAlign: 'center' }}>-{assignedPoints} Points</h3>
      </>
    </div>
  );
};

ScuntNegativePoints.propTypes = {
  teams: PropTypes.array,
};

const ScuntBribePoints = ({ teams }) => {
  const { user } = useSelector(userSelector);
  const [remainingBribePoints, setRemainingBribePoints] = useState(user?.scuntJudgeBribePoints);
  const [assignedPoints, setAssignedPoints] = useState(0);
  const [assignedTeam, setAssignedTeam] = useState('');
  const [clearPointsInput, setClearPointsInput] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext);
  const submitBribe = async (teamNumber, points) => {
    if (points <= 0 || points === undefined) {
      setSnackbar('You cannot give 0 points!', true);
    } else {
      const req = { teamNumber: teamNumber, points: points };
      const result = await submitBribePoints(req);
      if (result !== true) {
        setSnackbar('Error - You may not have enough bribe points', true);
      } else {
        setSnackbar(`Added ${assignedPoints} points to ${assignedTeam}`, false);
        setAssignedPoints(0);
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '15px' }} />
      <h2>Bribe Points</h2>
      <h4>Remaining bribe points: {remainingBribePoints}</h4>
      {remainingBribePoints === 0 ? (
        <div style={{ height: '15px' }}></div>
      ) : (
        <>
          <div style={{ height: '10px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '5px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '100%' }}>
              <Dropdown
                label={'Team'}
                initialSelectedIndex={0}
                values={teams}
                onSelect={(value) => {
                  setAssignedTeam(value);
                }}
                isDisabled={false}
                localStorageKey={'scunt-team-choice'}
              />
            </div>
            <div>
              <TextInput
                label={'Points'}
                placeholder={assignedPoints}
                onChange={(value) => {
                  if (isNaN(parseInt(value))) {
                    return;
                  }
                  if (value === '' || value === undefined) {
                    setAssignedPoints(0);
                  } else if (parseInt(value) >= remainingBribePoints) {
                    setAssignedPoints(remainingBribePoints);
                  } else {
                    setAssignedPoints(parseInt(value));
                  }
                }}
                setClearText={setClearPointsInput}
                clearText={clearPointsInput}
              />
            </div>
          </div>
          <div style={{ height: '10px' }} />
          <ReactSlider
            value={assignedPoints}
            defaultValue={0}
            max={remainingBribePoints > 500 ? 500 : remainingBribePoints}
            min={0}
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={(value) => {
              setAssignedPoints(value);
              setClearPointsInput(true);
            }}
          />
          <div style={{ height: '60px' }} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Button
              label={'Give Bribe Points'}
              onClick={() => {
                const str = assignedTeam;
                setClearPointsInput(true);
                const assignedTeamNumber =
                  str == 'Team 10'
                    ? parseInt(str.substring(str.length - 2))
                    : parseInt(str.substring(str.length - 1));
                submitBribe(assignedTeamNumber, assignedPoints);
                //Submit points here
              }}
            />
          </div>
          <h2 style={{ textAlign: 'center' }}>{assignedTeam}</h2>
          <h3 style={{ textAlign: 'center' }}>+{assignedPoints} Points</h3>
        </>
      )}
    </div>
  );
};

ScuntBribePoints.propTypes = {
  teams: PropTypes.array,
};

const ScuntMissionSelection = ({ missions, teams }) => {
  const { scuntSettings, loading } = useSelector(scuntSettingsSelector);
  const [maxAmountPointsPercent, setMaxAmountPointsPercent] = useState(0);
  const [minAmountPointsPercent, setMinAmountPointsPercent] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
  }, []);

  useEffect(() => {
    if (scuntSettings !== undefined) {
      if (Array.isArray(scuntSettings)) {
        setMinAmountPointsPercent(scuntSettings[0]?.minAmountPointsPercent);
        setMaxAmountPointsPercent(scuntSettings[0]?.maxAmountPointsPercent);
      }
    }
  }, [scuntSettings]);

  const [assignedMission, setAssignedMission] = useState(undefined);
  const [searchedMissions, setSearchedMissions] = useState([]);
  const [assignedPoints, setAssignedPoints] = useState(0);
  const [assignedTeam, setAssignedTeam] = useState('');
  const [clearText, setClearText] = useState(false);
  const [clearPointsInput, setClearPointsInput] = useState(false);
  const [hasQRScanned, setHasQRScanned] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const getMissionSearchName = (searchName) => {
    if (searchName === '') {
      setSearchedMissions([]);
      return;
    }
    const output = [];
    for (let mission of missions) {
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
        setAssignedMission(mission);
        setAssignedPoints(mission?.points);
        return;
      }
    }
    getMissionSearchName('');
  };

  return (
    <>
      <QRScannerDisplay
        setScannedData={(data) => {
          const missionID = data.split('|')[1];
          if (missionID === undefined) {
            setSnackbar('There was an error with the QR code', true);
            return;
          }
          for (let mission of missions) {
            if (mission?.number.toString() === missionID.toString()) {
              setAssignedPoints(mission?.points);
              setAssignedMission(undefined);
              setAssignedMission(mission);
            }
          }
          const team = data.split('|')[0];
          if (team === undefined) {
            setSnackbar('There was an error with the QR code', true);
            return;
          } else if (!teams.includes(team)) {
            setSnackbar('There was an error with the QR code', true);
            return;
          }
          setAssignedTeam(team);
          setHasQRScanned(true);
        }}
      />
      <h2>Mission Points</h2>
      <p className="text-input-title">{'Search for a mission'}</p>
      <div className="small-width-input">
        <TextInput
          clearText={clearText}
          setClearText={setClearText}
          placeholder={'#'}
          errorFeedback={''}
          onChange={(value) => {
            if (hasQRScanned === true) setHasQRScanned(false);
            setAssignedMission(undefined);
            getMissionSearchID(value);
          }}
          onEnterKey={(value) => {
            if (hasQRScanned === true) setHasQRScanned(false);
            setAssignedMission(searchedMissions[0]);
            setAssignedPoints(searchedMissions[0]?.points);
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
            if (hasQRScanned === true) setHasQRScanned(false);
            setAssignedMission(undefined);
            getMissionSearchName(value);
          }}
          onEnterKey={(value) => {
            if (hasQRScanned === true) setHasQRScanned(false);
            setAssignedMission(searchedMissions[0]);
            setAssignedPoints(searchedMissions[0]?.points);
          }}
        />
      </div>
      {assignedMission !== undefined ? (
        <div
          style={{ width: '100%', cursor: 'pointer', marginRight: '9px' }}
          onClick={() => {
            setAssignedMission(undefined);
            setSearchedMissions([]);
            setClearText(true);
          }}
        >
          <ScuntMissionEntry mission={assignedMission} selected />
        </div>
      ) : (
        searchedMissions.map((mission) => {
          return (
            <div
              key={mission?.number}
              style={{ width: '100%', cursor: 'pointer', marginRight: '9px' }}
              onClick={() => {
                setAssignedMission(mission);
                setAssignedPoints(mission?.points);
                window.scrollTo(0, 0);
              }}
            >
              <ScuntMissionEntry mission={mission} />
            </div>
          );
        })
      )}
      {assignedMission !== undefined ? (
        <div style={{ width: '100%', marginRight: '2px', marginTop: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '5px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {hasQRScanned === false ? (
              <div style={{ width: '100%' }}>
                <Dropdown
                  label={'Team'}
                  initialSelectedIndex={0}
                  values={teams}
                  onSelect={(value) => {
                    setAssignedTeam(value);
                  }}
                  isDisabled={false}
                  localStorageKey={'scunt-team-choice'}
                />
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <p style={{ marginBottom: '8px' }}>Team</p>
                <h2>{assignedTeam}</h2>
              </div>
            )}
            <div>
              <TextInput
                label={'Points'}
                placeholder={assignedPoints}
                onChange={(value) => {
                  console.log('VALUE', value);
                  if (isNaN(parseInt(value))) {
                    return;
                  }
                  const maxPoints =
                    parseInt(assignedMission?.points) +
                    parseInt(assignedMission?.points * maxAmountPointsPercent);
                  const minPoints =
                    parseInt(assignedMission?.points) -
                    parseInt(assignedMission?.points * minAmountPointsPercent);
                  if (value === '' || value === undefined) {
                    setAssignedPoints(assignedMission?.points);
                  } else if (parseInt(value) >= maxPoints) {
                    setAssignedPoints(maxPoints);
                  } else if (parseInt(value) <= minPoints) {
                    setAssignedPoints(minPoints);
                  } else {
                    setAssignedPoints(parseInt(value));
                  }
                }}
                setClearText={setClearPointsInput}
                clearText={clearPointsInput}
              />
            </div>
          </div>

          <div style={{ height: '15px' }} />
          <p style={{ textAlign: 'center' }}>
            <b>This mission has already been completed by this team.</b>
          </p>
          <div style={{ height: '15px' }} />
          <ReactSlider
            value={assignedPoints}
            defaultValue={parseInt(assignedMission?.points)}
            max={
              parseInt(assignedMission?.points) +
              parseInt(assignedMission?.points * maxAmountPointsPercent)
            }
            min={
              parseInt(assignedMission?.points) -
              parseInt(assignedMission?.points * minAmountPointsPercent)
            }
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={(value) => {
              setAssignedPoints(value);
              setClearPointsInput(true);
            }}
          />
          <div
            style={{
              width: '100%',
              marginTop: '60px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Button
              label={'Submit'}
              onClick={async () => {
                const response = await axios.post('/scunt-teams/transaction/add', {
                  teamName: assignedTeam,
                  missionNumber: assignedMission?.number,
                  points: assignedPoints,
                });
                window.scrollTo(0, 0);
                setSnackbar(response?.data?.message);
                setAssignedPoints(0);
                setClearText(true);
                setAssignedMission(undefined);
                setSearchedMissions([]);
                setHasQRScanned(false);
              }}
            />
          </div>
          <h2 style={{ textAlign: 'center' }}>{assignedTeam}</h2>
          <h3 style={{ textAlign: 'center' }}>
            Mission {assignedMission?.number} - {assignedPoints} Points
          </h3>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

ScuntMissionSelection.propTypes = {
  missions: PropTypes.array,
  teams: PropTypes.array,
};

export const ScuntMissionEntry = ({ mission, selected }) => {
  return (
    <div className={`scunt-mission-entry ${selected ? 'scunt-mission-entry-selected' : ''}`}>
      <h3 className="mission-id">{mission?.number}</h3>
      {mission?.isJudgingStation ? (
        <img
          src={star}
          alt="judging station indication"
          className="scunt-mission-entry-judging-star"
        />
      ) : (
        <></>
      )}
      <p className="mission-name">{mission?.name}</p>

      <h3 className="mission-points">{mission?.points}</h3>
    </div>
  );
};

ScuntMissionEntry.propTypes = {
  mission: PropTypes.object,
  selected: PropTypes.bool,
};
