import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../../../hooks/useAxios';
import { scuntSettingsSelector } from '../../../../state/scuntSettings/scuntSettingsSlice';
import { SnackbarContext } from '../../../../util/SnackbarProvider';
import { registeredSelector, userSelector } from '../../../../state/user/userSlice';
import { TextInput } from '../../../input/TextInput/TextInput';
import { Button } from '../../../button/Button/Button';
import { updateUserInfo } from '../../../../state/user/saga';
import './ProfilePageFroshScuntTeamsSelection.scss';

export const ProfilePageFroshScuntTeamsSelection = () => {
  const [teammates, setTeammates] = useState(['', '', '']);
  const [teammatesChangesMade, setTeammatesChangesMade] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const { axios } = useAxios();

  if (!isRegistered || !user?.attendingScunt || scuntSettings?.revealTeams) {
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
              try {
                let response;
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
