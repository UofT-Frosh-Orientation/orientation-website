import React, { useContext, useEffect, useState } from 'react';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import WaveReverseFlipDarkMode from '../../assets/darkmode/misc/wave-reverse-flip.png';
import { Button } from '../../components/button/Button/Button';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import EditIcon from '../../assets/misc/pen-solid.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import PropTypes from 'prop-types';
import {
  getScuntTeamObjFromTeamName,
  getScuntTeamObjFromTeamNumber,
} from '../ScuntJudgeForm/ScuntJudgeForm';
import ScuntIcon from '../../assets/misc/magnifier.png';
import useAxios from '../../hooks/useAxios';
import { getScuntTeams, changeScuntTeam } from '../../state/scuntTeams/saga';
import { ProfilePageLeaderPermissionDashboardLinks } from '../../components/profile/leedur/PermissionDashboardLinks/ProfilePageLeaderPermissionDashboardLinks';
import { ProfilePageQRScanner } from '../../components/profile/leedur/ProfilePageQRScanner/ProfilePageQRScanner';
import { ProfilePageSchedule } from '../../components/profile/ProfilePageSchedule/ProfilePageSchedule';
import { ProfilePageResources } from '../../components/profile/ProfilePageResources/ProfilePageResources';
import { ProfilePageScuntToken } from '../../components/profile/scunt/ProfilePageScuntToken/ProfilePageScuntToken';
import { scuntTeamsSelector } from '../../state/scuntTeams/scuntTeamsSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
const { axios } = useAxios();

const PageProfileLeader = () => {
  const { user } = useSelector(userSelector);
  const qrCodeLeader =
    user?.authScopes?.approved.includes('scanner:registration') ||
    user?.authScopes?.approved.includes('scanner:kits');
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
      setScuntTeams(['Error loading teams']);
    }
  };

  useEffect(() => {
    getScuntTeams();
  }, []);

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
          {/* <ProfilePageQRCode /> */}
          {qrCodeLeader === true ? (
            <>
              <ProfilePageQRScanner />
            </>
          ) : (
            <></>
          )}
          <ProfilePageScuntToken scuntTeamObjs={scuntTeamObjs} scuntTeams={scuntTeams} />
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

ProfilePageScuntToken.propTypes = {
  scuntTeams: PropTypes.array,
  scuntTeamObjs: PropTypes.array,
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
            {user?.discipline && <p>{`Incoming ${user['discipline']} Engineering student`}</p>}
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

export { PageProfileLeader, ProfilePageLeaderHeader };
