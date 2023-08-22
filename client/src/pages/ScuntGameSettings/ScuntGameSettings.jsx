import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import './ScuntGameSettings.scss';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

import { useDispatch, useSelector } from 'react-redux';
import { getScuntSettings, setScuntSettings } from '../../state/scuntSettings/saga';
import { shuffleScuntTeams, setScuntTeams, getScuntTeams } from '../../state/scuntTeams/saga';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

import useAxios from '../../hooks/useAxios';
import { PopupModal } from '../../components/popup/PopupModal';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
const { axios } = useAxios();

const scuntSettingsInfo = [
  {
    parameter: 'Amount of Teams',
    key: 'amountOfTeams', // key in the model
    placeholder: 10,
  },
  {
    parameter: 'Amount of Starter Bribe Points',
    key: 'amountOfStarterBribePoints',
    description: 'Set all judges bribe points to this number when the game starts',
    placeholder: 2500,
  },
  {
    parameter: 'Max Amount of Points',
    key: 'maxAmountPointsPercent',
    description:
      'The max amount of points allowed to be given out over the recommended amount for missions',
    placeholder: 0.3,
  },
  {
    parameter: 'Min Amount of Points',
    key: 'minAmountPointsPercent',
    description:
      'The min amount of points allowed to be given out over the recommended amount for missions',
    placeholder: 0.3,
  },
];

const scuntsettingbool = [
  {
    parameter: 'Reveal Judges and Bribes',
    key: 'revealJudgesAndBribes',
  },
  {
    parameter: 'Reveal Teams',
    key: 'revealTeams',
  },
  {
    parameter: 'Show Discord Link',
    key: 'showDiscordLink',
  },
  {
    parameter: 'Reveal Leaderboard',
    key: 'revealLeaderboard',
  },
  {
    parameter: 'Reveal Missions',
    key: 'revealMissions',
  },
  {
    parameter: 'Allow Judging',
    key: 'allowJudging',
  },
];

const ScuntGameSettings = () => {
  const dispatch = useDispatch();
  const { scuntSettings } = useSelector(scuntSettingsSelector);

  const [newSettings, setNewSettings] = useState({});
  const { setSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (scuntSettings !== undefined) {
      setNewSettings(scuntSettings);
    }
  }, [scuntSettings]);

  const initialSettings = {
    name: 'Scunt2T3 Settings',
    amountOfTeams: 10,
    amountOfStarterBribePoints: 2500,
    maxAmountPointsPercent: 0.3,
    minAmountPointsPercent: 0.3,
    revealJudgesAndBribes: true,
    revealTeams: true,
    showDiscordLink: true,
    revealLeaderboard: true,
    revealMissions: true,
    allowJudging: true,
  };

  return (
    <div className="scunt-game-settings-page">
      <CurrentScuntGameSettings />

      <div className="scunt-game-settings-container">
        <div style={{ marginBottom: '10px' }}>
          {scuntSettingsInfo.map((setting) => {
            return (
              <div key={setting.parameter}>
                <ScuntGameSettingsTextbox
                  objKey={setting.key}
                  parameter={setting.parameter}
                  description={setting.description}
                  placeholder={
                    scuntSettings && scuntSettings[setting.key]
                      ? scuntSettings[setting.key]
                      : 'Not set yet - e.g. value: ' + setting.placeholder.toString()
                  }
                  newSettings={newSettings}
                  setNewSettings={setNewSettings}
                  // initialValue={i.default}
                />
              </div>
            );
          })}
        </div>
        <ShuffleTeamsButton />

        <div className="separator" />
        <br />

        <RefillJudgeBribePoints />

        <div className="separator" />
        <br />

        <RenameTeams />

        <div className="separator" />
        <br />

        <div style={{ marginBottom: '30px' }}>
          {scuntsettingbool.map((i) => {
            let selectedCheck = [];

            if (newSettings && newSettings[i.key] === true) {
              selectedCheck = [0];
            }

            return (
              <div key={i.parameter}>
                <Checkboxes
                  values={[i.parameter]}
                  initialSelectedIndices={selectedCheck}
                  onSelected={(value, index, state, selectedIndices) => {
                    let tempSettings = { ...newSettings }; // create a copy
                    tempSettings[i.key] = state;
                    setNewSettings(tempSettings);
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            label="Update Settings"
            onClick={async () => {
              let name = 'Scunt 2T3 Settings';
              let amountOfTeams = newSettings.amountOfTeams;
              let amountOfStarterBribePoints = newSettings.amountOfStarterBribePoints;
              let maxAmountPointsPercent = newSettings.maxAmountPointsPercent;
              let minAmountPointsPercent = newSettings.minAmountPointsPercent;
              let revealJudgesAndBribes = newSettings.revealJudgesAndBribes;
              let revealTeams = newSettings.revealTeams;
              let showDiscordLink = newSettings.showDiscordLink;
              let discordLink = newSettings.discordLink;
              let revealLeaderboard = newSettings.revealLeaderboard;
              let revealMissions = newSettings.revealMissions;
              let allowJudging = newSettings.allowJudging;

              dispatch(
                setScuntSettings({
                  setSnackbar,
                  name,
                  amountOfTeams,
                  amountOfStarterBribePoints,
                  maxAmountPointsPercent,
                  minAmountPointsPercent,
                  revealJudgesAndBribes,
                  revealTeams,
                  showDiscordLink,
                  discordLink,
                  revealLeaderboard,
                  revealMissions,
                  allowJudging,
                }),
              );
            }}
          ></Button>

          <Button
            label="Set Recommended Settings"
            isSecondary={true}
            onClick={async () => {
              // setting recommended settings

              let name = 'Scunt 2T3 Settings';
              let amountOfTeams = initialSettings.amountOfTeams;
              let amountOfStarterBribePoints = initialSettings.amountOfStarterBribePoints;
              let maxAmountPointsPercent = initialSettings.maxAmountPointsPercent;
              let minAmountPointsPercent = initialSettings.minAmountPointsPercent;
              let revealJudgesAndBribes = true;
              let revealTeams = true;
              let showDiscordLink = true;
              let revealLeaderboard = true;
              let revealMissions = true;
              let allowJudging = true;

              dispatch(
                setScuntSettings({
                  setSnackbar,
                  name,
                  amountOfTeams,
                  amountOfStarterBribePoints,
                  maxAmountPointsPercent,
                  minAmountPointsPercent,
                  revealJudgesAndBribes,
                  revealTeams,
                  showDiscordLink,
                  revealLeaderboard,
                  revealMissions,
                  allowJudging,
                }),
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ShuffleTeamsButton = () => {
  const dispatch = useDispatch();
  const { setSnackbar } = useContext(SnackbarContext);
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <PopupModal
        trigger={showPopUp}
        setTrigger={setShowPopUp}
        blurBackground={false}
        exitIcon={true}
      >
        <div className="registration-edit-popup">
          <h1>Are you sure?</h1>
          <h2>All users will have different teams.</h2>
          <h2>Team information and points history will be reset.</h2>
          <div className="registration-edit-popup-buttons">
            <Button label="Cancel" isSecondary onClick={() => setShowPopUp(false)} />
            <Button
              label="Shuffle Teams"
              onClick={() => {
                dispatch(shuffleScuntTeams(setSnackbar));
                setShowPopUp(false);
              }}
            />
          </div>
        </div>
      </PopupModal>
      <Button
        label="Shuffle, Reset and Generate Teams"
        isSecondary={true}
        style={{ width: 'fit-content' }}
        onClick={() => {
          setShowPopUp(true);
        }}
      />
    </>
  );
};

const RefillJudgeBribePoints = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const [assignedBribeRefillPoints, setAssignedBribeRefillPoints] = useState(0);
  const [assignedJudge, setAssignedJudge] = useState('');
  const [clearPointsInput, setClearPointsInput] = useState(false);
  const [judges, setJudges] = useState([]);

  const getJudgeUsers = async () => {
    try {
      const response = await axios.get('/scunt-teams/judges');
      const { users } = response.data;
      if (users.length <= 0 || !users) setJudges([]);
      else setJudges(users);
    } catch (e) {
      setJudges([]);
    }
  };
  const judgeUsersGetter = async () => {
    getJudgeUsers();
  };

  useEffect(() => {
    judgeUsersGetter();
  }, []);

  return (
    <div style={{ margin: '0 5px' }}>
      <h2>Judge Status</h2>
      <div style={{ height: '8px' }} />
      {judges.map((judge) => {
        return (
          <p key={judge?._id}>
            <b>{judge?.firstName + ' ' + judge?.lastName}</b>
            {' - ' + judge?.scuntJudgeBribePoints + ' bribe points left'}
          </p>
        );
      })}
      <div style={{ height: '20px' }} />
      <h2>Refill Bribe Points</h2>
      <div style={{ height: '5px' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown
          values={
            judges.length <= 0 || !judges
              ? ['Select Judge']
              : judges.map((judge) => {
                  return judge?.firstName + ' ' + judge?.lastName;
                })
          }
          initialSelectedIndex={0}
          onSelect={(judgeName) => {
            if (judges.length <= 0 || !judges) {
              return 0;
            } else {
              setAssignedJudge(
                judges.filter((judge) => {
                  return judge?.firstName + ' ' + judge?.lastName === judgeName;
                })[0],
              );
            }
          }}
        />
        <div style={{ width: '10px' }} />
        <div className="fill-remaining-width-input">
          <TextInput
            placeholder={'# Points'}
            onChange={(value) => {
              setAssignedBribeRefillPoints(value);
            }}
            setClearText={setClearPointsInput}
            clearText={clearPointsInput}
          />
        </div>
      </div>
      <Button
        label={'Add Judge Bribe Points'}
        onClick={async () => {
          if (!assignedBribeRefillPoints) {
            setSnackbar('Please set a points value', true);
          } else {
            //Refill judges bribe points here
            const response = await axios.post('/scunt-teams/transaction/refill-bribe', {
              judgeUserId: assignedJudge?._id,
              points: assignedBribeRefillPoints,
              isAddPoints: true,
            });
            setSnackbar(response?.data?.message + ' to ' + assignedJudge?.firstName);
            getJudgeUsers();
            setAssignedBribeRefillPoints(0);
            setClearPointsInput(true);
          }
        }}
      />
    </div>
  );
};

const RenameTeams = () => {
  const dispatch = useDispatch();
  const { setSnackbar } = useContext(SnackbarContext);
  const { scuntTeams } = useSelector(scuntTeamsSelector);
  const [teamObjs, setTeamObjs] = useState([]);

  useEffect(() => {
    if (scuntTeams && scuntTeams.length) setTeamObjs(scuntTeams);
  }, [scuntTeams]);

  useEffect(() => {
    dispatch(getScuntTeams({ setSnackbar }));
  }, [dispatch]);

  return (
    <div style={{ margin: '0 5px' }}>
      <h2>Rename Teams</h2>
      <div style={{ height: '5px' }} />
      {teamObjs.map((teamObj, index) => {
        return (
          <TextInput
            key={index}
            placeholder={teamObj.name}
            onChange={(value) => {
              setTeamObjs(
                teamObjs.map((team, i) => (i === index ? { ...team, name: value } : team)),
              );
            }}
            initialValue={teamObj?.name}
            label={'Team ' + teamObj?.number}
          />
        );
      })}
      <div></div>
      <Button
        label={'Rename Teams'}
        onClick={() => {
          dispatch(setScuntTeams({ setSnackbar, scuntTeams: teamObjs }));
        }}
      />
    </div>
  );
};

const DeleteMission = () => {
  const [assignedMissionNumber, setAssignedMissionNumber] = useState(-1);
  const [clearInput, setClearInput] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext);

  return (
    <div style={{ margin: '0 5px' }}>
      <h2>Delete Mission</h2>
      <div style={{ height: '5px' }} />
      <div>
        <TextInput
          placeholder={'Mission # ID'}
          onChange={(value) => {
            setAssignedMissionNumber(value);
          }}
          setClearText={setClearInput}
          clearText={clearInput}
        />
      </div>
      <Button
        label={'Delete Mission'}
        onClick={() => {
          if (assignedMissionNumber === -1) {
            setSnackbar('Please set a mission to delete', true);
          } else {
            setSnackbar('Deleted ' + assignedMissionNumber + ' mission');
            //Delete mission here
            setAssignedMissionNumber(-1);
            setClearInput(true);
          }
        }}
      />
    </div>
  );
};

const HideRevealMissions = () => {
  const [assignedMissionNumberBegin, setAssignedMissionNumberBegin] = useState(-1);
  const [assignedMissionNumberEnd, setAssignedMissionNumberEnd] = useState(-1);

  const [clearInput, setClearInput] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext);

  return (
    <div style={{ margin: '0 5px' }}>
      <h2>Hide/Reveal Missions</h2>
      <div style={{ height: '5px' }} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <TextInput
          label={'Range beginning'}
          placeholder={'Mission # ID'}
          onChange={(value) => {
            setAssignedMissionNumberBegin(value);
          }}
          setClearText={setClearInput}
          clearText={clearInput}
        />
        <h1 style={{ margin: '0px 10px', marginBottom: '8px' }}>-</h1>
        <TextInput
          label={'Range ending'}
          placeholder={'Mission # ID'}
          onChange={(value) => {
            setAssignedMissionNumberEnd(value);
          }}
          setClearText={setClearInput}
          clearText={clearInput}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          label={'Hide Missions'}
          onClick={() => {
            if (
              assignedMissionNumberBegin <= -1 ||
              assignedMissionNumberEnd <= -1 ||
              assignedMissionNumberBegin > assignedMissionNumberEnd
            ) {
              setSnackbar('Please set a proper range of missions', true);
            } else {
              setSnackbar(
                'Hidden missions #' + assignedMissionNumberBegin + ' - ' + assignedMissionNumberEnd,
              );
              //hide missions visibility here
              setAssignedMissionNumberBegin(-1);
              setAssignedMissionNumberEnd(-1);
              setClearInput(true);
            }
          }}
        />
        <Button
          label={'Reveal Missions'}
          onClick={() => {
            if (
              assignedMissionNumberBegin <= -1 ||
              assignedMissionNumberEnd <= -1 ||
              assignedMissionNumberBegin > assignedMissionNumberEnd
            ) {
              setSnackbar('Please set a proper range of missions', true);
            } else {
              setSnackbar(
                'Revealed ' + assignedMissionNumberBegin + ' - ' + assignedMissionNumberEnd,
              );
              //reveal missions visibility here
              setAssignedMissionNumberBegin(-1);
              setAssignedMissionNumberEnd(-1);
              setClearInput(true);
            }
          }}
        />
      </div>
    </div>
  );
};

const CurrentScuntGameSettings = () => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);

  return (
    <div className="current-scunt-game-settings-container">
      <h3 style={{ color: 'var(--text-dynamic)', textAlign: 'center', marginBottom: '20px' }}>
        Current Scunt Settings
      </h3>

      {scuntSettings ? (
        Object.keys(scuntSettings)?.map((settingKey) => {
          if (!['_id', 'name', '__v'].includes(settingKey)) {
            // no need to show the parameters above
            return (
              <p key={settingKey} style={{ color: 'var(--text-dynamic)', marginBottom: '8px' }}>
                <b>{convertCamelToLabel(settingKey)}</b>
                <span>{': '}</span>
                {scuntSettings[settingKey] === true || scuntSettings[settingKey] === false ? (
                  <b
                    style={{
                      display: 'inline-block',
                      color:
                        scuntSettings[settingKey] === true
                          ? 'var(--green-success)'
                          : 'var(--red-error)',
                    }}
                  >
                    {scuntSettings[settingKey].toString()}
                  </b>
                ) : scuntSettings[settingKey] == null ? (
                  ''
                ) : (
                  scuntSettings[settingKey].toString()
                )}
              </p>
            );
          }
        })
      ) : (
        <p style={{ color: 'var(--text-dynamic)', marginBottom: '5px', textAlign: 'center' }}>
          Settings have not been set yet
        </p>
      )}
    </div>
  );
};

const ScuntGameSettingsTextbox = ({
  objKey,
  parameter,
  description,
  placeholder,
  initialValue,
  newSettings,
  setNewSettings,
}) => {
  const handleInput = (input, objKey) => {
    let parseInput;
    let tempSettings = { ...newSettings };
    if (typeof input === 'string') {
      parseInput = input;
    } else {
      parseInput = parseFloat(input);
    }
    tempSettings[objKey] = parseInput;
    setNewSettings(tempSettings);
  };

  // textboxes update the local state!
  return (
    <div className="scunt-game-settings-textbox-container">
      <div className="scunt-game-settings-textbox">
        <TextInput
          inputType={'text'}
          label={parameter}
          description={description}
          // initialValue={initialValue}
          onChange={(input) => handleInput(input, objKey)}
          placeholder={String(placeholder)}
          onEnterKey={(input) => handleInput(input, objKey)}
        ></TextInput>
      </div>
    </div>
  );
};

ScuntGameSettingsTextbox.propTypes = {
  objKey: PropTypes.string,
  parameter: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.any,
  newSettings: PropTypes.object,
  setNewSettings: PropTypes.func,
  initialValue: PropTypes.string,
};

export { ScuntGameSettings };
