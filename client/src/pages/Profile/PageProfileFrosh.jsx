import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { TaskAnnouncement } from '../../components/task/TaskAnnouncement/TaskAnnouncement';
import { QRNormal } from 'react-qrbtf';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import EditIconDark from '../../assets/misc/edit-icon-dark.svg';
import EditIcon from '../../assets/misc/edit-icon.svg';
import { getScuntTeamObjFromTeamNumber } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Link } from 'react-router-dom';
import { instagramAccounts } from '../../util/instagramAccounts';
import InstagramIcon from '../../assets/social/instagram-brands.svg';
// import NitelifeIcon from '../../assets/misc/nitelife.png';
import ScuntIcon from '../../assets/misc/magnifier.png';
import OlympiksIcon from '../../assets/misc/torch.png';
import RetreatImg from '../../assets/profile/retreat-image.jpg';
import RetreatImg2 from '../../assets/profile/retreat-image2.jpg';
import ScuntImg from '../../assets/scunt/banner6.jpg';
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
import { ProfilePageFroshScuntTeamsSelection } from '../../components/profile/scunt/ProfilePageFroshScuntTeamsSelection/ProfilePageFroshScuntTeamsSelection';
import { getScuntTeams } from '../../state/scuntTeams/saga';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { ScheduleComponent } from '../../components/schedule/ScheduleHome/ScheduleHome';
// import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';
import AlphaIcon from '../../assets/profile/letters/Alpha.svg';
import BetaIcon from '../../assets/profile/letters/Beta.svg';
import ChiIcon from '../../assets/profile/letters/Chi.svg';
import DeltaIcon from '../../assets/profile/letters/Delta.svg';
import GammaIcon from '../../assets/profile/letters/Gamma.svg';
import IotaIcon from '../../assets/profile/letters/Iota.svg';
import KappaIcon from '../../assets/profile/letters/Kappa.svg';
import LambdaIcon from '../../assets/profile/letters/Lambda.svg';
import NuIcon from '../../assets/profile/letters/Nu.svg';
import OmegaIcon from '../../assets/profile/letters/Omega.svg';
import OmicronIcon from '../../assets/profile/letters/Omicron.svg';
import PhiIcon from '../../assets/profile/letters/Phi.svg';
import PiIcon from '../../assets/profile/letters/Pi.svg';
import PsiIcon from '../../assets/profile/letters/Psi.svg';
import RhoIcon from '../../assets/profile/letters/Rho.svg';
import SigmaIcon from '../../assets/profile/letters/Sigma.svg';
import TauIcon from '../../assets/profile/letters/Tau.svg';
import ThetaIcon from '../../assets/profile/letters/Theta.svg';
import UpsilonIcon from '../../assets/profile/letters/Upsilon.svg';
import ZetaIcon from '../../assets/profile/letters/Zeta.svg';

const froshGroupImages = {
  Alpha: AlphaIcon,
  Beta: BetaIcon,
  Chi: ChiIcon,
  Delta: DeltaIcon,
  Gamma: GammaIcon,
  Iota: IotaIcon,
  Kappa: KappaIcon,
  Lambda: LambdaIcon,
  Nu: NuIcon,
  Omega: OmegaIcon,
  Omicron: OmicronIcon,
  Phi: PhiIcon,
  Pi: PiIcon,
  Psi: PsiIcon,
  Rho: RhoIcon,
  Sigma: SigmaIcon,
  Tau: TauIcon,
  Theta: ThetaIcon,
  Upsilon: UpsilonIcon,
  Zeta: ZetaIcon,
};

const PageProfileFrosh = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.attendingScunt) {
      dispatch(getScuntSettings());
      dispatch(getScuntTeams());
    }
  }, [dispatch, user]);

  return (
    <>
      <ProfilePageFroshHeader editButton={true} />

      {/* Mobile-only QR at top */}
      <div className="profile-qr-mobile mobile-only">
        <ProfilePageQRCode />
      </div>

      <div className="profile-info-row">
        <div className="profile-info-row-left">
          {!isRegistered ? (
            <div className={'profile-not-registered'}>
              <div className="profile-not-registered-text">
                <h1>You are not registered</h1>
                <p className="profile-p-text">
                  Please complete your registration in order to participate in F!rosh week events
                </p>
                {/* <h2>REGISTRATION OPENS SOON. STAY TUNED!</h2> */}
              </div>
              <Link key={'/registration'} to={'/registration'} className={'no-link-style'}>
                <ButtonRound label="Register" style={{ marginLeft: '20px' }} />
              </Link>
            </div>
          ) : null}

          <div className="profile-info-top mobile-only">
            <ProfilePageQRCode />
            {/* <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} /> not doing discord */}
            {user?.isRegistered ? <ProfilePageMobileTeam /> : null}
            {user?.attendingScunt ? <ProfilePageScuntTeam /> : null}
            {/* <ProfilePageFroshScuntTeamsSelection /> */}
          </div>

          {/* {user?.attendingScunt === true ? <ProfilePageFroshScuntMessage /> : null} */}
          <ProfilePageRetreat />

          {/* <ProfilePageScuntMessage /> */}
          {/* {isRegistered ? <ProfilePageFroshOlympiks /> : null} */}
          {/* <ProfilePageNitelife /> */}
          <ProfilePageInstagrams />
          <ProfilePageAnnouncements />
          <ProfilePageSchedule />

          <div className="profile-info-bottom mobile-only">
            <ProfilePageResources froshObject={isRegistered ? user : null} />
          </div>
        </div>

        <div className="profile-info-row-right desktop-only">
          <ProfilePageQRCode />
          {/* <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} /> not doing discord */}
          {user?.attendingScunt ? <ProfilePageScuntTeam /> : null}
          {/* <ProfilePageFroshScuntTeamsSelection /> */}
          <ProfilePageResources froshObject={isRegistered ? user : null} />
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

  if (remainingTickets <= 0 && !isRetreat) {
    return null;
  }
  return (
    <Link to={'/frosh-retreat'} className="no-link-style">
      <div className="retreat-profile-container">
        {isRetreat ? (
          <div className="retreat-ad">
            <div className="retreat-ad-sub">
              <div className="retreat-container-text">
                <h2>Thank you for purchasing a F!rosh Retreat Ticket!</h2>
                <p>
                  We will reach out with more information soon. Keep an eye on your email! Please
                  bring a signed copy of the waiver to retreat.
                </p>
              </div>
            </div>
            <img className="retreat-image" src={RetreatImg2} alt="Retreat image" />
          </div>
        ) : (
          // <div className="retreat-registered">
          //   <h2>Thank you for purchasing a F!rosh Retreat Ticket!</h2>
          //   <p>
          //     We will reach out with more information soon. Keep an eye on your email! Please bring
          //     a signed copy of the waiver to retreat.
          //   </p>
          // </div>
          <div className="retreat-ad">
            <div className="retreat-ad-sub">
              <div className="retreat-container-text">
                <h2>Click here to buy your ticket to F!rosh Retreat!</h2>
                <p>
                  There are a limited number of tickets, so get yours before it&apos;s too late!{' '}
                </p>
              </div>
            </div>
            <img className="retreat-image" src={RetreatImg} alt="Retreat image" />
          </div>
        )}
      </div>
    </Link>
  );
};

const ProfilePageFroshOlympiks = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Link to="/frosh-olympiks">
      <div className="frosh-instagram-container">
        <img
          src={OlympiksIcon}
          alt="F!rosh Olympik"
          style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
        />
        <div>
          <h2>F!ROSH OLYMPIKS</h2>
          <p>Find more information and sign up for F!rosh Olympiks here!</p>
        </div>
      </div>
    </Link>
  );
};

const ProfilePageFroshScuntMessage = () => {
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { darkMode } = useContext(DarkModeContext);

  if (!isRegistered || !scuntSettings) {
    return null;
  }

  return (
    <Link to="/skule-hunt">
      <div className="frosh-instagram-container">
        <img
          src={ScuntIcon}
          alt="Skule™ Hunt"
          style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
        />
        <div>
          <h2>SKULE™ HUNT</h2>
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

  const getFroshGroupImage = (letter) => {
    return froshGroupImages[letter] || null;
  };

  console.log('ProfilePageFroshHeader user:', user);
  console.log('ProfilePageFroshHeader isRegistered:', isRegistered);

  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-info-wrap">
          <div className="profile-page-header-left">
            <div className="profile-class-circlebg desktop-only">
              <div className="profile-page-header-class desktop-only">
                <p className="class-of-p">Class of</p>
                <h2>{froshYear}</h2>
              </div>
            </div>
            <div className="profile-page-header-info">
              <div className="profile-name-edit-wrapper">
                <>
                  {user?.preferredName === '' || !user?.preferredName ? (
                    <>
                      <b>{user?.firstName}</b>
                    </>
                  ) : (
                    <b>{user?.preferredName}</b>
                  )}
                </>
                {editButton !== false ? (
                  // {editButton !== false && isRegistered ? (
                  <Link
                    to={isRegistered ? '/profile-edit' : '/profile-edit-unregistered'}
                    className={'profile-edit-icon-link no-link-style'}
                  >
                    <img
                      src={darkMode ? EditIconDark : EditIcon}
                      alt={'edit'}
                      className={'profile-edit-icon no-link-style'}
                    />
                  </Link>
                ) : // <Link to={'/profile-edit'} className={'profile-edit-icon-link no-link-style'}>
                //   <img src={EditIcon} alt={'edit'} className={'profile-edit-icon'} />
                // </Link>
                null}
              </div>
              {user?.discipline && <p>{`Incoming ${user['discipline']} Engineering student`}</p>}
              <p>
                <u>{user?.email}</u>
              </p>
            </div>
          </div>
          <div className="profile-page-header-group desktop-only">
            {isRegistered ? (
              <>
                <img
                  src={getFroshGroupImage(user?.froshGroup)}
                  alt={`${user?.froshGroup}`}
                  className="frosh-group-icon-image"
                />
                <p>{user?.froshGroup}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* <img
        src={darkMode ? WaveReverseFlipDarkMode : WaveReverseFlip}
        className="wave-image home-page-bottom-wave-image"
      /> */}
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
        <img src={InstagramIcon} alt="Instagram" className="desktop-only" />
        <div className="instagram-text">
          <p>Go follow your F!rosh group and meet your Leedurs!</p>
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
      <h2 className="profile-page-section-header">ANNOUNCEMENTS</h2>
      {!user?.canEmail ? (
        <Link
          key={'/resubscribe'}
          to={'/resubscribe'}
          // style={{ textDecoration: 'none' }}
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
    <div
      className="profile-page-qr-code profile-page-side-section"
      style={{
        border: '2px solid var(--neutral-secondary)',
        borderRadius: '25px',
        padding: '16px',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.10)',
      }}
    >
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
      <p style={{ color: 'var(--monster)', marginTop: '-5px', marginBottom: '20px' }}>
        Your Sign-in QR Code
      </p>
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
      <h3>YOUR SKULE™ HUNT TEAM:</h3>
      <h2>
        <b>{scuntTeam ? scuntTeam.name : null}</b>
      </h2>
    </div>
  );
};

export const ProfilePageMobileTeam = () => {
  const isRegistered = useSelector(registeredSelector);
  const { user } = useSelector(userSelector);

  if (!isRegistered) return null;
  return (
    <div className="profile-page-frosh-group profile-page-side-section">
      <h3>YOUR F!ROSH GROUP:</h3>
      <h1>{user?.froshGroup ? user.froshGroupIcon : null}</h1>
      <h2>
        <b>{user?.froshGroup ? user.froshGroup : null}</b>
      </h2>
    </div>
  );
};

export const ProfilePageScuntMessage = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <Link to="/skule-hunt" style={{ background: 'none' }}>
      {/* <div className="frosh-instagram-container">
        <img src={ScuntIcon} alt="Scunt" style={{ filter: darkMode ? 'invert(1)' : 'unset' }} />
        <div>
          <h2>SKULE™ HUNT!</h2>
          <p>Find more information about the Hunt by clicking here!</p>
        </div>
      </div> */}
      <div className="hunt-profile-container">
        <div className="hunt-ad">
          <div className="hunt-ad-sub">
            <div className="hunt-container-text">
              <h2>SKULE™ HUNT!</h2>
              <p>
                Come participate in the most iconic event that is part of F!rosh Week! Find out more
                information about the Hunt by clicking here!
              </p>
            </div>
          </div>
          <img className="hunt-image" src={ScuntImg} alt="Hunt image" />
        </div>
      </div>
    </Link>
  );
};

export { PageProfileFrosh, ProfilePageFroshHeader };
