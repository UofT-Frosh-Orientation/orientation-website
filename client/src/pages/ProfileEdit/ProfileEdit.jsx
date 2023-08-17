import React, { lazy, Suspense, useEffect, useContext } from 'react';
import './ProfileEdit.scss';
import { PageRegistrationForm } from '../Registration/RegistrationForm';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../state/user/saga';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../util/SnackbarProvider';

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
  const { setSnackbar } = useContext(SnackbarContext);

  const submit = (newInfo) => {
    dispatch(updateUserInfo({ setSnackbar, newInfo, navigate, isRegistered }));
  };

  useEffect(() => {
    if (!isRegistered) {
      navigate('/profile');
    }
  }, [isRegistered]);

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
