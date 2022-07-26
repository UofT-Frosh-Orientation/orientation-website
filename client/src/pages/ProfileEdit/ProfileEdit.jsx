import React from 'react';
import './ProfileEdit.scss';
import { ProfilePageHeader } from '../Profile/Profile';
import { PageRegistrationForm } from '../Registration/RegistrationForm';
import { submitEdits } from './functions';
import { registeredSelector, userSelector } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../Login/saga';
import { useNavigate } from 'react-router-dom';

const PageProfileEdit = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (newInfo) => {
    dispatch(updateUserInfo({ newInfo, navigate }));
  };
  if (!isRegistered) {
    navigate('/profile');
  }
  return (
    <>
      {isRegistered && (
        <>
          <div className="navbar-space-top" />
          <ProfilePageHeader leader={false} editButton={false} />
          <div className="edit-form-container">
            <PageRegistrationForm
              editFieldsPage={true}
              initialValues={user}
              onEditSubmit={submit}
            />
          </div>
        </>
      )}
    </>
  );
};

export { PageProfileEdit };
