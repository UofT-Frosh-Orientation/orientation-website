import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/button/Button/Button';
import './EmailConfirmed.scss';
import { Link } from 'react-router-dom';

const PageEmailConfirmed = () => {
  return (
    <div>
      <div className="email-confirmed-page">
        <div className="email-confirmed-container">
          <h1>Perfect!</h1>
          <h2>Your email is now confirmed. Head to the login page to get started!</h2>
          <Link to={'/login'} style={{ textDecoration: 'none' }} className={'no-link-style'}>
            <Button label="Login Page" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { PageEmailConfirmed };
