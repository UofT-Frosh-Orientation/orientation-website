import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  capitalizeFirstLetter,
  getDaysSchedule,
  getFroshGroupSchedule,
  getQRCodeString,
  parseQRCode,
  scannedUserKeys,
  signInFrosh,
} from './functions';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { QRNormal } from 'react-qrbtf';
import { ButtonBubble } from '../../components/button/ButtonBubble/ButtonBubble';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import EditIcon from '../../assets/misc/pen-solid.svg';
import { Link } from 'react-router-dom';
import { resources } from '../../util/resources';
import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { QRScannerDisplay } from '../../components/QRScannerDisplay/QRScannerDisplay';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { scuntDiscord } from '../../util/scunt-constants';
import { froshGroups } from '../../util/frosh-groups';
import { getFrosh } from '../../state/frosh/saga';
import { registeredFroshSelector } from '../../state/frosh/froshSlice';
import { ScheduleComponentAccordion } from '../../components/schedule/ScheduleHome/ScheduleHome';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import {
  getScuntTeamObjFromTeamNumber,
} from '../ScuntJudgeForm/ScuntJudgeForm';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();


const PageProfileLeedur = () => {
    const { user } = useSelector(userSelector);
    const qrCodeLeader = user?.authScopes?.approved.includes('signInFrosh:qr-code registration');
  
    const [scuntTeams, setScuntTeams] = useState([]);
    const [scuntTeamObjs, setScuntTeamObjs] = useState();
  
    const getScuntTeams = async () => {
      try {
        const response = await axios.get('/scunt-teams');
        const { teamPoints } = response.data;
        if (teamPoints.length <= 0 || !teamPoints) setScuntTeams([]);
        else {
          setScuntTeamObjs(teamPoints);
          setScuntTeams(
            teamPoints.map((team) => {
              return team?.name;
            }),
          );
        }
      } catch (e) {
        console.error(e.toString());
        setScuntTeams(['Error loading teams']);
      }
    };
  
    useEffect(() => {
      getScuntTeams();
    }, []);
  
    return (
      <>
        <ProfilePageLeedurHeader editButton={true} />
        <ProfilePageLeaderPermissionDashboardLinks />
        <div className="profile-info-row">
          <div>
            <div style={{ marginTop: '20px' }} />
            <ProfilePageLeedurScuntMessage />
            <div style={{ marginTop: '-20px' }} />
            <ProfilePageSchedule />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ProfilePageQRCode />
            {qrCodeLeader === true ? (
              <>
                <ProfilePageQRScanner />
              </>
            ) : (
              <></>
            )}
            <ProfilePageLeedurScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} />
            <ProfilePageResources />
            <ProfilePageScuntTeamSelectionLeader
            scuntTeamObjs={scuntTeamObjs}
            scuntTeams={scuntTeams}
            />
          </div>
        </div>
      </>
    );
};

{ /*
const ProfilePageScuntTeamSelectionLeader = ({ scuntTeams, scuntTeamObjs }) => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [selectedScuntTeamNumber, setSelectedScuntTeamNumber] = useState();
  const { user } = useSelector(userSelector);

  const changeScuntTeam = async (teamNumber) => {
    const result = await axios.post('/scunt-teams/update-team', { teamNumber: teamNumber });
    setSnackbar(result?.data?.message + ' The page will refresh in 2 seconds.');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <div className="profile-page-side-section" style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{ height: '10px' }} />
        <h2>Scunt Team</h2>
        <RadioButtons
          initialSelectedIndex={user?.scuntTeam - 1}
          values={scuntTeams}
          onSelected={(value) => {
            setSelectedScuntTeamNumber(getScuntTeamObjFromTeamName(value, scuntTeamObjs)?.number);
          }}
        />
        <Button
          label={'Change Scunt Team'}
          onClick={() => {
            changeScuntTeam(selectedScuntTeamNumber);
          }}
        />
      </div>
    </>
  );
};

ProfilePageScuntTeamSelectionLeader.propTypes = {
  scuntTeams: PropTypes.array,
  scuntTeamObjs: PropTypes.array,
};

export const ProfilePageRetreat = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const isRetreat = user?.isRetreat === true;
  const { setSnackbar } = useContext(SnackbarContext);

  const [remainingTickets, setRemainingTickets] = useState();

  useEffect(async () => {
    setRemainingTickets(await getRemainingTickets(setSnackbar));
  }, []);

  if (!isRegistered) {
    return <></>;
  }
  if (remainingTickets <= 0 && !isRetreat) {
    return <></>;
  }
  return (
    <Link to={'/frosh-retreat'} className="no-link-style">
      <div className="retreat-profile-container">
        <img src={CampingIcon} alt="Camping" style={{ filter: darkMode ? 'invert(1)' : 'unset' }} />
        {isRetreat ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <h2>Thank you for purchasing a Frosh Retreat Ticket!</h2>
            <p>
              We will reach out with more information soon. Keep an eye on your email! Please bring
              a signed copy of the waiver to retreat.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div>
                <h2>Want to participate in F!rosh Retreat?</h2>
                <p>
                  There are only a limited number of tickets, so get yours before it&apos;s too
                  late!{' '}
                </p>
              </div>
              <div className="desktop-only">
                <Button
                  label={'Learn More'}
                  isSecondary
                  style={{ margin: 0, marginLeft: '10px' }}
                />
              </div>
            </div>
            <div className="mobile-only" style={{ marginTop: '10px', width: '100%' }}>
              <Button
                label={'Learn More'}
                isSecondary
                style={{
                  margin: '-1px',
                  marginLeft: '10px',
                  display: 'flex',
                  flex: '1 0 auto',
                  justifyContent: 'center',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
*/}

export const ProfilePageLeedurScuntMessage = () => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';
  const isRegistered = useSelector(registeredSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showToken, setShowToken] = useState(false);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const code = user?.scuntToken;

  return (
    <Link to="/scunt">
      <div className="frosh-instagram-container">
        <img src={ScuntIcon} alt="Scunt" style={{ filter: darkMode ? 'invert(1)' : 'unset' }} />
        <div>
          <h2>Havenger Scunt!</h2>
          <p>Find more information about Scunt by clicking here!</p>
        </div>
      </div>
    </Link>
  );
};


export const ProfilePageLeedurScuntToken = ({ scuntTeams, scuntTeamObjs }) => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showToken, setShowToken] = useState(false);
  const code = user?.scuntToken;
  
  return (
    <div className="profile-page-scunt-token profile-page-side-section">
      <h2>{getScuntTeamObjFromTeamNumber(user?.scuntTeam, scuntTeamObjs)?.name}</h2>
      <i>
        <h4>Team {user?.scuntTeam ? user?.scuntTeam.toString() : '‽'}</h4>
      </i>
      <h3
        style={{ filter: showToken ? '' : 'blur(10px)' }}
        onClick={() => {
          setSnackbar('Copied to clipboard');
          navigator.clipboard.writeText(code);
        }}
      >
        {code}
      </h3>
      <p>Scunt Login Token</p>
      <p style={{ fontSize: '13px' }}>
        Use this token to login to the{' '}
        <a href={scuntDiscord} target="_blank" rel="noreferrer">
          Scunt Discord
        </a>
      </p>
      <ButtonOutlined
        isSecondary={showToken}
        label={showToken ? 'Hide' : 'Show'}
        onClick={() => {
          setShowToken(!showToken);
        }}
      />
    </div>
  );
};

ProfilePageLeedurScuntToken.propTypes = {
  scuntTeams: PropTypes.array,
  scuntTeamObjs: PropTypes.array,
};

const ProfilePageLeaderPermissionDashboardLinks = () => {
  const { user } = useSelector(userSelector);
  const approved = user?.approved === true;
  
  return (
    <div className={'profile-leader-dashboard-links'}>
      <ProfilePageDashboardLink
        link="/approve-accounts"
        authScopes={['accounts:delete', 'accounts:edit', 'accounts:read']}
        label="Leedur Account Scope Approval"
      />
      {approved ? (
        <Link
          to={'/permission-request'}
          style={{ textDecoration: 'none' }}
          className={'no-link-style'}
        >
          <Button label="Request Leedur Permissions" />
        </Link>
      ) : (
        <></>
      )}
      <ProfilePageDashboardLink
        link="/scunt-judge-form"
        authScopes={[
          'scunt:exec allow leaderboard',
          'scunt:exec allow missions page',
          'scunt:exec hide leaderboard',
          'scunt:exec hide missions page',
          'scunt:exec hide wedding missions',
          'scunt:exec negative points',
          'scunt:exec refill bribe points',
          'scunt:exec show wedding missions',
          'scunt:judge bribe points',
          'scunt:judge missions',
        ]}
        label="Scunt Judge Panel"
      />
      <ProfilePageDashboardLink
        link="/scunt-missions-dashboard"
        authScopes={[
          'scunt:exec show missions',
          'scunt:exec hide missions',
          'scunt:exec create missions',
          'scunt:exec delete missions',
        ]}
        label="Scunt Mission Panel"
      />
      <ProfilePageDashboardLink
        link="/scunt-transactions"
        authScopes={['scunt:exec view transactions']}
        label="Scunt Point Transactions"
      />
      <ProfilePageDashboardLink
        link="/scunt-game-controls"
        authScopes={['scunt:exec game controls']}
        label="Scunt Settings"
      />
      <ProfilePageDashboardLink
        link="/faq-admin"
        authScopes={['faq:delete', 'faq:edit']}
        label="FAQ Admin Panel"
      />
      <ProfilePageDashboardLink
        link="/timeline-admin"
        authScopes={['timeline:create', 'timeline:edit', 'timeline:delete']}
        label="Timeline Admin Panel"
      />
      <ProfilePageDashboardLink
        link="/announcement-dashboard"
        authScopes={['announcements:delete', 'announcements:create', 'announcements:edit']}
        label="Announcements Admin Panel"
      />
      <ProfilePageDashboardLink
        link="/frosh-info-table"
        anyRegisterScope={true}
        label="Frosh Info Table"
      />
    </div>
  );
};

// If a user has any of the auth scopes then it will show this button
const ProfilePageDashboardLink = ({ link, authScopes, anyRegisterScope, label }) => {
  const { user } = useSelector(userSelector);
  let hasAuthScope = false;
  
    if (authScopes) {
        for (let authScope of authScopes) {
            if (user && user?.authScopes?.approved?.includes(authScope)) {
                hasAuthScope = true;
                break;
            }
        }
    }

    const hasAnyRegisterScope = anyRegisterScope && user?.froshDataFields?.approved?.length > 0;
    if (hasAuthScope || hasAnyRegisterScope) {
        return (
        <Link to={link} style={{ textDecoration: 'none' }} className={'no-link-style'}>
            <Button label={label} />
        </Link>
        );
    } else {
        return <></>;
    }
};

ProfilePageDashboardLink.propTypes = {
  link: PropTypes.string,
  authScopes: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  anyRegisterScope: PropTypes.bool,
};

const ProfilePageQRScanner = () => {
  const { setSnackbar } = useContext(SnackbarContext);

  const [clearText, setClearText] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [searchFor, setSearchFor] = useState('');
  const [results, setResults] = useState([
    {
      email: 'test@gmail.com',
    },
  ]);
  const [scannedData, setScannedData] = useState('');
  const [scannedUserData, setScannedUserData] = useState('');
  const { registeredFrosh } = useSelector(registeredFroshSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFrosh({ showAllUsers: false }));
  }, []);

  let searchTimeout;

  // debounce input to improve performance when searching >800 frosh
  useEffect(() => {
    // clear timeout if they typed
    clearTimeout(searchTimeout);
    if (!searchFor || searchFor === '') {
      setResults([]);
    } else {
      // set timeout to wait for them to finish typing before searching
      searchTimeout = setTimeout(() => {
        const lowerCaseSearch = searchFor.toLowerCase();
        const filteredFrosh = registeredFrosh.filter(
          (f) =>
            `${f?.firstName} ${f?.lastName}`?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.email?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.preferredName?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.utorid?.toLowerCase()?.includes(lowerCaseSearch),
        );
        setResults(filteredFrosh);
      }, 500);
    }
  }, [searchFor]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <div className="profile-page-qr-code-scanner profile-page-side-section">
      <QRScannerDisplay
        setScannedData={(data) => setScannedData(parseQRCode(data))}
      ></QRScannerDisplay>
      <div
        className={`profile-page-scanned-data ${
          submitSuccess ? 'profile-page-scanned-data-success' : ''
        } ${submitError !== false ? 'profile-page-scanned-data-error' : ''}`}
      >
        {scannedData === '' ? (
          'Nothing scanned yet!'
        ) : (
          <div>
            <h3>Current Scanned Data</h3>
            <div style={{ height: '7px' }} />
            <b>{'Email: '}</b>
            {scannedData?.email?.toString()}
          </div>
        )}
      </div>
      {scannedUserData === '' ? (
        <></>
      ) : (
        <div
          className={`profile-page-scanned-data ${
            submitSuccess ? 'profile-page-scanned-data-success' : ''
          } ${submitError !== false ? 'profile-page-scanned-data-error' : ''}`}
        >
          <div>
            <h3>Scanned User Info</h3>
            <div style={{ height: '7px' }} />
            <>
              <div>
                <b>Name:</b>
                {scannedUserData?.preferredName === '' || !scannedUserData?.preferredName
                  ? scannedUserData?.firstName
                  : scannedUserData?.preferredName}
              </div>
              {scannedUserKeys().map((keyPassed) => {
                const key = keyPassed.toString();
                return (
                  <div key={key}>
                    <b>{capitalizeFirstLetter(key) + ': '}</b>
                    {scannedUserData[key]?.toString()}
                  </div>
                );
              })}
              {scannedUserData['signInDate'] !== undefined ? (
                <div style={{ color: 'black' }}>
                  <ErrorSuccessBox
                    error
                    content={`User already signed in on ${new Date(
                      scannedUserData['signInDate'],
                    )?.toLocaleDateString(undefined, options)}`}
                  />
                </div>
                ) : (
                  <></>
              )}
            </>
          </div>
        </div>
      )}
      <Button
        label={'Submit'}
        onClick={async () => {
          setClearText(true);
          if (scannedData === '' || !scannedData) {
            setSnackbar('Please scan a QR code first!', true);
            return;
          }
          const result = await signInFrosh(scannedData.email);
          setScannedUserData(result?.data?.returnedUser);

          if (result) {
            setScannedData('');
            setSubmitSuccess(true);
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 450);
            if (submitError !== false) {
              setSubmitError(false);
            }
            if (!results.length) {
              setResults([]);
            }
          } else {
            setSubmitError(result);
          }
        }}
      />
      <p>
        <i>{submitError !== false ? 'Error: ' + submitError : ''}</i>
      </p>
      <h2 className="profile-page-manual-entry-header">Manual Entry</h2>
      <div style={{ padding: '0px 10px', width: '100%' }}>
        <TextInput
          placeholder={'Search by Email, Name, or UtorID'}
          onEnterKey={(value) => {
            setSearchFor(value);
          }}
          clearText={clearText}
          setClearText={(value) => {
            setClearText(value);
            setSearchFor('');
          }}
        />
      </div>
      <div className="manual-sign-in-frosh-search-result-container">
        {results.slice(0, 5).map((frosh, index) => {
          return (
            <ButtonOutlined
              onClick={() => {
                setScannedData(frosh);
              }}
              key={frosh.email + index}
              label={
                <div>
                  <h3>{`${frosh.preferredName === '' ? frosh.firstName : frosh.preferredName} ${
                    frosh.lastName
                  }`}</h3>
                  <p>{frosh.email}</p>
                  <p>{frosh.utorid}</p>
                </div>
              }
              className="manual-sign-in-frosh-search-result"
            />
          );
        })}
      </div>
    </div>
  );
};

const ProfilePageLeedurHeader = ({ leader, editButton }) => {
  const { user } = useSelector(userSelector);
  const leaderApproved = user?.approved === true;

  const isRegistered = useSelector(registeredSelector);

  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const currentYear = new Date().getFullYear();
  const firstDigitL = currentYear.toString().slice(-2, -1);
  const lastDigitL = currentYear.toString().slice(-1);
  let leedurYear = `${firstDigitL}T${lastDigitL}`;
  const gradYear = currentYear + 4;
  const firstDigitF = gradYear.toString().slice(-2, -1);
  const lastDigitF = gradYear.toString().slice(-1);
  let froshYear = `${firstDigitF}T${lastDigitF}`;

  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          <h1>ℒ</h1>
          <p>'(Leedur)'</p>
        </div>
        <div className="profile-page-header-info-wrap">
          <div className="profile-page-header-info">
            <p className="profile-page-name-title">
              {user?.preferredName === '' || !user?.preferredName ? (
                <>
                  <b>{user?.firstName}</b> {user?.lastName}
                </>
              ) : (
                <b>{user?.preferredName}</b>
              )}
            </p>
            {user?.discipline && <p>{`Incoming ${user['discipline']} Engineering student`}</p>}
            <p>
              <u>{user?.email}</u>
            </p>
          </div>
          <div className="profile-page-header-class desktop-only">
            {leader === true ? (
              <h2>{leedurYear}</h2>
            ) : (
              <>
                <p>Class of</p>
                <h2>{froshYear}</h2>
              </>
            )}
          </div>
          {editButton !== false && isRegistered ? (
            <Link to={'/profile-edit'} className={'profile-edit-icon-link no-link-style'}>
              <img src={EditIcon} alt={'edit'} className={'profile-edit-icon'} />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      {darkMode ? (
        <img src={WaveReverseFlipDarkMode} className="wave-image home-page-bottom-wave-image" />
      ) : (
        <img src={WaveReverseFlip} className="wave-image home-page-bottom-wave-image" />
      )}
      {leaderApproved === false ? (
        <div className={'profile-not-registered'}>
          <h1>Your Leedur Account is not Approved!</h1>
          <h2>Please contact a VC to get your account approved.</h2>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

ProfilePageLeedurHeader.propTypes = {
  leader: PropTypes.bool,
  editButton: PropTypes.bool,
};

const ProfilePageQRCode = () => {
  const [QRCodeString, setQRCodeString] = useState('');
  const { user } = useSelector(userSelector);
  
  useEffect(() => {
    setQRCodeString(getQRCodeString(user));
  }, []);

  if(QRCodeString === undefined) {
    return (
      <div className="profile-page-qr-code profile-page-side-section">
        <p>There is an error with your QR code.</p>
      </div>
    );
  }

  return (
    <div className="profile-page-qr-code profile-page-side-section">
      <QRNormal
        value={QRCodeString}
        styles={{ svg: { width: '120%', margin: '-10%' } }}
        type="round"
        opacity={100}
        posType="round"
        otherColor="#320846"
        posColor="#28093A"
        backgroundColor="white"
      />
      <p>Your Sign-in QR Code</p>
    </div>
  );
};

const ProfilePageResources = () => {
  return (
    <div className="profile-page-resources profile-page-side-section">
      <h2>Resources</h2>
      {resources.map((resource, index) => {
        return (
          <a
            key={index + resource.name}
            href={resource.link}
            target="_blank"
            className="no-link-style"
            rel="noreferrer"
          >
            <ButtonBubble
              label={resource.name}
              isSecondary
              style={{ margin: 0, marginTop: '10px' }}
            />
          </a>
        );
      })}
    </div>
  );
};

const ProfilePageSchedule = () => {
  const { user } = useSelector(userSelector);
  const [froshGroup, setFroshGroup] = useState(user?.froshGroup);
  const scheduleData = getFroshGroupSchedule(froshGroup);
  const days = getDaysSchedule(scheduleData);
  const today = new Date();
  const options = { weekday: 'long' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');
  
  let count = 0;
  for (let day of days) {
    if (day === todayString) {
      break;
    }
    count++;
  }
  if (count >= Object.keys(scheduleData).length) {
    count = 0;
  }
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(false);
  const buttonList = Object.keys(scheduleData).map((item) => {
    return { name: item };
  });

  const froshGroupNames = [];
  for (let froshGroup of froshGroups) {
    froshGroupNames.push(froshGroup?.name);
  }

  return (
    <div className="profile-page-schedule">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className="profile-page-section-header profile-page-section-header-schedule">
          Schedule
        </h2>
        <div style={{ marginTop: '10px' }}>
        <Dropdown
            values={froshGroupNames}
            initialSelectedIndex={0}
            onSelect={(froshGroup) => {
            setFroshGroup(froshGroup);
            }}
            localStorageKey={'leader-frosh-group-dropdown'}
        />
        </div>
      </div>
      <div className="profile-page-schedule-content">
        <ButtonSelector
          buttonList={buttonList}
          activeIndex={selectedDayIndex}
          setActiveIndex={(index) => {
            setSelectedDayIndex(index);
            setCloseAll(!closeAll);
          }}
          style={{
            maxWidth: '250px',
            marginTop: '0px',
            marginBottom: '10px',
            padding: '11px 15px',
          }}
        />
        <div className="profile-page-schedule-accordions">
          {scheduleData[Object.keys(scheduleData)[selectedDayIndex]].map((scheduleDay, index) => {
            return (
              <ScheduleComponentAccordion
                key={Object.keys(scheduleData)[index] + index}
                scheduleDay={scheduleDay}
                closeAll={closeAll}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { PageProfileLeedur, ProfilePageLeedurHeader };