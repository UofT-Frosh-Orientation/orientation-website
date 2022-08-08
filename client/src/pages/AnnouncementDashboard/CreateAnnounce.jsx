import React, { useContext, useState } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import './CreateAnnounce.scss';

import { useDispatch } from 'react-redux';
import { createAnnouncements } from '../../state/announcements/saga';
import { SnackbarContext } from '../../util/SnackbarProvider';

const CreateAnnounce = () => {
  const [announcementData, setAnnouncementData] = useState({});
  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  return (
    <div className="sign-up-container1">
      <h3>Send an Announcement</h3>
      <div className="full-width-input">
        <TextInput
          label="Announcement Name"
          isRequiredInput
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

      <div style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
        <Checkboxes
          values={['Also Send As Email']}
          onSelected={(value, index, state, selectedIndices) => {
            announcementData['sendAsEmail'] = state;
          }}
        />
      </div>

      <div className="sign-up-button">
        <Button
          label="Send Announcement"
          style={{ margin: 0 }}
          onClick={async () => {
            dispatch(createAnnouncements({ setSnackbar, announcementData }));
          }}
        />
      </div>
    </div>
  );
};

export { CreateAnnounce };
