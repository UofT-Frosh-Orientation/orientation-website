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

import './ScuntMissionsDashboard.scss';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';

import { submitMission, setVisibility, deleteMission } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import { createMultipleMissions, getScuntMissions } from '../../state/scuntMissions/saga';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

const missioninput = [
  {
    label: 'Number',
    placeholder: '1',
    key: 'number',
    des: 'Numbers must be unique!',
  },
  {
    label: 'Name',
    placeholder: 'Jump into ANY body of water',
    key: 'name',
    des: '',
  },
  {
    label: 'Category',
    placeholder: 'The Classics',
    key: 'category',
    des: '',
  },
  {
    label: 'Points',
    placeholder: '300',
    key: 'points',
    des: '',
  },
];

const ScuntCreateMissions = () => {
  let initialMission = {
    number: '',
    name: '',
    category: '',
    points: '',
    isHidden: false,
    isJudgingStation: false,
  };

  const { setSnackbar } = useContext(SnackbarContext); // use Snackbar to send messages --> successfull hidden/deleted, etc.
  const { darkMode } = useContext(DarkModeContext);
  const [newMission, setNewMission] = useState(initialMission);

  let keys = Object.keys(newMission);

  // get the number of missions... i.e. getMissions -> get the length of the array -> add one = number

  const handleInput = (input, objKey) => {
    let parseInput;
    let tempSettings = { ...newMission };
    if (typeof input === 'string') {
      parseInput = input;
    } else if (typeof input === 'boolean') {
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
      setSnackbar(result.message, false);
      //setNewMission(initialMission);
    } else {
      // display error message13
      // do not setSubmit to true
      setSnackbar('Error, the mission number probably already exsts!', true);
    }
  };

  return (
    <>
      <div className="scunt-create-missions-tab-container">
        <div className="scunt-create-missions-container">
          <div className="scunt-create-missions-textinput">
            {missioninput.map((i) => {
              return (
                <>
                  <TextInput
                    label={i.label}
                    placeholder={i.label}
                    isRequiredInput={i.key === 'number' || i.key === 'name' ? true : false}
                    onChange={
                      (input) => {
                        handleInput(input, i.key);
                      }
                      // TODO: update the state var -- DONE
                    }
                    style={{ width: '100%', flexGrow: '1' }}
                    description={i.des}
                  />
                </>
              );
            })}
            <Checkboxes
              values={['isHidden']}
              onSelected={(value, index, state, selectedIndices) => {
                handleInput(state, 'isHidden');
              }}
            />
            <Checkboxes
              values={['isJudgingStation']}
              onSelected={(value, index, state, selectedIndices) => {
                handleInput(state, 'isJudgingStation');
              }}
            />
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
              }}
              isSecondary={true}
              style={{ width: 'fit-content' }}
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
  const [fromMission, setFromMission] = useState('');
  const [toMission, setToMission] = useState('');
  const [visibilty, setSettingVisibility] = useState('');

  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: true, setSnackbar }));
  }, []);

  const items = ['true', 'false'];

  const handleSubmit = async () => {
    if (toMission == '' || fromMission == '') {
      setSnackbar('Please input required fields', true);
    } else if (toMission < fromMission) {
      setSnackbar('Please input valid range', true);
    } else {
      await setVisibility(setSnackbar, fromMission, toMission, visibilty);
    }
  };
  const hiddenMissionCell = { backgroundColor: 'var(--purple-shades-light-light)' };

  return (
    <div className="all-accounts-container">
      <div style={{ display: 'flex' }}>
        <TextInput
          label="From"
          placeholder={''}
          isRequiredInput={true}
          onChange={(input) => {
            setFromMission(input);
          }}
          style={{ display: 'inline-block', margin: '5px' }}
        />
        <TextInput
          label="To"
          placeholder={''}
          isRequiredInput={true}
          onChange={(input) => {
            setToMission(input);
          }}
          style={{ display: 'inline-block', margin: '5px' }}
        />
        <div style={{ padding: 'auto' }}>
          <Dropdown
            initialSelectedIndex={0}
            label={'Set isHidden To:'}
            values={items}
            onSelect={(value) => {
              setSettingVisibility(value);
            }}
            isDisabled={false}
          />
        </div>
        <div style={{ padding: 'auto', marginTop: '15px' }}>
          <Button
            label="Submit"
            onClick={() => {
              handleSubmit();
            }}
            isSecondary={true}
            style={{ width: 'fit-content' }}
          ></Button>
        </div>
      </div>
      <div style={{ height: '20px' }} />
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header" style={{ width: '30px' }}>
              #
            </th>
            <th className="all-accounts-table-header-left-align">Name</th>
            <th className="all-accounts-table-header-left-align">Category</th>
            <th className="all-accounts-table-header">Points</th>
            <th className="all-accounts-table-header">Hidden</th>
            <th className="all-accounts-table-header">{'Judging \n Station'}</th>
            <th className="all-accounts-table-header">Delete</th>
          </tr>
          {missions.map((mission) => {
            return (
              <>
                <tr
                  className="all-accounts-row"
                  key={mission.number + mission.name}
                  style={mission?.isHidden ? hiddenMissionCell : {}}
                >
                  <td className="all-account-data" style={{ padding: '8px', textAlign: 'center' }}>
                    {mission?.number}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', width: '600px', overflowWrap: 'anywhere' }}
                  >
                    {mission?.name}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', overflowWrap: 'anywhere' }}
                  >
                    {mission?.category}
                  </td>
                  <td className="all-account-data" style={{ padding: '8px', textAlign: 'center' }}>
                    {mission?.points}
                  </td>
                  <td className="all-account-data-verified-container" style={{ padding: '8px' }}>
                    <div
                      onClick={async () => {
                        await setVisibility(
                          setSnackbar,
                          mission?.number,
                          mission?.number,
                          !mission?.isHidden,
                        );
                      }}
                      style={{ marginRight: 'auto', marginLeft: 'auto', width: 'fit-content' }}
                    >
                      <img
                        src={
                          mission?.isHidden
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
                  <td
                    className="all-account-data"
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                      color: mission?.isJudgingStation
                        ? 'var(--green-success-dark)'
                        : 'var(--red-error)',
                    }}
                  >
                    {mission?.isJudgingStation.toString()}
                  </td>
                  <td className="all-account-data" style={{ padding: '8px' }}>
                    <div
                      onClick={async () => {
                        await deleteMission(setSnackbar, mission.number);
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

const ScuntUploadMissions = () => {
  const [file, setFile] = useState(); // file information
  const [array, setArray] = useState([]); // array of missions to be sent to backend
  const { setSnackbar } = useContext(SnackbarContext);
  const fileReader = new FileReader();

  const headerKeys = ['Number', 'Name', 'Category', 'Points', 'Hidden', 'JudgingStation'];

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        const { data, errors } = parseCsvString(text, {
          '#': {
            key: 'number',
            parseFunction: (val) => parseInt(val),
            validator: (val) => Number.isInteger(val) && val >= 0,
            required: true,
            errorMessage: 'The mission number must be a positive integer!',
          },
          Mission: {
            key: 'name',
            parseFunction: (val) => val,
            validator: (val) => val.length > 0,
            required: true,
            errorMessage: 'The mission name must be at least one character!',
          },
          Category: {
            key: 'category',
            parseFunction: (val) => val,
            validator: (val) => val.length > 0,
            required: true,
            errorMessage: 'The mission category must be at least one character!',
          },
          Points: {
            key: 'points',
            parseFunction: (val) => parseInt(val),
            validator: (val) => Number.isInteger(val) && val >= 0,
            required: true,
            errorMessage: 'The mission points must be a positive integer!',
          },
          Hidden: {
            key: 'isHidden',
            parseFunction: (val) => val.toLowerCase() === 'true',
            validator: () => true,
            required: false,
            errorMessage: '',
          },
          'Judging Station?': {
            key: 'isJudgingStation',
            parseFunction: (val) => val.toLowerCase() === 'true',
            validator: () => true,
            required: false,
            errorMessage: '',
          },
        });
        setArray(data);
      };

      fileReader.readAsText(file);
    }
  };

  const uploadMissions = () => {
    dispatch(createMultipleMissions({ file, array, setSnackbar }));
  };

  return (
    <div className="scunt-upload-missions-container">
      <div className="scunt-upload-missions-buttons">
        <input
          className="button"
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          onChange={handleOnChange}
          style={{
            margin: '15px 10px',
            backgroundColor: 'var(--light-purple)',
            color: 'var(--white)',
          }}
        />
        <Button
          label="Preview CSV"
          style={{ width: 'fit-content', flex: '1' }}
          onClick={(e) => {
            if (file !== undefined) {
              handleOnSubmit(e);
            }
          }}
        />
        <Button
          label="Upload Missions"
          style={{ width: 'fit-content' }}
          onClick={() => {
            if (array !== undefined) {
              // calling backend!
              uploadMissions();
            }
          }}
        />
      </div>
      <div className="separator" />
      <br />

      <table className="upload-missions-table">
        <tbody>
          <tr className="upload-mission-table-header-row">
            {headerKeys.map((key) => (
              <th key={key} className="upload-mission-table-header-cell">
                {key}
              </th>
            ))}
          </tr>
        </tbody>

        <tbody>
          {array.map((item) => (
            <tr key={item.number} className="upload-mission-row">
              {Object.values(item).map((val, idx) => (
                <td
                  key={item.number + val.toString() + headerKeys[idx]}
                  className="upload-mission-cell"
                >
                  {val.toString()}
                </td>
              ))}
            </tr>
          ))}
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
    title: 'Create Missions',
    component: <ScuntCreateMissions />,
  },
  {
    title: 'Upload Missions CSV',
    component: <ScuntUploadMissions />,
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

const parseCsvString = (csvString, mapping, delimiter = ',') => {
  // regex checks for delimiters that are not contained within quotation marks
  const regex = new RegExp(`(?!\\B"[^"]*)${delimiter}(?![^"]*"\\B)`);
  if (csvString.length === 0 || !/\r\b|\r|\n/.test(csvString)) {
    return { data: [] };
  }
  const rows = csvString.split(/\r\n|\r|\n/).filter((elem) => elem !== '');
  const headers = rows[0].split(regex).map((h) => h.replace(/^(["'])(.*)\1$/, '$2'));
  const requiredHeaders = Object.keys(mapping).filter((m) => mapping[m].required);
  const headerErrors = [];
  requiredHeaders.forEach((header) => {
    if (!headers.includes(header)) {
      headerErrors.push({ row: 1, column: header, errorMessage: `Missing header ${header}` });
    }
  });
  if (headerErrors.length > 0) {
    return { data: [], errors: headerErrors };
  }
  const allowedHeaders = Object.keys(mapping);
  const dataRows = rows.slice(1);
  const { data, errors } = dataRows.reduce(
    (previous, row, rowIndex) => {
      const values = row.split(regex);
      const parsedRow = headers.reduce((previousObj, current, index) => {
        if (allowedHeaders.includes(current)) {
          const val = mapping[current].parseFunction(values[index].replace(/^(["'])(.*)\1$/, '$2')); // removes any surrounding quotation marks
          if (mapping[current].validator(val)) {
            previousObj[mapping[current].key] = val;
          } else {
            previous.errors.push({
              row: rowIndex + 2,
              column: current,
              errorMessage: mapping[current].errorMessage,
            });
          }
        }
        return previousObj;
      }, {});
      previous.data.push(parsedRow);
      return previous;
    },
    { data: [], errors: [] },
  );
  console.table(data);
  return { data, errors };
};

export { PageScuntMissionsDashboard };
