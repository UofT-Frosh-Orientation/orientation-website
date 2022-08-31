// this is what the scunt execs will use to edit the missions -- ADMIN PAGE!

import { React, useState, useEffect, useContext } from 'react';
import { list } from '../ScuntJudgeForm/scuntTempData';
import './ScuntMissionsDashboard.scss';
import '../AccountsApproval/AccountsApproval.scss';

import hiddenEye from '../../../assets/icons/eye-slash-solid.svg';
import openEye from '../../../assets/icons/eye-solid.svg';
import hiddenEyeDark from '../../assets/darkmode/icons/eye-slash-solid.svg';
import openEyeDark from '../../assets/darkmode/icons/eye-solid.svg';

import WhiteCross from '../../assets/misc/xmark-solid-white.svg';

import { Tabs } from '../../components/tabs/tabs';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { DarkModeContext } from '../../util/DarkModeProvider';

import useAxios from '../../hooks/useAxios';
import './ScuntMissionsDashboard.scss';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';

import { getMissions, submitMission } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';

const { axios } = useAxios();

const missioninput = [
  {
    label: 'Name',
    placeholder: 'Jump into ANY body of water',
    key: 'name',
  },
  {
    label: 'Category',
    placeholder: 'The Classics',
    key: 'category',
  },
  {
    label: 'Points',
    placeholder: '300',
    key: 'points',
  },
];

const CreateMissions = () => {
  let initialMission = {
    number: '',
    name: '',
    category: '',
    points: '',
    isHidden: false,
  };

  const { setSnackbar } = useContext(SnackbarContext); // use Snackbar to send messages --> successfull hidden/deleted, etc.
  const { darkMode } = useContext(DarkModeContext);
  const [newMission, setNewMission] = useState(initialMission);
  const [submit, setSubmit] = useState(false);
  const [number, setNumber] = useState(1); // sets mission number according to the amount in the database

  let keys = Object.keys(newMission);

  useEffect(() => {
    let temp = { ...newMission };
    temp.number = number;
    setNewMission(temp);
  }, [submit]);

  // get the number of missions... i.e. getMissions -> get the length of the array -> add one = number

  const handleInput = (input, objKey) => {
    let parseInput;
    let tempSettings = { ...newMission };
    if (typeof input === 'string') {
      parseInput = input;
    } else {
      parseInput = parseFloat(input);
    }
    tempSettings[objKey] = parseInput;
    setNewMission(tempSettings);
  };

  const handleSubmit = async () => {
    const result = await submitMission(newMission);

    if (result.result) {
      // display a snack bar
      // setSubmit to true
      // reset newMissions to empty obj
      setSnackbar(result.message);
      setSubmit(true);
      setNewMission(initialMission);
    } else {
      // display error message
      // do not setSubmit to true
      if (result.code === 'ERR_BAD_REQUEST') {
        setSnackbar('Please Enter Mission Name', true);
      } else {
        setSnackbar(result.message, true);
      }

      setSubmit(false);
    }
  };

  // useEffect(() => {
  //   console.log(newMission)
  // }, [newMission])

  return (
    <>
      <div className="scunt-create-missions-tab-container">
        <Button
          label="Upload CSV File"
          onClick={() => {
            // TODO: search up how to upload CSV files!
          }}
          isSecondary={true}
          style={{ width: 'fit-content' }}
        />

        <div className="separator" />
        <br />

        <div className="scunt-create-missions-container">
          <div className="scunt-create-missions-textinput">
            {missioninput.map((i) => {
              return (
                <>
                  <TextInput
                    label={i.label}
                    placeholder={i.label}
                    isRequiredInput={true}
                    onChange={
                      (input) => handleInput(input, i.key)
                      // TODO: update the state var -- DONE
                    }
                    onEnterKey={
                      (input) => handleInput(input, i.key)
                      // TODO: update the state var -- DONE
                    }
                    style={{ width: '100%', flexGrow: '1' }}
                    // clearText={submit}
                    // setClearText={setSubmit}
                  />
                </>
              );
            })}
          </div>
          <div className="scunt-create-missions-preview-container">
            <div className="scunt-create-missions-preview">
              <h3 style={{ marginBottom: '20px' }}>Mission Preview</h3>

              {newMission !== undefined ? (
                keys?.map((i) => {
                  return (
                    <p key={i} style={{ color: 'var(--text-dynamic)', marginBottom: '8px' }}>
                      <b>{convertCamelToLabel(i)}</b>
                      <span>{': '}</span>
                      {newMission[i] === true || newMission[i] === false ? (
                        <div
                          style={{
                            display: 'inline-block',
                            color:
                              newMission[i] === true ? 'var(--green-success)' : 'var(--red-error)',
                          }}
                        >
                          <b>{newMission[i].toString()}</b>
                        </div>
                      ) : (
                        newMission[i].toString()
                      )}
                    </p>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <Button
              label="Create Mission"
              onClick={() => {
                // TODO: call backend to submit mission
                // delete the object or set it back to initial state

                handleSubmit();

                //setSubmit(true);
              }}
              isSecondary={true}
              style={{ width: 'fit-content' }}
              isDisabled={submit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ScuntAllMissions = () => {
  const dispatch = useDispatch();
  const { setSnackbar } = useContext(SnackbarContext); // use Snackbar to send messages --> successfull hidden/deleted, etc.
  const { darkMode } = useContext(DarkModeContext);
  const { missions } = useSelector(scuntMissionsSelector);
  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: true, setSnackbar }));
  });

  // TODO: setMissions( to data from database ? )

  return (
    <div className="all-accounts-container">
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header" style={{ width: '30px' }}>
              #
            </th>
            <th className="all-accounts-table-header-left-align">Name</th>
            <th className="all-accounts-table-header-left-align">Category</th>
            <th className="all-accounts-table-header">Points</th>
            <th className="all-accounts-table-header">isHidden</th>
            <th className="all-accounts-table-header">Delete</th>
          </tr>
          {missions.map((mission) => {
            return (
              <>
                <tr className="all-accounts-row" key={mission.number + mission.name}>
                  <td className="all-account-data" style={{ padding: '8px', textAlign: 'center' }}>
                    {mission.number}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', width: '600px', 'overflow-wrap': 'anywhere' }}
                  >
                    {mission.name}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', 'overflow-wrap': 'anywhere' }}
                  >
                    {mission.category}
                  </td>
                  <td className="all-account-data" style={{ padding: '8px', textAlign: 'center' }}>
                    {mission.points}
                  </td>
                  <td className="all-account-data-verified-container" style={{ padding: '8px' }}>
                    <div
                      onClick={() => {
                        // TODO: when the eye is toggled make sure to update data in database and missions state variable is updated in useEffect
                      }}
                      style={{ marginRight: 'auto', marginLeft: 'auto', width: 'fit-content' }}
                    >
                      <img
                        src={
                          mission.isHidden
                            ? darkMode
                              ? hiddenEyeDark
                              : hiddenEye
                            : darkMode
                            ? openEyeDark
                            : openEye
                        }
                        alt="show/hide missions"
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                        }}
                      />
                    </div>
                  </td>
                  <td className="all-account-data" style={{ padding: '8px' }}>
                    <div
                      onClick={() => {
                        // TODO: delete the corresponding mission from the database
                      }}
                      className={'approve-deny-checkbox approve-red-cross'}
                      style={{ marginRight: 'auto', marginLeft: 'auto' }}
                    >
                      <img className="deny-icon" src={WhiteCross} alt="delete mission" />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const tabs = [
  {
    title: 'All Missions',
    component: <ScuntAllMissions />,
  },
  {
    title: 'Create/Upload Missions',
    component: <CreateMissions />,
  },
];

const PageScuntMissionsDashboard = () => {
  return (
    <>
      <div className="accounts-approval-page-container">
        <div className="accounts-approval-tabs-container">
          <Tabs tabs={tabs} displayButtons={false} />
        </div>
      </div>
    </>
  );
};

export { PageScuntMissionsDashboard };
