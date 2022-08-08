import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../state/user/userSlice';
import { getUserInfo } from '../state/user/saga';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorizedPage = ({ children, authScopes = [], leaderOnly }) => {
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
  }, [user]);

  useEffect(() => {
    authScopes.forEach((auth) => {
      console.log('Checking auth scopes');
      if (user && !user?.authScopes?.approved?.includes(auth)) {
        navigate('/');
      }
    });
  }, [user]);

  useEffect(() => {
    if (loggedIn && leaderOnly) {
      if (!user?.userType === 'leadur' || !user?.approved) {
        navigate('/');
      }
    }
  }, [user]);

  return <>{loggedIn && children}</>;
};

AuthorizedPage.propTypes = {
  children: PropTypes.node.isRequired,
  authScopes: PropTypes.array,
  leaderOnly: PropTypes.bool,
};

export default AuthorizedPage;
