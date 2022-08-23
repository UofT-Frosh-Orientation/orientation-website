import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './ScuntGameSettings.scss';

import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';

import { useDispatch, useSelector } from 'react-redux';
import { getScuntSettings, setScuntSettings } from '../../state/scuntSettings/saga';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';

// import { getGameSettings, setGameSettings } from './functions';
import { SnackbarContext } from '../../util/SnackbarProvider';

import useAxios from '../../hooks/useAxios';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';

const { axios } = useAxios();

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
    revealTeams: true,
    discordLink: true,
    revealLeaderboard: true,
    revealMissions: true,
    allowJudging: true,
  };

  const [newSettings, setNewSettings] = useState(initialSettings);
  const { setSnackbar } = useContext(SnackbarContext);

  const { scuntSettings } = useSelector(scuntSettingsSelector);

  // const handleCheckbox = (objKey) => {
  //   let newCheckbox = !(newSettings[objKey]);
  //   newSettings[objKey] = newCheckbox;
  //   setNewSettings(newSettings);

  //   console.log(newSettings);
  // }

  // const startScuntButton = async () => {
  //   console.log(newSettings);
  //   const result = await setGameSettings(newSettings);
  //   if (result !== true) {
  //     setSnackbar('Error', true);
  //   } else {
  //     setSnackbar('Starting Scunt!', false);
  //   }
  // };

  // const getGameSettings = async () => {
  //   try {
  //     // getting stuff from backend
  //     const response = await axios.get('/scunt-game-controls');
  //     setSnackbar('Starting Scunt!', false);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //     setSnackbar('Error', true);
  //   }
  // };

  // useEffect(() => {
  //   dispatch(getScuntSettings());
  //   //console.log(scuntSettings); // this console.log gets Initial value from saga.jsx
  //   //console.log(newSettings);
  // }, []);

  // useEffect(() => {
  //   // update game settings in the component
  //   setNewSettings(
  //     {
  //       ...newSettings,
  //       amountOfTeams: scuntSettings.amountOfTeams,
  //       amountOfStarterBribePoints: scuntSettings.amountOfStarterBribePoints,
  //       maxAmountPointsPercent: scuntSettings.maxAmountPointsPercent,
  //       minAmountPointsPercent: scuntSettings.minAmountPointsPercent,
  //       revealTeams: scuntSettings.revealTeams,
  //       discordLink: scuntSettings.discordLink,
  //       revealLeaderboard: scuntSettings.revealLeaderboard,
  //       revealMissions: scuntSettings.revealMissions,
  //       allowJudging: scuntSettings.allowJudging,
  //     }
  //   )
  // }, [scuntSettings])

  // useEffect(() => {
  //   dispatch(setScuntSettings(setSnackbar, amountOfTeams=newSettings.amountOfTeams,
  //     amountOfStarterBribePoints=newSettings.amountOfStarterBribePoints,
  //     maxAmountPointsPercent=newSettings.maxAmountPointsPercent,
  //     minAmountPointsPercent=newSettings.minAmountPointsPercent,
  //     revealTeams=newSettings.revealTeams,
  //     discordLink=newSettings.discordLink,
  //     revealLeaderboard=newSettings.revealLeaderboard,
  //     revealMissions=newSettings.revealMissions,
  //     allowJudging=newSettings.allowJudging, ))
  // }, [newSettings])

  return (
    <div className="scunt-game-settings-page">
      {/* <Button
        label="Back to Profile"
        onClick={() => {
          navigate('/profile');
        }}
        style={{ marginBottom: '25px' }}
      /> */}

      <CurrentScuntGameSettings />

      <div className="scunt-game-settings-container">
        {/* <p style={{ color: 'var(--text-dynamic)', textAlign: 'center' }}>
          Note: placeholder are the default values!
        </p> */}
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
          {/* <Checkboxes values={scuntsettingbool} initialSelectedIndices={[]} 
        onSelected={(label, index, value) => {
          newSettings[label] = value;
          }} /> */}

          {/* <Checkboxes values={scuntsettingbool} /> */}
          {scuntsettingbool.map((i) => {
            return (
              <div key={i.parameter}>
                <Checkboxes
                  values={[i.parameter]}
                  initialSelectedIndices={[]}
                  // onSelected={() => {

                  //   let newCheckbox = !(newSettings[i.key]);
                  //   console.log(newCheckbox);
                  //   newSettings[i.key] = newCheckbox;
                  //   setNewSettings(newSettings);

                  //   console.log(newSettings);
                  //   console.log(i.key);
                  // }
                  // }

                  onSelected={(value, index, state, selectedIndices) => {
                    newSettings[i.key] = state;
                    //console.log(newSettings);
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
            //dispatch or something here...!
            console.log('calling dispatch...');
            let name = 'Scunt 2T2 Settings';
            let amountOfTeams = newSettings.amountOfTeams;
            let amountOfStarterBribePoints = newSettings.amountOfStarterBribePoints;
            let maxAmountPointsPercent = newSettings.maxAmountPointsPercent;
            let minAmountPointsPercent = newSettings.minAmountPointsPercent;
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
                revealTeams,
                discordLink,
                revealLeaderboard,
                revealMissions,
                allowJudging,
              }),
            );

            dispatch(getScuntSettings());
          }}
        ></Button>
      </div>
    </div>
  );
};

const CurrentScuntGameSettings = () => {
  const dispatch = useDispatch();

  //const [keys, setKeys] = useState(Object.keys(scuntSettings[0]));

  //const [settings, setSettings] = useState();

  //retrieving information from the store
  const { scuntSettings } = useSelector(scuntSettingsSelector); // returns an array of scunt settings
  console.log('store1', scuntSettings);
  const [keys, setKeys] = useState([]);

  // let keys;

  //setKeys(Object.keys(scuntSettings));
  //const [keys, setKeys] = useState(Object.keys(scuntSettings[0]));
  //let scuntSettingsObj = scuntSettings[0]; // we only need one scunt setting object
  //let keys = Object.keys(scuntSettings[0]);

  useEffect(() => {
    //dispatch(getScuntSettings());
    //console.log('store2', scuntSettings);
    //console.log('hihii', Object.keys(scuntSettings));
    //setKeys(Object.keys(scuntSettings[0])); // we only need one object in the array
    //setKeys(Object.keys(scuntSettings[0]));
    //console.log('scuntsettings keys', keys);
    //let keys = Object.keys(scuntSettings);

    if (scuntSettings !== undefined) {
      setKeys(Object.keys(scuntSettings[0]));
    } else {
      setKeys([]);
    }
  }, [scuntsettings]);

  return (
    <div className="current-scunt-game-settings-container">
      <h3 style={{ color: 'var(--text-dynamic)', textAlign: 'center', marginBottom: '20px' }}>
        Current Scunt Settings
      </h3>

      {keys !== [] ? (
        keys?.map((i) => {
          // if (i !== 'id' || i !== 'name')
          // {
          //console.log('i', i);
          //console.log('scuntSettings[i]', scuntSettings[i]);
          if (i !== 'name' && i !== 'id') {
            // no need to show the following parameters
            return (
              <p key={i} style={{ color: 'var(--text-dynamic)', marginBottom: '5px' }}>
                <b>{i}</b>
                <span>{': '}</span>
                {/* {String(scuntSettings[0][i])} */}
                {String(scuntSettings[0][i])}
              </p>
            );
          }

          // }
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
  const [changes, setChanges] = useState(false);
  const [input, setInput] = useState('');

  //console.log(objKey);

  useEffect(() => {
    //console.log(newSettings);
  }, []);

  const handleInput = (input, objKey) => {
    let parseInput = parseFloat(input);
    newSettings[objKey] = parseInput;
    setNewSettings(newSettings);

    console.log(newSettings);
  };

  // textboxes update the local state!
  return (
    <div className="scunt-game-settings-textbox-container">
      <div className="scunt-game-settings-textbox">
        <TextInput
          inputType={'text'}
          label={parameter}
          description={description}
          onChange={
            (input) => handleInput(input, objKey)
            //   {

            //   if (objKey === 'maxAmountPointsPercent' || objKey === 'minAmountPointsPercent') {
            //     newSettings[objKey] = parseFloat(input);
            //   } else {
            //     newSettings[objKey] = parseInt(input);
            //   }

            //   setNewSettings(newSettings);
            //   setChanges(false);
            //   //console.log(newSettings);

            //   setInput(amount);
            //   setChanges(true);

            //   console.log(input)
            // }
          }
          placeholder={String(placeholder)}
          onEnterKey={
            (input) => handleInput(input, objKey)
            //   (amount) => {
            //   newSettings[objKey] = parseFloat(input);
            //   setNewSettings(newSettings);
            //   setChanges(false);
            //   //console.log(newSettings);
            // }
          }
        ></TextInput>
        {/* <Button
          label="Submit"
          onClick={() => {
            newSettings[objKey] = parseFloat(input);
            setNewSettings(newSettings);
            console.log(newSettings);
            setChanges(false);
          }}
          isDisabled={!changes}
        ></Button> */}
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
