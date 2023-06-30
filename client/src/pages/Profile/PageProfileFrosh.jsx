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
import { TaskAnnouncement } from '../../components/task/TaskAnnouncement/TaskAnnouncement';
import { QRNormal } from 'react-qrbtf';
import { ButtonBubble } from '../../components/button/ButtonBubble/ButtonBubble';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import EditIcon from '../../assets/misc/pen-solid.svg';
import CampingIcon from '../../assets/misc/camping-tent.png';
import { getScuntTeamObjFromTeamNumber } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Link } from 'react-router-dom';
import { resources } from '../../util/resources';
import { instagramAccounts } from '../../util/instagramAccounts';
import InstagramIcon from '../../assets/social/instagram-brands.svg';
import NitelifeIcon from '../../assets/misc/nitelife.png';
import ScuntIcon from '../../assets/misc/magnifier.png';
import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { updateUserInfo } from '../../state/user/saga';
import { announcementsSelector } from '../../state/announcements/announcementsSlice';
import { getAnnouncements, completeAnnouncements, getCompletedAnnouncements } from '../../state/announcements/saga';
import { QRScannerDisplay } from '../../components/QRScannerDisplay/QRScannerDisplay';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { scuntDiscord } from '../../util/scunt-constants';
import { froshGroups } from '../../util/frosh-groups';
import { getFrosh } from '../../state/frosh/saga';
import { registeredFroshSelector } from '../../state/frosh/froshSlice';
import { completedAnnouncementsSelector } from '../../state/announcements/announcementsSlice';
import { ScheduleComponentAccordion } from '../../components/schedule/ScheduleHome/ScheduleHome';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import useAxios from '../../hooks/useAxios';
import { getRemainingTickets } from '../FroshRetreat/FroshRetreat';
const { axios } = useAxios();

const PageProfileFrosh = () => {
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
        <ProfilePageFroshHeader editButton={true} />
        <div className="profile-info-row">
          <div>
            <ProfilePageFroshScuntMessage />
            {user?.isRegistered && <ProfilePageRetreat />}
            <ProfilePageNitelife />
            <ProfilePageInstagrams />
            <ProfilePageAnnouncements />
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
            <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} />
            <ProfilePageFroshScuntTeamsSelection />
            <ProfilePageResources />
          </div>
        </div>
      </>
    );
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

export const ProfilePageFroshScuntMessage = () => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const code = user?.scuntToken;
  if ((code === undefined ||
      !isRegistered ||
      !scuntSettings ||
      scuntSettings.length <= 0 ||
      scuntSettings[0]?.revealTeams === false)
  ) {
    return <></>;
  }

  return isRegistered ? (
    <Link to="/scunt">
      <div className="frosh-instagram-container">
        <img src={ScuntIcon} alt="Scunt" style={{ filter: darkMode ? 'invert(1)' : 'unset' }} />
        <div>
          <h2>Havenger Scunt!</h2>
          <p>Find more information about Scunt by clicking here!</p>
        </div>
      </div>
    </Link>
  ) : (
    <></>
  );
};

export const ProfilePageFroshScuntTeamsSelection = () => {
  const [teammates, setTeammates] = useState(['', '', '']);
  const [teammatesChangesMade, setTeammatesChangesMade] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { axios } = useAxios();

  if(!isRegistered || !user?.scunt ||
    (scuntSettings !== undefined &&
      scuntSettings.length >= 1 &&
      scuntSettings[0]?.revealTeams === true)
  ) {
    return <></>;
  }

  return (
    <div className="profile-page-scunt-token profile-page-side-section">
      <h2>Scunt Teammates</h2>
      <p style={{ fontSize: '12px' }}>
        Enter the emails (precisely) of other people (up to 3) you want to team with. Otherwise you
        will be put in a random team. Your requested team members must do the same. You do not need
        to put your own email.
      </p>
      {[0, 1, 2].map((index) => {
        return (
          <TextInput
            key={index.toString()}
            placeholder={'Email ' + (index + 1).toString()}
            initialValue={
              user?.scuntPreferredMembers[index] !== user?.email
                ? user?.scuntPreferredMembers[index]
                : ''
            }
            value={teammates[index]}
            onChange={(value) => {
              teammates[index] = value;
              setTeammates(teammates);
              if (value !== user?.scuntPreferredMembers[index] && !teammatesChangesMade)
                setTeammatesChangesMade(true);
            }}
          />
        );
      })}
      <Button
        isSecondary={true}
        isDisabled={!teammatesChangesMade}
        label={'Submit'}
        onClick={async () => {
          if (teammatesChangesMade) {
            const teammatesCopy = teammates.filter((t) => {
              return t !== '';
            });
            for (let i = 0; i < teammatesCopy.length; i++) {
              teammatesCopy[i] = teammatesCopy[i].replaceAll(' ', '');
            }
            // The last email is always the same as the user
            teammatesCopy[teammatesCopy.length] = user?.email;

            for (let userEmail of teammatesCopy) {
              let response;
              try {
                response = await axios.put('/user/user-exist', { email: userEmail });
              } catch (e) {
                if (e?.response?.status === 404) {
                  setSnackbar(userEmail + ' does not exist!', true);
                } else {
                  setSnackbar(e.toString(), true);
                }
              }
            }

            const newInfo = { scuntPreferredMembers: teammatesCopy };
            dispatch(updateUserInfo({ newInfo }));
            setSnackbar('Successfully submitted team request!');
            setTeammatesChangesMade(false);
          }
        }}
      />
    </div>
  );
};

export const ProfilePageScuntToken = ({ scuntTeams, scuntTeamObjs }) => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showToken, setShowToken] = useState(false);

  const code = user?.scuntToken;
  if ((code === undefined || !isRegistered || !scuntSettings || 
      scuntSettings.length <= 0 ||
      (scuntSettings !== undefined &&
        scuntSettings.length >= 1 &&
        scuntSettings[0]?.revealTeams === false))
  ) {
    return <></>;
  }
  if (!user?.scunt) {
    return (
      <div className="profile-page-scunt-token profile-page-side-section">
        <p>
          <b>Looking for your Scunt login Token?</b>
        </p>
        <p>You have chosen not to participate in Scunt.</p>
        <div style={{ height: '30px' }} />
      </div>
    );
  }
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

ProfilePageScuntToken.propTypes = {
  scuntTeams: PropTypes.array,
  scuntTeamObjs: PropTypes.array,
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

const ProfilePageFroshHeader = ({ editButton }) => {
  const { user } = useSelector(userSelector);
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
          <h1>{user?.froshGroupIcon}</h1>
          <p>{user?.froshGroup}</p>
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
            <p>Class of</p>
            <h2>{froshYear}</h2>
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
      {!isRegistered ? (
        <div className={'profile-not-registered'}>
          <h1>You are not registered!</h1>
          <h2>You will not be able to participate in F!rosh week events until you register.</h2>
          <Link
            key={'/registration'}
            to={'/registration'}
            style={{ textDecoration: 'none' }}
            className={'no-link-style'}
          >
            <Button label="Register" style={{}} />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

ProfilePageFroshHeader.propTypes = {
  editButton: PropTypes.bool,
};

const ProfilePageNitelife = () => {
  const isRegistered = useSelector(registeredSelector);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return isRegistered ? (
    <a
      href={'https://drive.google.com/file/d/1-C3Pq7neNUuPlIC5an4W031vWLajS1HD/view'}
      className="no-link-style"
      target={'_blank'}
      rel="noreferrer"
    >
      <div className="frosh-instagram-container">
        <img
          src={NitelifeIcon}
          alt="Nitelife"
          style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
        />
        <div>
          <h2>Nitelife Event Schedule & Map</h2>
          <p>F!rosh Week doesn&apos;t end at 6:00! Learn more by clicking here.</p>
        </div>
      </div>
    </a>
  ) : (
    <></>
  );
};

const ProfilePageInstagrams = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const getInstagramFromLink = (link) => {
    if (link === undefined) return '';
    return link.replace('https://www.instagram.com', '').replace('/', '');
  };

  const instagramLink = instagramAccounts[user?.froshGroup];

  return isRegistered ? (
    <a href={instagramLink} className="no-link-style" target={'_blank'} rel="noreferrer">
      <div className="frosh-instagram-container">
        <img
          src={InstagramIcon}
          alt="Instagram"
          style={{ filter: !darkMode ? 'invert(1)' : 'unset' }}
        />
        <div>
          <p>Go follow your frosh group and meet your Leedurs!</p>
          <h2>@{getInstagramFromLink(instagramLink).slice(0, -1)}</h2>
        </div>
      </div>
    </a>
  ) : (
    <></>
  );
};

const ProfilePageAnnouncements = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { announcements } = useSelector(announcementsSelector);
  const { completedAnnouncements } = useSelector(completedAnnouncementsSelector);
  const [announcementList, setAnnouncementList] = useState([]);
  const { setSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    dispatch(getAnnouncements());
    dispatch(getCompletedAnnouncements());
  }, []);

  useEffect(() => {
    let orderedAnnouncements = [];

    announcements.forEach((announcement) => {
      if (
        completedAnnouncements.every((value) => {
          return value._id !== announcement._id;
        })
      ) {
        orderedAnnouncements.push({
          id: announcement._id,
          name: announcement.name,
          dateCreated: announcement.dateCreated,
          completed: false,
          description: announcement.description,
        });
      }
    });
    completedAnnouncements.forEach((announcement) => {
      orderedAnnouncements.push({
        id: announcement._id,
        name: announcement.name,
        dateCreated: announcement.dateCreated,
        completed: true,
        description: announcement.description,
      });
    });
    setAnnouncementList(orderedAnnouncements);
  }, [announcements, completedAnnouncements]);

  const onDoneTask = (task) => {
    if (task.completed !== true) {
      dispatch(completeAnnouncements({ announcementData: { id: task.id } }));

      setSnackbar('Marked ' + task.name + ' as complete!');
    } else {
      dispatch(completeAnnouncements({ announcementData: { id: task.id } }));
      setSnackbar('Marked ' + task.name + ' as uncompleted!');
    }
  };

  return (
    <div className="profile-page-announcements">
      <h2 className="profile-page-section-header">Tasks and Announcements</h2>

      {user?.canEmail === false ? (
        <Link
          key={'/resubscribe'}
          to={'/resubscribe'}
          style={{ textDecoration: 'none' }}
          className={'no-link-style'}
        >
          <Button label="Resubscribe To Announcements Emails" />
        </Link>
      ) : (
        <></>
      )}
      <TaskAnnouncement tasks={announcementList} onDone={onDoneTask} />
    </div>
  );
};

const ProfilePageQRCode = () => {
  const isRegistered = useSelector(registeredSelector);
  const [QRCodeString, setQRCodeString] = useState('');
  const { user } = useSelector(userSelector);
  
  useEffect(() => {
    setQRCodeString(getQRCodeString(user));
  }, []);

  if (!isRegistered) {
    return <></>;
  }

  if (QRCodeString === undefined) {
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

export { PageProfileFrosh, ProfilePageFroshHeader };