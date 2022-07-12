import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector } from '../pages/userSlice';
import { getUserInfo } from '../pages/Login/saga';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthorizedPage = ({ children }) => {
  const loggedIn = useSelector(loggedInSelector);
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
    console.log(`Logged in: ${loggedIn}`);
  }, [loggedIn]);

  return <>{loggedIn && children}</>;
};

AuthorizedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthorizedPage;
