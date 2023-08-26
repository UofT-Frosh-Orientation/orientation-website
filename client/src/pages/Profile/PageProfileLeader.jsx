import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { Button } from '../../components/button/Button/Button';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import EditIcon from '../../assets/misc/pen-solid.svg';
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
// import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';

const PageProfileLeader = () => {
  const { user } = useSelector(userSelector);
  const qrCodeLeader =
    user?.authScopes?.approved.includes('scanner:registration') ||
    user?.authScopes?.approved.includes('scanner:kits');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScuntTeams());
    dispatch(getScuntSettings());
  }, [dispatch]);

  return (
    <>
      <ProfilePageLeaderHeader />
      <div className="profile-info-row">
        <div className="profile-info-row-right">
          <ProfilePageLeaderPermissionDashboardLinks />
          <div style={{ marginTop: '20px' }} />
          <ProfilePageLeaderScuntMessage />
          <div style={{ marginTop: '-20px' }} />
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {qrCodeLeader === true ? (
            <ProfilePageQRScanner scopes={user?.authScopes?.approved} />
          ) : null}
          {/* <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} /> not doing discord */}
          <ProfilePageResources />
          <ProfilePageScuntTeamSelectionLeader />
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
          setTeamNumber(team.number);
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
          <h1>ℒ</h1>
          <p>{'(Leedur)'}</p>
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
            <p>
              <u>{user?.email}</u>
            </p>
          </div>
          <div className="profile-page-header-class desktop-only">
            <h2>{leedurYear}</h2>
          </div>
          <Link to={'/profile-edit'} className={'profile-edit-icon-link no-link-style'}>
            <img src={EditIcon} alt={'edit'} className={'profile-edit-icon'} />
          </Link>
        </div>
      </div>
      <img
        src={darkMode ? WaveReverseFlipDarkMode : WaveReverseFlip}
        className="wave-image home-page-bottom-wave-image"
      />
      {leaderApproved === false ? (
        <div className={'profile-not-registered'}>
          <h1>Your Leedur Account is not Approved!</h1>
          <h2>Please contact a VC to get your account approved.</h2>
        </div>
      ) : null}
    </>
  );
};

export { PageProfileLeader, ProfilePageLeaderHeader };
