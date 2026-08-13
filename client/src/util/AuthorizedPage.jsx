import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../state/user/userSlice';
import { getUserInfo } from '../state/user/saga';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorizedPage = ({ children, authScopes = [], leaderOnly }) => {
  const loggedIn = useSelector(loggedInSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loggedIn) {
      dispatch(getUserInfo(navigate));
    }
  }, [user]);

  useEffect(() => {
    authScopes.forEach((auth) => {
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

  useEffect(() => {
    if (loggedIn && !(user?.isRegistered || user?.approved)) {
      if (location.pathname === '/frosh-retreat') {
        navigate('/');
      }
    }
  }, [loggedIn, user, location.pathname, navigate]);

  return <>{loggedIn && children}</>;
};

AuthorizedPage.propTypes = {
  children: PropTypes.node.isRequired,
  authScopes: PropTypes.array,
  leaderOnly: PropTypes.bool,
};

export default AuthorizedPage;
