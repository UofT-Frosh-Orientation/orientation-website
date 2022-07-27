import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ScuntJudgeForm.scss';
import { Header } from '../../components/text/Header/Header';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { useSelector } from 'react-redux';
import { userSelector } from '../userSlice';
import { list } from './scuntTempData';
import ReactSlider from 'react-slider';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Button } from '../../components/button/Button/Button';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { QRScannerDisplay } from '../../components/QRScannerDisplay/QRScannerDisplay';

export const PageScuntJudgeForm = () => {
  const { user } = useSelector(userSelector);
  const [remainingBribePoints, setRemainingBribePoints] = useState(500);
  const teams = [
    'Team 1',
    'Team 2',
    'Team 3',
    'Team 4',
    'Team 5',
    'Team 6',
    'Team 7',
    'Team 8',
    'Team 9',
    'Team 10',
  ];
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
          <ScuntMissionSelection teams={teams} missions={list} />
          <div className="separator" />
          <ScuntBribePoints
            setRemainingBribePoints={setRemainingBribePoints}
            remainingBribePoints={remainingBribePoints}
            teams={teams}
          />
        </div>
      </div>
    </>
  );
};

const ScuntBribePoints = ({ teams, remainingBribePoints, setRemainingBribePoints }) => {
  const [assignedPoints, setAssignedPoints] = useState(0);
  const [assignedTeam, setAssignedTeam] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const timerRef = useRef(null);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '15px' }} />
      <h2>Bribe Points</h2>
      <h4>Remaining bribe points: {remainingBribePoints}</h4>
      {remainingBribePoints === 0 ? (
        <></>
      ) : (
        <>
          <div style={{ height: '10px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '5px',
            }}
          >
            <h2 style={{ fontSize: '18px', marginRight: '5px' }}>Team:</h2>
            <Dropdown
              initialSelectedIndex={0}
              values={teams}
              onSelect={(value) => {
                setAssignedTeam(value);
              }}
              isDisabled={false}
              localStorageKey={'scunt-team-choice'}
            />
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
              label={'Submit'}
              onClick={() => {
                clearTimeout(timerRef.current);
                setAssignedPoints(0);
                setErrorMessage('');
                setSuccessMessage('');
                //Submit points here
                setSuccessMessage(`Added ${assignedPoints} points to ${assignedTeam}`);
                setRemainingBribePoints(remainingBribePoints - assignedPoints);
                timerRef.current = setTimeout(() => {
                  setErrorMessage('');
                  setSuccessMessage('');
                }, 5000);
              }}
            />
          </div>
          <h2 style={{ textAlign: 'center' }}>{assignedTeam}</h2>
          <h3 style={{ textAlign: 'center' }}>{assignedPoints} Points</h3>
          <div style={{ width: '100%' }}>
            <ErrorSuccessBox content={errorMessage} error={true} />
            <ErrorSuccessBox content={successMessage} success={true} />
          </div>
        </>
      )}
    </div>
  );
};

ScuntBribePoints.propTypes = {
  teams: PropTypes.array,
  remainingBribePoints: PropTypes.number,
  setRemainingBribePoints: PropTypes.func,
};

const ScuntMissionSelection = ({ missions, teams }) => {
  const extraPointsFactor = 0.3;
  const minPointsFactor = 0.3;
  const [assignedMission, setAssignedMission] = useState(undefined);
  const [searchedMissions, setSearchedMissions] = useState([]);
  const [assignedPoints, setAssignedPoints] = useState(0);
  const [assignedTeam, setAssignedTeam] = useState('');
  const [clearText, setClearText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hasQRScanned, setHasQRScanned] = useState(false);
  const timerRef = useRef(null);

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
          for (let mission of missions) {
            if (mission?.number.toString() === missionID.toString()) {
              setAssignedMission(undefined);
              setAssignedMission(mission);
            }
          }
          const team = data.split('|')[0];
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
          {hasQRScanned === false ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5px',
              }}
            >
              <h2 style={{ fontSize: '18px', marginRight: '5px' }}>Team:</h2>
              <Dropdown
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
            <>
              <h2>{assignedTeam}</h2>
            </>
          )}
          <div style={{ height: '15px' }} />
          <p>
            <b>This mission has already been completed by this team.</b>
          </p>
          <div style={{ height: '15px' }} />
          <ReactSlider
            defaultValue={parseInt(assignedMission?.points)}
            max={
              parseInt(assignedMission?.points) +
              parseInt(assignedMission?.points * extraPointsFactor)
            }
            min={
              parseInt(assignedMission?.points) -
              parseInt(assignedMission?.points * minPointsFactor)
            }
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={(value) => {
              setAssignedPoints(value);
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
              onClick={() => {
                clearTimeout(timerRef.current);
                setAssignedPoints(0);
                setErrorMessage('');
                setSuccessMessage('');
                setClearText(true);
                setAssignedMission(undefined);
                setSearchedMissions([]);
                setHasQRScanned(false);
                window.scrollTo(0, 0);
                //Submit points here
                setSuccessMessage(`Added ${assignedPoints} points to ${assignedTeam}`);
                timerRef.current = setTimeout(() => {
                  setErrorMessage('');
                  setSuccessMessage('');
                }, 5000);
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
      <div style={{ width: '100%' }}>
        <ErrorSuccessBox content={errorMessage} error={true} />
        <ErrorSuccessBox content={successMessage} success={true} />
      </div>
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
      <p className="mission-name">{mission?.name}</p>
      <h3 className="mission-points">{mission?.points}</h3>
    </div>
  );
};

ScuntMissionEntry.propTypes = {
  mission: PropTypes.object,
  selected: PropTypes.bool,
};
