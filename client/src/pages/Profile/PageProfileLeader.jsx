import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import EditIconDark from '../../assets/misc/edit-icon-dark.svg';
import EditIcon from '../../assets/misc/edit-icon.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
// import { scuntDiscord } from '../../util/scunt-constants';
import ScuntIcon from '../../assets/misc/magnifier.png';
import { ProfilePageLeaderPermissionDashboardLinks } from '../../components/profile/leedur/PermissionDashboardLinks/ProfilePageLeaderPermissionDashboardLinks';
import { ProfilePageQRScanner } from '../../components/profile/leedur/ProfilePageQRScanner/ProfilePageQRScanner';
import { ProfilePageSchedule } from '../../components/profile/ProfilePageSchedule/ProfilePageSchedule';
import { ProfilePageResources } from '../../components/profile/ProfilePageResources/ProfilePageResources';
import { changeScuntTeam, getScuntTeams } from '../../state/scuntTeams/saga';
import { getScuntSettings } from '../../state/scuntSettings/saga';
import scuntLogo from '../../assets/scuntlogo/SkuleHuntLogo2t5.png';
import ScuntImg from '../../assets/scunt/banner7.jpg';
// import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';

const PageProfileLeader = () => {
  const { user } = useSelector(userSelector);
  const leaderApproved = user?.approved === true;
  const qrCodeLeader =
    user?.authScopes?.approved.includes('scanner:registration') ||
    user?.authScopes?.approved.includes('scanner:kits') ||
    user?.authScopes?.approved.includes('scanner:food');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntTeams());
    dispatch(getScuntSettings());
  }, [dispatch]);

  return (
    <>
      <ProfilePageLeaderHeader />
      <div className="profile-info-row">
        <div className="profile-info-row-left">
          {leaderApproved === false ? (
            <div className="profile-not-registered-text">
              <h1 className="leedur-not-approved">Your Leedur account is not approved!</h1>
              <p className="profile-p-text">
                Please contact VCM or Webmasters to get your account approved.
              </p>
              {/* <h2>REGISTRATION OPENS SOON. STAY TUNED!</h2> */}
            </div>
          ) : null}
          <ProfilePageLeaderPermissionDashboardLinks />
          <div style={{ marginTop: '20px' }} />
          <ProfilePageLeaderScuntMessage />
          <div style={{ marginTop: '-20px' }} />
          <ProfilePageSchedule />
        </div>

        <div className="profile-info-row-right">
          {qrCodeLeader === true ? (
            <ProfilePageQRScanner scopes={user?.authScopes?.approved} />
          ) : null}
          {/* <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} /> not doing discord */}
          <ProfilePageResources />
          {/* <ProfilePageScuntTeamSelectionLeader /> */}
        </div>
      </div>
    </>
  );
};

const ProfilePageScuntTeamSelectionLeader = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [teamNumber, setTeamNumber] = useState();
  const { user } = useSelector(userSelector);
  const { scuntTeams } = useSelector(scuntTeamsSelector);

  const dispatch = useDispatch();

  if (!scuntTeams?.length) return null;

  return (
    <div className="profile-page-side-section" style={{ marginTop: '20px', textAlign: 'center' }}>
      <div style={{ height: '10px' }} />
      <h2>Scunt Team</h2>

      <RadioButtons
        initialSelectedIndex={user?.scuntTeam - 1}
        values={scuntTeams.map((team) => team.name)}
        onSelected={(value) => {
          const [team] = scuntTeams.filter((team) => team.name === value);
          setTeamNumber(team?.number);
        }}
      />
      <Button
        label={'Change Scunt Team'}
        onClick={() => {
          dispatch(changeScuntTeam({ setSnackbar, teamNumber }));
        }}
      />
    </div>
  );
};

export const ProfilePageLeaderScuntMessage = () => {
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

const ProfilePageLeaderHeader = () => {
  const { user } = useSelector(userSelector);
  const leaderApproved = user?.approved === true;

  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const currentYear = new Date().getFullYear();
  const firstDigitL = currentYear.toString().slice(-2, -1);
  const lastDigitL = currentYear.toString().slice(-1);
  let leedurYear = `${firstDigitL}T${lastDigitL}`;

  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          {/*<h1>ℒ</h1>
          <p>{'(Leedur)'}</p>*/}
        </div>
        <div className="profile-page-header-info-wrap request-perms">
          <div className="profile-page-header-left">
            <div className="profile-class-circlebg desktop-only">
              <div className="profile-page-header-class desktop-only">
                <p className="class-of-p">F!rosh</p>
                <h2>{leedurYear}</h2>
              </div>
            </div>

            <div className="profile-page-header-info">
              <div className="profile-name-edit-wrapper">
                <p className="profile-page-name-title">
                  {user?.preferredName === '' || !user?.preferredName ? (
                    <>
                      <b>{user?.firstName}</b>
                    </>
                  ) : (
                    <b>{user?.preferredName}</b>
                  )}
                </p>
                {/* <Link to={'/profile-edit'} className={'profile-edit-icon-link no-link-style'}>
                  <img
                    src={darkMode ? EditIconDark : EditIcon}
                    alt={'edit'}
                    className={'profile-edit-icon no-link-style'}
                  />
                </Link> */}
              </div>
              <p>
                <u>{user?.email}</u>
              </p>
            </div>
          </div>
          <div className="profile-page-header-right">
            {leaderApproved ? (
              <Link
                to={'/permission-request'}
                style={{ textDecoration: 'none' }}
                className={'no-link-style'}
              >
                <ButtonRound label="Request Perms" style={{ margin: '0' }} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export { PageProfileLeader, ProfilePageLeaderHeader };
