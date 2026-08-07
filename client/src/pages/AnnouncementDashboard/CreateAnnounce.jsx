import React, { useContext, useState } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import './CreateAnnounce.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, createAnnouncements } from '../../state/announcements/saga';
import { userSelector } from '../../state/user/userSlice';

import { SnackbarContext } from '../../util/SnackbarProvider';

// Labels shown in the dropdown mapped to the audience values the server accepts.
// Must stay in sync with the audience enum on AnnouncementModel.
const AUDIENCE_OPTIONS = {
  Everyone: 'all',
  'All F!rosh': 'frosh',
  'F!rosh - Not Yet Registered': 'unregisteredFrosh',
  'F!rosh - Registered': 'registeredFrosh',
  Leedurs: 'leadurs',
};

const CreateAnnounce = () => {
  const [announcementData, setAnnouncementData] = useState({});
  const [clear, setClear] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  return (
    <div className="announcement-creator">
      <h3>Send an Announcement</h3>
      <div className="full-width-input">
        <TextInput
          label="Announcement Name"
          placeholder={'Maintenance Tomorrow'}
          onChange={(value) => {
            announcementData['name'] = value;
          }}
          clearText={clear}
          setClearText={setClear}
        />
      </div>
      <div className="full-width-input">
        <TextInput
          label="Description"
          placeholder={'The website will be down for maintenance tomorrow from...'}
          onChange={(value) => {
            announcementData['description'] = value;
          }}
          clearText={clear}
          setClearText={setClear}
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
          <Dropdown
            label="Email Audience"
            values={Object.keys(AUDIENCE_OPTIONS)}
            onSelect={(label) => {
              announcementData['audience'] = AUDIENCE_OPTIONS[label];
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="send-announcement-button">
        <ButtonRound
          label="Send Announcement"
          style={{ margin: 0 }}
          onClick={async () => {
            if (announcementData['name']) {
              dispatch(createAnnouncements({ setSnackbar, announcementData }));
              dispatch(getAnnouncements());
              setClear(true);
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
