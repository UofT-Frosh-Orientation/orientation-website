import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { scuntSettingsSelector } from '../../../../state/scuntSettings/scuntSettingsSlice';
import { registeredSelector, userSelector } from '../../../../state/user/userSlice';
import { SnackbarContext } from '../../../../util/SnackbarProvider';
import { ButtonOutlined } from '../../../button/ButtonOutlined/ButtonOutlined';
import './ProfilePageScuntToken.scss';
import { getScuntTeamObjFromTeamNumber } from '../../../../pages/ScuntJudgeForm/ScuntJudgeForm';
import { scuntDiscord } from '../../../../util/scunt-constants';
import { scuntTeamsSelector } from '../../../../state/scuntTeams/scuntTeamsSlice';

// export const ProfilePageScuntToken = () => {
//   const { scuntSettings } = useSelector(scuntSettingsSelector);
//   const { user } = useSelector(userSelector);
//   const { scuntTeams } = useSelector(scuntTeamsSelector);
//   const isRegistered = useSelector(registeredSelector);
//   const { setSnackbar } = useContext(SnackbarContext);
//   const [showToken, setShowToken] = useState(false);
//   if (!isRegistered || (scuntSettings && !scuntSettings?.revealTeams)) {
//     return null;
//   }

//   if (!user?.attendingScunt && user?.userType !== 'leadur') {
//     return (
//       <div className="profile-page-scunt-token profile-page-side-section">
//         <p>
//           <b>Looking for your Scunt login Token?</b>
//         </p>
//         <p>You have chosen not to participate in Scunt.</p>
//         <div style={{ height: '30px' }} />
//       </div>
//     );
//   }
//   return (
//     <div className="profile-page-scunt-token profile-page-side-section">
//       <h2>{getScuntTeamObjFromTeamNumber(user?.scuntTeam, scuntTeams)?.name}</h2>
//       <i>
//         <h4>Team {user?.scuntTeam ? user?.scuntTeam.toString() : '‽'}</h4>
//       </i>
//       <h3
//         style={{ filter: showToken ? '' : 'blur(10px)' }}
//         onClick={() => {
//           navigator.clipboard.writeText(code);
//           setSnackbar('Copied to clipboard');
//         }}
//       >
//         {code}
//       </h3>
//       <p>Scunt Login Token</p>
//       <p style={{ fontSize: '13px' }}>
//         Use this token to login to the{' '}
//         <a href={scuntDiscord} target="_blank" rel="noreferrer">
//           Scunt Discord
//         </a>
//       </p>
//       <ButtonOutlined
//         isSecondary={showToken}
//         label={showToken ? 'Hide' : 'Show'}
//         onClick={() => {
//           setShowToken(!showToken);
//         }}
//       />
//     </div>
//   );
// };

// ProfilePageScuntToken.propTypes = {
//   scuntTeams: PropTypes.array,
//   scuntTeamObjs: PropTypes.array,
// };
