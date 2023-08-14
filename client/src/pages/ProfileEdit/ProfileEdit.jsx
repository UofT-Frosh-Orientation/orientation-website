import React, { lazy, Suspense } from 'react';
import './ProfileEdit.scss';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../state/user/saga';
import { useNavigate } from 'react-router-dom';

const PageRegistrationForm = lazy(() => import('../Registration/RegistrationForm'));
const ProfilePageFroshHeader = lazy(() =>
  import('../Profile/PageProfileFrosh').then((module) => ({
    default: module.ProfilePageFroshHeader,
  })),
);

const PageProfileEdit = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (newInfo) => {
    dispatch(updateUserInfo({ newInfo, navigate, isRegistered }));
  };
  if (!isRegistered) {
    navigate('/profile');
  }

  if (isRegistered) {
    return (
      <Suspense>
        <ProfilePageFroshHeader editButton={false} />
        <div className="edit-form-container">
          <PageRegistrationForm editFieldsPage={true} initialValues={user} onEditSubmit={submit} />
        </div>
      </Suspense>
    );
  } else {
    return <></>;
  }
};

export { PageProfileEdit };
