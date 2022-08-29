import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './ScuntGameSettings.scss';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

import { useDispatch, useSelector } from 'react-redux';
import { getScuntSettings, setScuntSettings } from '../../state/scuntSettings/saga';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

const scuntsettings = [
  {
    parameter: 'Amount of Teams',
    key: 'amountOfTeams', // key in the model
    placeholder: 10,
  },
  {
    parameter: 'Amount of Starter Bribe Points',
    key: 'amountOfStarterBribePoints',
    description: 'Set all judges bribe points to this number when the game starts',
    placeholder: 10000,
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
  {
    parameter: 'Discord Link',
    key: 'discordLink',
    description: 'if blank the discord link will be set to the one in the database',
    placeholder: 'https://discord.com/',
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
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { scuntSettings } = useSelector(scuntSettingsSelector);
  //console.log(scuntSettings);

  useEffect(() => {
    //dispatch(setScuntSettings());
    //dispatch(getScuntSettings());
    //console.log(scuntSettings);
  }, []);

  const initialSettings = {
    name: 'Scunt2T2 Settings',
    amountOfTeams: 10,
    amountOfStarterBribePoints: 10000,
    maxAmountPointsPercent: 0.3,
    minAmountPointsPercent: 0.3,
    revealJudgesAndBribes: true,
    revealTeams: true,
    showDiscordLink: true,
    revealLeaderboard: true,
    revealMissions: true,
    allowJudging: true,
  };

  //dispatch(setScuntSettings(initialSettings));

  const [newSettings, setNewSettings] = useState(initialSettings);
  // const [newSettings, setNewSettings] = useState();
  const { setSnackbar } = useContext(SnackbarContext);

  return (
    <div className="scunt-game-settings-page">
      <CurrentScuntGameSettings />

      <div className="scunt-game-settings-container">
        <div style={{ marginBottom: '10px' }}>
          {scuntsettings.map((i) => {
            return (
              <div key={i.parameter}>
                <ScuntGameSettingsTextbox
                  objKey={i.key}
                  parameter={i.parameter}
                  description={i.description}
                  placeholder={i.placeholder}
                  newSettings={newSettings}
                  setNewSettings={setNewSettings}
                  // initialValue={i.default}
                />
              </div>
            );
          })}
        </div>

        <div className="separator" />
        <br />

        <RefillJudgeBribePoints />

        <div className="separator" />
        <br />

        <DeleteMission />

        <div className="separator" />
        <br />

        <HideRevealMissions />

        <div className="separator" />
        <br />

        <div style={{ marginBottom: '30px' }}>
          {scuntsettingbool.map((i) => {
            return (
              <div key={i.parameter}>
                <Checkboxes
                  values={[i.parameter]}
                  initialSelectedIndices={[]}
                  onSelected={(value, index, state, selectedIndices) => {
                    newSettings[i.key] = state;
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: '50%',
            justifySelf: 'center',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Button
            label="Update Settings"
            style={{ margin: '0 20px' }}
            onClick={async () => {
              let name = 'Scunt 2T2 Settings';
              let amountOfTeams = newSettings.amountOfTeams;
              let amountOfStarterBribePoints = newSettings.amountOfStarterBribePoints;
              let maxAmountPointsPercent = newSettings.maxAmountPointsPercent;
              let minAmountPointsPercent = newSettings.minAmountPointsPercent;
              let revealJudgesAndBribes = newSettings.revealJudgesAndBribes;
              let revealTeams = newSettings.revealTeams;
              let showDiscordLink = newSettings.showDiscordLink;
              let discordLink = newSettings.discordLink;
              console.log(discordLink);
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
            style={{ margin: '0 20px' }}
            onClick={async () => {
              let name = 'Scunt 2T2 Settings';
              let amountOfTeams = newSettings.amountOfTeams;
              let amountOfStarterBribePoints = newSettings.amountOfStarterBribePoints;
              let maxAmountPointsPercent = newSettings.maxAmountPointsPercent;
              let minAmountPointsPercent = newSettings.minAmountPointsPercent;
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

const RefillJudgeBribePoints = () => {
  const [assignedBribeRefillPoints, setAssignedBribeRefillPoints] = useState(0);
  const [assignedJudge, setAssignedJudge] = useState('');
  const [clearPointsInput, setClearPointsInput] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext);

  return (
    <div style={{ margin: '0 5px' }}>
      <h2>Refill Bribe Points</h2>
      <div style={{ height: '5px' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown
          values={['Judge 1', 'Judge 2']}
          initialSelectedIndex={0}
          onSelect={(judge) => {
            setAssignedJudge(judge);
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
        label={'Refill Judge Bribe Points'}
        onClick={() => {
          setSnackbar('Given ' + assignedBribeRefillPoints + ' bribe points to ' + assignedJudge);
          //Refill judges bribe points here
          setAssignedBribeRefillPoints(0);
          setClearPointsInput(true);
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
  const { scuntSettings } = useSelector(scuntSettingsSelector); // returns an array of scunt settings
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // this is to catch the initially undefined settings
    if (scuntSettings !== undefined) {
      setKeys(Object.keys(scuntSettings[0]));
    }
  }, [scuntSettings]);

  return (
    <div className="current-scunt-game-settings-container">
      <h3 style={{ color: 'var(--text-dynamic)', textAlign: 'center', marginBottom: '20px' }}>
        Current Scunt Settings
      </h3>

      {scuntSettings !== undefined ? (
        keys?.map((i) => {
          if (i !== 'name' && i !== 'id') {
            // no need to show the parameters above
            return (
              <p key={i} style={{ color: 'var(--text-dynamic)', marginBottom: '8px' }}>
                <b>{convertCamelToLabel(i)}</b>
                <span>{': '}</span>
                {scuntSettings[0][i] === true || scuntSettings[0][i] === false ? (
                  <div
                    style={{
                      display: 'inline-block',
                      color:
                        scuntSettings[0][i] === true ? 'var(--green-success)' : 'var(--red-error)',
                    }}
                  >
                    <b>{scuntSettings[0][i].toString()}</b>
                  </div>
                ) : (
                  scuntSettings[0][i].toString()
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
    if (typeof input === 'string') {
      parseInput = input;
    } else {
      parseInput = parseFloat(input);
    }
    newSettings[objKey] = parseInput;
    setNewSettings(newSettings);
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
