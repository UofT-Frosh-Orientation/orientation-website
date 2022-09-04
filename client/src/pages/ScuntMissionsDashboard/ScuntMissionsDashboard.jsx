// this is what the scunt execs will use to edit the missions -- ADMIN PAGE!

import { React, useState, useEffect, useContext } from 'react';
// import { useCSVReader } from 'react-papaparse';
//import { CSVReader } from 'react-papaparse';
//import Papa from 'papaparse'
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
import { Dropdown } from '../../components/form/Dropdown/Dropdown';

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';

import { getMissionsAdmin, submitMission, setVisibility, deleteMission } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';

const { axios } = useAxios();

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

// const parseFile = (file) => {
//   Papa.parse(file);
// }

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
  const [number, setNumber] = useState(0); // sets mission number according to the amount in the database
  const [enterInput, setEnterInput] = useState(false);

  //const [submitDisabled, setSubmitDisabled] = useState(true);

  let keys = Object.keys(newMission);

  // useEffect(() => {

  //   let temp = { ...newMission };
  //   temp.number = number;
  //   setNewMission(temp);
  // }, [submit]);

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
    console.log(result);

    if (result.result) {
      // display a snack bar
      // setSubmit to true
      // reset newMissions to empty obj
      setSnackbar(result.message, false);
      setSubmit(true);
      //setNewMission(initialMission);
    } else {
      // display error message13
      // do not setSubmit to true
      setSnackbar('Error', true);

      setSubmit(true);
    }
  };

  // useEffect(() => {
  //   console.log(newMission)
  // }, [newMission])

  return (
    <>
      <div className="scunt-create-missions-tab-container">
        {/* <Button
          label="Upload CSV File"
          onClick={() => {
            // TODO: search up how to upload CSV files!
          }}
          isSecondary={true}
          style={{ width: 'fit-content' }}
        >  */}
        <ScuntCSVFileButton />
        {/* </Button> */}

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
                    isRequiredInput={i.key === 'number' || i.key === 'name' ? true : false}
                    onChange={
                      (input) => {
                        // if (i.key === 'number' || i.key === 'name') {
                        //   setSubmitDisabled(false);
                        // }
                        handleInput(input, i.key);
                      }
                      // TODO: update the state var -- DONE
                    }
                    // onEnterKey={
                    //   (input) => handleInput(input, i.key)
                    //   // TODO: update the state var -- DONE
                    // }
                    style={{ width: '100%', flexGrow: '1' }}
                    description={i.des}
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
              //isDisabled={setSubmitDisabled}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ScuntCSVFileButton = () => {
  //const { CSVReader } = useCSVReader();
  const [CSVFile, setCSVFile] = useState();

  const changeHandler = (event) => {
    console.log(event.target.files[0]);

    // Papa.parse(event.target.files[0], {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (results) {
    //     console.log(results.data)
    //   },});
  };

  const submit = () => {
    const file = CSVFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      console.log(text);
    };
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', color: 'var(--text-dynamic)' }}>Upload CSV File</h2>
      <input
        className="button"
        type="file"
        name="file"
        accept=".csv"
        onChange={(e) => {
          setCSVFile(e.target.files[0]);
          console.log(CSVFile);
        }}
        style={{
          margin: '15px 10px',
          backgroundColor: 'var(--light-purple)',
          color: 'var(--white)',
        }}
      />
      <Button
        label="Submit"
        style={{ width: 'fit-content' }}
        onClick={(e) => {
          if (CSVFile !== undefined) {
            submit();
          }
        }}
      />
      {/* <CSVReader
      onUploadAccepted={(results: any) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style='scunt-csv-reader'>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style='scunt-accepted-file'>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style='scunt-remove-file'>
              Remove
            </button>
          </div>
          <ProgressBar style='scunt-progress-bar-background' />
        </>
      )}
    </CSVReader> */}
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
  });

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
        <div style={{ padding: 'auto', margin: '5px' }}>
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
                      onClick={async () => {
                        await setVisibility(
                          setSnackbar,
                          mission.number,
                          mission.number,
                          !mission.isHidden,
                        );
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
