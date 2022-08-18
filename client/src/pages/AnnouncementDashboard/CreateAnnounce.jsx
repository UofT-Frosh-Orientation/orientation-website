import React, { useContext, useState } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import './CreateAnnounce.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, createAnnouncements } from '../../state/announcements/saga';
import { userSelector } from '../../state/user/userSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

const CreateAnnounce = () => {
  const [announcementData, setAnnouncementData] = useState({});
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <div className="announcement-creator">
      <h3>Send an Announcement</h3>
      <div className="full-width-input">
        <TextInput
          label="Announcement Name"
          placeholder={'Announcement #1'}
          onChange={(value) => {
            announcementData['name'] = value;
          }}
        />
      </div>
      <div className="full-width-input">
        <TextInput
          label="Description"
          placeholder={'Description'}
          onChange={(value) => {
            announcementData['description'] = value;
          }}
        />
      </div>
      {user.authScopes.approved.includes('email:send') ? (
        <div style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
          <Checkboxes
            values={['Also Send As Email']}
            onSelected={(value, index, state, selectedIndices) => {
              announcementData['sendAsEmail'] = state;
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="send-announcement-button">
        <Button
          label="Send Announcement"
          style={{ margin: 0 }}
          onClick={async () => {
            if (announcementData['name']) {
              dispatch(
                createAnnouncements({
                  setSnackbar,
                  announcementData,
                }),
              );
              dispatch(getAnnouncements());
            } else {
              setSnackbar('Please provide a name.', true);
            }
          }}
        />
      </div>
    </div>
  );
};

export { CreateAnnounce };
