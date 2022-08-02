import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../state/user/userSlice';
import { getUserInfo } from '../state/user/saga';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorizedPage = ({ children, authScopes = [] }) => {
  const loggedIn = useSelector(loggedInSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Logged in', loggedIn);
    if (!loggedIn) {
      console.log('Not logged in');
      dispatch(getUserInfo(navigate));
    }
  }, []);

  useEffect(() => {
    authScopes.forEach((auth) => {
      if (!user?.authScopes?.approved?.includes(auth)) {
        navigate('/');
      }
    });
  }, [user]);

  return <>{loggedIn && children}</>;
};

AuthorizedPage.propTypes = {
  children: PropTypes.node.isRequired,
  authScopes: PropTypes.array,
};

export default AuthorizedPage;
