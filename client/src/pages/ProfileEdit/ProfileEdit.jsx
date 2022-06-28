import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './ProfileEdit.scss';
import { ProfilePageHeader } from '../Profile/Profile';
import { fields, terms } from '../Registration/RegistrationFields';
import { PageRegistrationForm } from '../Registration/RegistrationForm';
import { getSelectedFroshValues, submitEdits } from './functions';

const PageProfileEdit = () => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader leader={false} editButton={false} />
      <div className="edit-form-container">
        <PageRegistrationForm
          editFieldsPage={true}
          initialValues={getSelectedFroshValues()}
          onEditSubmit={(froshObject) => {
            submitEdits(froshObject);
          }}
        />
      </div>
    </>
  );
};

export { PageProfileEdit };
