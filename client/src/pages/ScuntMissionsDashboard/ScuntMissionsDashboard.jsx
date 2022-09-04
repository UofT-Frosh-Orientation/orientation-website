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

import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';

import { getMissionsAdmin, submitMission, setVisibility, deleteMission } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { scuntMissionsSelector } from '../../state/scuntMissions/scuntMissionsSlice';
import { getScuntMissions } from '../../state/scuntMissions/saga';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

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

const ScuntCreateMissions = () => {
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
            <Checkboxes
              values={['isHidden']}
              onSelected={(value, index, state, selectedIndices) => {
                handleInput(state, 'isHidden');
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
  useEffect(() => {
    dispatch(getScuntMissions({ showHidden: true, setSnackbar }));
  });

  const hiddenMissionCell = { backgroundColor: 'var(--purple-shades-light-light)' };

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
                <tr
                  className="all-accounts-row"
                  key={mission.number + mission.name}
                  style={mission?.isHidden ? hiddenMissionCell : {}}
                >
                  <td className="all-account-data" style={{ padding: '8px', textAlign: 'center' }}>
                    {mission.number}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', width: '600px', overflowWrap: 'anywhere' }}
                  >
                    {mission.name}
                  </td>
                  <td
                    className="all-account-data"
                    style={{ padding: '8px', overflowWrap: 'anywhere' }}
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
                          mission.isHidden,
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

const ScuntUploadMissions = () => {
  const [file, setFile] = useState(); // file information
  const [array, setArray] = useState([]); // array of missions to be sent to backend

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    console.log('csvHeader', csvHeader);
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');
    console.log('csvRows', csvRows);

    const temparray = csvRows.map((i) => {
      const values = i.split(',');
      console.log('values', values);
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    console.log('arrya', temparray);

    setArray(temparray);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  useEffect(() => {
    console.log(array);
  }, [array]);

  const uploadMissions = () => {
    //TODO: calling backend!
    array.map((mission) => {});
  };

  // return (
  //   <>
  //     <div className="scunt-upload-missions-container">
  //       <ScuntCSVFileButton />
  //       {/* </Button> */}

  //       <div className="separator" />
  //       <br />
  //     </div>
  //   </>
  // );

  return (
    <div className="scunt-upload-missions-container">
      {/* <h1>REACTJS CSV IMPORT EXAMPLE </h1> */}

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

      {/* <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form> */}
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
            <tr key={item.id} className="upload-mission-row">
              {Object.values(item).map((val) => (
                <td key={item.id + val} className="upload-mission-cell">
                  {val}
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

export { PageScuntMissionsDashboard };