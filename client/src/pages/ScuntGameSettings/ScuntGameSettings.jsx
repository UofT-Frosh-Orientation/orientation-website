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
        <div style={{ marginBottom: '30px' }}>
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
                  initialValue={i.default}
                />
              </div>
            );
          })}
        </div>

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
                {String(scuntSettings[0][i])}
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
