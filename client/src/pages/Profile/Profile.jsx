import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  canLeaderScanQR,
  capitalizeFirstLetter,
  getDaysFroshSchedule,
  getFroshData,
  getFroshScheduleData,
  getQRCodeString,
  getTasks,
  isLeader,
  onDoneTask,
  parseQRCode,
  qrKeys,
  searchForFrosh,
  signInFrosh,
} from './functions';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { TaskAnnouncement } from '../../components/task/TaskAnnouncement/TaskAnnouncement';
import { QRNormal } from 'react-qrbtf';
import { ButtonBubble } from '../../components/button/ButtonBubble/ButtonBubble';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import SingleAccordionStories from '../../components/text/Accordion/SingleAccordion/SingleAccordion.stories';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import QrScanner from 'qr-scanner';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import EditIcon from '../../assets/misc/pen-solid.svg';
import { Link, useNavigate } from 'react-router-dom';
import { resources } from '../../util/resources';
import { instagramAccounts } from '../../util/instagramAccounts';
import InstagramIcon from '../../assets/social/instagram-brands.svg';

import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';

import { QRScannerDisplay } from '../../components/QRScannerDisplay/QRScannerDisplay';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { okayToInviteToScunt, scuntDiscord } from '../../util/scunt-constants';

const PageProfile = () => {
  const { user } = useSelector(userSelector);

  const qrCodeLeader = canLeaderScanQR();
  const leader = user?.userType === 'leadur';
  if (qrCodeLeader) {
    return <PageProfileQRLeader />;
  } else if (leader) {
    return <PageProfileFrosh leader />;
  } else {
    return <PageProfileFrosh />;
  }
};

const PageProfileFrosh = ({ leader, isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader
        leader={leader}
        editButton={true}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="profile-info-row">
        <div>
          {leader === false || leader === undefined ? (
            <>
              <ProfilePageInstagrams />
              <ProfilePageAnnouncements />
            </>
          ) : (
            <div style={{ marginTop: '-20px' }} />
          )}
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfilePageQRCode />
          <ProfilePageScuntToken />
          <ProfilePageResources />
        </div>
      </div>
    </>
  );
};

PageProfileFrosh.propTypes = {
  leader: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
};

export const ProfilePageScuntToken = () => {
  if (okayToInviteToScunt === false) {
    return <div />;
  }

  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showToken, setShowToken] = useState(false);

  const code = user?.scuntToken;
  if (code === undefined || !isRegistered) {
    return <></>;
  }
  if (!user?.scunt) {
    return (
      <div className="profile-page-scunt-token profile-page-side-section">
        <p>
          <b>Looking for your Scunt login Token?</b>
        </p>
        <p>You have chosen not to participate in Scunt.</p>
        <br />
        <p>
          If you want to participate, please edit your profile <Link to="/profile-edit">here</Link>{' '}
          and set <em>Would you like to participate in Havenger Scunt?</em> to <b>Yes</b>.{' '}
        </p>
        <div style={{ height: '30px' }} />
      </div>
    );
  }
  return (
    <div className="profile-page-scunt-token profile-page-side-section">
      <h2
        style={{ filter: showToken ? '' : 'blur(10px)' }}
        onClick={() => {
          setSnackbar('Copied to clipboard');
          navigator.clipboard.writeText(code);
        }}
      >
        {code}
      </h2>
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

const PageProfileQRLeader = () => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader leader />
      <div className="profile-info-row">
        <div style={{ marginTop: '-40px' }}>
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfilePageQRScanner />
          <div style={{ height: '10px' }} />
          <ProfilePageQRCode />
          <ProfilePageResources />
        </div>
      </div>
    </>
  );
};

const ProfilePageQRScanner = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [searchFor, setSearchFor] = useState('');
  const [results, setResults] = useState([]);
  const [scannedData, setScannedData] = useState('');

  const search = () => {
    setResults(searchForFrosh(searchFor));
  };

  return (
    <div className="profile-page-qr-code">
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
          <>
            {qrKeys().map((keyPassed) => {
              const key = keyPassed.toString();
              return (
                <div key={key}>
                  <b>{capitalizeFirstLetter(key) + ': '}</b>
                  {scannedData[key]?.toString()}
                </div>
              );
            })}
          </>
        )}
      </div>
      <Button
        label={'Submit'}
        onClick={() => {
          const result = signInFrosh(scannedData.email);
          if (result === true) {
            setScannedData(parseQRCode(''));
            setSubmitSuccess(true);
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 450);
            if (submitError !== false) {
              setSubmitError(false);
            }
            if (results !== []) {
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
          placeholder={'Frosh Name / Email'}
          onChange={(value) => {
            setSearchFor(value);
          }}
          onEnterKey={() => {
            search();
          }}
        />
      </div>
      <div className="manual-sign-in-frosh-search-result-container">
        {results.map((frosh, index) => {
          return (
            <ButtonOutlined
              onClick={() => {
                setScannedData(frosh);
              }}
              key={frosh.email + index}
              label={
                <div>
                  <h3>{frosh.name}</h3>
                  <p>{frosh.email}</p>
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

const ProfilePageHeader = ({ leader, editButton }) => {
  const { user } = useSelector(userSelector);
  const leaderApproved = user?.approved === true;

  const isRegistered = useSelector(registeredSelector);
  // console.log(`editButton: ${editButton}`);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          <h1>{leader === true ? 'ℒ' : user?.froshGroupIcon}</h1>
          {leader === true ? <p>{'(Leedur)'}</p> : <p>{user?.froshGroup}</p>}
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
              <h2>2T2</h2>
            ) : (
              <>
                <p>Class of</p>
                <h2>2T6</h2>
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
      {leader === true && leaderApproved === false ? (
        <div className={'profile-not-registered'}>
          <h1>Your Leedur Account is not Approved!</h1>
          <h2>Please contact a VC to get your account approved.</h2>
        </div>
      ) : (
        <></>
      )}
      {leader === true && leaderApproved === true ? (
        <div className={'profile-not-registered'}>
          <Link
            to={'/permission-request'}
            style={{ textDecoration: 'none' }}
            className={'no-link-style'}
          >
            <Button label="Request Leedur Permissions" style={{}} />
          </Link>
        </div>
      ) : (
        <></>
      )}
      {!isRegistered && leader !== true ? (
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

ProfilePageHeader.propTypes = {
  leader: PropTypes.bool,
  editButton: PropTypes.bool,
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
          style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
        />
        <div>
          <p>Go follow your frosh group and meet your Leedurs!</p>
          <h2>@{getInstagramFromLink(instagramLink)}</h2>
        </div>
      </div>
    </a>
  ) : (
    <></>
  );
};

const ProfilePageAnnouncements = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(async () => {
    setTasks(await getTasks());
  }, []);
  return (
    <div className="profile-page-announcements">
      <h2 className="profile-page-section-header">Tasks and Announcements</h2>
      {tasks == undefined || tasks.length <= 0 ? (
        <h2 style={{ color: 'var(--black)' }}>There are no announcements yet!</h2>
      ) : (
        <TaskAnnouncement tasks={tasks} onDone={onDoneTask} />
      )}
    </div>
  );
};

const ProfilePageQRCode = () => {
  const isRegistered = useSelector(registeredSelector);
  const [QRCodeString, setQRCodeString] = useState('');
  useEffect(async () => {
    setQRCodeString(await getQRCodeString());
  }, []);
  if (!isRegistered) {
    return <></>;
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
  let days = getDaysFroshSchedule();
  let buttonList = days.map((item) => {
    return { name: item };
  });
  let scheduleData = getFroshScheduleData();
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
  if (count >= scheduleData.length) {
    count = 0;
  }
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(0);
  return (
    <div className="profile-page-schedule">
      <h2 className="profile-page-section-header profile-page-section-header-schedule">Schedule</h2>
      <ButtonSelector
        buttonList={buttonList}
        activeIndex={selectedDayIndex}
        setActiveIndex={(index) => {
          setSelectedDayIndex(index);
          setCloseAll(!closeAll);
        }}
        style={{ maxWidth: '250px', marginTop: '0px', marginBottom: '10px', padding: '11px 15px' }}
      />
      <div className="profile-page-schedule-accordions">
        {scheduleData[selectedDayIndex].events.map((scheduleDateObj, index) => {
          return (
            <ProfilePageAccordionWrapper
              key={scheduleDateObj.time + index}
              closeAll={closeAll}
              scheduleDateObj={scheduleDateObj}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProfilePageAccordionWrapper = ({ scheduleDateObj, index, closeAll }) => {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  const meridian = hour > 12 ? 'PM' : 'AM';
  hour = hour > 12 ? hour - 12 : hour;

  let scheduleTime = scheduleDateObj.time;
  const hourScheduleTime = scheduleTime.split(':')[0];
  const meridianScheduleTime = scheduleTime.split(' ')[1];

  const [isOpen, setIsOpen] = useState(
    hour === hourScheduleTime && meridian === meridianScheduleTime,
  );

  useEffect(() => {
    setIsOpen(hour === hourScheduleTime && meridian === meridianScheduleTime);
  }, [closeAll]);
  let accordionHeader = (
    <div className="profile-page-accordion-header">
      <h3>{scheduleDateObj.name}</h3>
      <h4>{scheduleDateObj.time}</h4>
    </div>
  );
  let accordionContent = (
    <div className="profile-page-accordion-content">
      <p>{scheduleDateObj.description}</p>
    </div>
  );
  return (
    <div
      className="profile-page-accordion-container"
      style={scheduleDateObj.description === undefined ? { pointerEvents: 'none' } : {}}
    >
      <SingleAccordion
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={accordionHeader}
        className={`profile-page-schedule-accordion ${`profile-schedule-background-${scheduleDateObj.Color}`}`}
        canOpen={scheduleDateObj.description !== undefined}
      >
        {accordionContent}
      </SingleAccordion>
    </div>
  );
};

ProfilePageAccordionWrapper.propTypes = {
  scheduleDateObj: PropTypes.object,
  index: PropTypes.number,
  closeAll: PropTypes.bool,
};

export { PageProfile, ProfilePageHeader };
