import React, { useEffect, useState } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import './CreateAnnounce.scss';
import { Button } from '../../components/button/Button/Button';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

const CreateAnnounce = () => {
  return (
    <div className="sign-up-container1">
      <h3>Send an Announcement</h3>
      <div className="full-width-input">
        <TextInput
          label="Announcement Name"
          isRequiredInput
          placeholder={'Announcement #1'}
          onChange={(value) => {}}
          localStorageKey={'announcement-name'}
        />
      </div>
      <div className="full-width-input">
        <TextInput
          label="Description"
          placeholder={'Description'}
          onChange={(value) => {}}
          localStorageKey={'announcement-description'}
        />
      </div>

      <div style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
        <Checkboxes
          values={['Also Send As Email']}
          onSelected={(value, index, state, selectedIndices) => {
            //   accountObj['leadur'] = state;
          }}
        />
      </div>

      <div
        className="sign-up-button"
        onMouseOver={() => {
          //   checkErrors(true);
        }}
      >
        <Button
          label="Send Announcement"
          style={{ margin: 0 }}
          onClick={async () => {
            // const anyErrors = checkErrors(true);
            // if (anyErrors === false) {
            //   submitForm();
            // }
          }}
        />
      </div>
    </div>
  );
};

export { CreateAnnounce };
