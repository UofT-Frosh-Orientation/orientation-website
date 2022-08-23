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
    default: 10,
  },
  {
    parameter: 'Amount of Starter Bribe Points',
    key: 'amountOfStarterBribePoints',
    description: 'Set all judges bribe points to this number when the game starts',
    default: 10000,
  },
  {
    parameter: 'Max Amount of Points',
    key: 'maxAmountPointsPercent',
    description:
      'The max amount of points allowed to be given out over the recommended amount for missions',
    default: 0.3,
  },
  {
    parameter: 'Min Amount of Points',
    key: 'minAmountPointsPercent',
    description:
      'The min amount of points allowed to be given out over the recommended amount for missions',
    default: 0.3,
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
    key: 'discordLink',
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

  const initialSettings = {
    name: 'Scunt2T2 Settings',
    amountOfTeams: 10,
    amountOfStarterBribePoints: 10000,
    maxAmountPointsPercent: 0.3,
    minAmountPointsPercent: 0.3,
    revealJudgesAndBribes: true,
    revealTeams: true,
    discordLink: true,
    revealLeaderboard: true,
    revealMissions: true,
    allowJudging: true,
  };

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
                  placeholder={i.default}
                  newSettings={newSettings}
                  setNewSettings={setNewSettings}
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

        <Button
          label="Update Scunt Settings"
          isSecondary={true}
          style={{ width: '50%', justifySelf: 'center', margin: '0 auto' }}
          onClick={async () => {
            let name = 'Scunt 2T2 Settings';
            let amountOfTeams = newSettings.amountOfTeams;
            let amountOfStarterBribePoints = newSettings.amountOfStarterBribePoints;
            let maxAmountPointsPercent = newSettings.maxAmountPointsPercent;
            let minAmountPointsPercent = newSettings.minAmountPointsPercent;
            let revealJudgesAndBribes = newSettings.revealJudgesAndBribes;
            let revealTeams = newSettings.revealTeams;
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
                discordLink,
                revealLeaderboard,
                revealMissions,
                allowJudging,
              }),
            );
          }}
        ></Button>
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
  newSettings,
  setNewSettings,
}) => {
  const handleInput = (input, objKey) => {
    let parseInput = parseFloat(input);
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
          initialValue={placeholder}
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
  placeholder: PropTypes.number,
  newSettings: PropTypes.object,
  setNewSettings: PropTypes.func,
};

export { ScuntGameSettings };
