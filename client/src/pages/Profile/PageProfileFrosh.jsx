import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { TaskAnnouncement } from '../../components/task/TaskAnnouncement/TaskAnnouncement';
import { QRNormal } from 'react-qrbtf';
import { Button } from '../../components/button/Button/Button';
import EditIcon from '../../assets/misc/pen-solid.svg';
import CampingIcon from '../../assets/misc/camping-tent.png';
// import { getScuntTeamObjFromTeamNumber } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Link } from 'react-router-dom';
import { instagramAccounts } from '../../util/instagramAccounts';
import InstagramIcon from '../../assets/social/instagram-brands.svg';
// import NitelifeIcon from '../../assets/misc/nitelife.png';
import ScuntIcon from '../../assets/misc/magnifier.png';
import { useDispatch, useSelector } from 'react-redux';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { announcementsSelector } from '../../state/announcements/announcementsSlice';
import {
  getAnnouncements,
  completeAnnouncements,
  getCompletedAnnouncements,
} from '../../state/announcements/saga';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { completedAnnouncementsSelector } from '../../state/announcements/announcementsSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import { getRemainingTickets } from '../FroshRetreat/FroshRetreat';
import { ProfilePageSchedule } from '../../components/profile/ProfilePageSchedule/ProfilePageSchedule';
import { ProfilePageResources } from '../../components/profile/ProfilePageResources/ProfilePageResources';
// import { ProfilePageFroshScuntTeamsSelection } from '../../components/profile/scunt/ProfilePageFroshScuntTeamsSelection/ProfilePageFroshScuntTeamsSelection';
import { getScuntTeams } from '../../state/scuntTeams/saga';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
// import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';

const PageProfileFrosh = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
    dispatch(getScuntTeams());
  }, [dispatch]);

  return (
    <>
      <ProfilePageFroshHeader editButton={true} />
      <div className="profile-info-row">
        <div className="profile-info-row-right">
          <ProfilePageFroshScuntMessage />
          {isRegistered ? <ProfilePageRetreat /> : null}
          {/* <ProfilePageNitelife /> */}
          <ProfilePageInstagrams />
          <ProfilePageAnnouncements />
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfilePageQRCode />
          {/* <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} /> not doing discord */}
          <ProfilePageScuntTeam />
          {/* <ProfilePageFroshScuntTeamsSelection /> */}
          <ProfilePageResources froshObject={user?.isRegistered ? user : null} />
        </div>
      </div>
    </>
  );
};

const ProfilePageRetreat = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const isRetreat = user?.isRetreat === true;
  const { setSnackbar } = useContext(SnackbarContext);
  const [remainingTickets, setRemainingTickets] = useState();

  const remainingTicketsSetter = async () => {
    setRemainingTickets(await getRemainingTickets(setSnackbar));
  };

  useEffect(() => {
    remainingTicketsSetter();
  }, []);

  if (!isRegistered || (remainingTickets <= 0 && !isRetreat)) {
    return null;
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
                <Button label={'Buy Now!'} isSecondary style={{ margin: 0, marginLeft: '10px' }} />
              </div>
            </div>
            <div className="mobile-only" style={{ marginTop: '10px', width: '100%' }}>
              <Button
                label={'Buy Now!'}
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

const ProfilePageFroshScuntMessage = () => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode } = useContext(DarkModeContext);

  if (!isRegistered || !scuntSettings || !scuntSettings?.revealTeams) {
    return null;
  }

  return (
    <Link to="/scunt">
      <div className="frosh-instagram-container">
        <img src={ScuntIcon} alt="Scunt" style={{ filter: darkMode ? 'invert(1)' : 'unset' }} />
        <div>
          <h2>SkavENGer Hunt!</h2>
          <p>Find more information about The Hunt by clicking here!</p>
        </div>
      </div>
    </Link>
  );
};

const ProfilePageFroshHeader = ({ editButton }) => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode } = useContext(DarkModeContext);
  const currentYear = new Date().getFullYear();
  const gradYear = currentYear + 4;
  const firstDigitF = gradYear.toString().slice(-2, -1);
  const lastDigitF = gradYear.toString().slice(-1);
  let froshYear = `${firstDigitF}T${lastDigitF}`;

  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          {isRegistered ? (
            <>
              <h1>{user?.froshGroupIcon}</h1>
              <p>{user?.froshGroup}</p>
            </>
          ) : null}
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
          ) : null}
        </div>
      </div>

      <img
        src={darkMode ? WaveReverseFlipDarkMode : WaveReverseFlip}
        className="wave-image home-page-bottom-wave-image"
      />

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
      ) : null}
    </>
  );
};

ProfilePageFroshHeader.propTypes = {
  editButton: PropTypes.bool,
};

// const ProfilePageNitelife = () => {
//   const isRegistered = useSelector(registeredSelector);
//   const { darkMode } = useContext(DarkModeContext);

//   return isRegistered ? (
//     <a
//       href={'https://drive.google.com/file/d/1-C3Pq7neNUuPlIC5an4W031vWLajS1HD/view'}
//       className="no-link-style"
//       target={'_blank'}
//       rel="noreferrer"
//     >
//       <div className="frosh-instagram-container">
//         <img
//           src={NitelifeIcon}
//           alt="Nitelife"
//           style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
//         />
//         <div>
//           <h2>Nitelife Event Schedule & Map</h2>
//           <p>F!rosh Week doesn&apos;t end at 6:00! Learn more by clicking here.</p>
//         </div>
//       </div>
//     </a>
//   ) : (
//     <></>
//   );
// };

const ProfilePageInstagrams = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode } = useContext(DarkModeContext);

  const getInstagramFromLink = (link) => {
    if (link === undefined) return '';
    return link.replace('https://www.instagram.com', '').replace('/', '');
  };

  const instagramLink = instagramAccounts[user?.froshGroup];
  if (!isRegistered) return null;
  return (
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
      {!user?.canEmail ? (
        <Link
          key={'/resubscribe'}
          to={'/resubscribe'}
          style={{ textDecoration: 'none' }}
          className={'no-link-style'}
        >
          <Button label="Resubscribe To Announcements Emails" />
        </Link>
      ) : null}
      <TaskAnnouncement tasks={announcementList} onDone={onDoneTask} />
    </div>
  );
};

const ProfilePageQRCode = () => {
  const isRegistered = useSelector(registeredSelector);
  const [QRCodeString, setQRCodeString] = useState('');
  const { user } = useSelector(userSelector);

  useEffect(() => {
    setQRCodeString(user?.id);
  }, []);

  if (!isRegistered) {
    return null;
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
      <p style={{ color: 'var(--purple)' }}>Your Sign-in QR Code</p>
    </div>
  );
};

export const ProfilePageScuntTeam = () => {
  const isRegistered = useSelector(registeredSelector);
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { scuntTeams } = useSelector(scuntTeamsSelector);
  const { user } = useSelector(userSelector);
  const [scuntTeam, setScuntTeam] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntSettings());
    dispatch(getScuntTeams());
  }, [dispatch]);

  useEffect(() => {
    if (scuntTeams?.length) {
      const [team] = scuntTeams.filter((team) => {
        return team?.number === user?.scuntTeam;
      });
      setScuntTeam(team);
    }
  }, [scuntTeams]);

  if (!isRegistered || !scuntSettings || !scuntSettings?.revealTeams) return null;
  return (
    <div className="profile-page-scunt-team profile-page-side-section">
      <h3>Your Scunt Team:</h3>
      <h2>
        <b>{scuntTeam ? scuntTeam.name : null}</b>
      </h2>
    </div>
  );
};

export { PageProfileFrosh, ProfilePageFroshHeader };
