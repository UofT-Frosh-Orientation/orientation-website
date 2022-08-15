import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PagePaymentSuccess.scss';
import { Button } from '../../components/button/Button/Button';
import { Link } from 'react-router-dom';

export const PagePaymentSuccess = ({ title, message }) => {
  return (
    <>
      <div className="navbar-space-top"></div>
      <div className="payment-success-page">
        <h1>{title}</h1>
        <p>Payment Successful!</p>
        <h3>{message}</h3>
        <div>
          <Link to={'/profile'} className="no-link-style">
            <Button label="Profile" />
          </Link>
        </div>
      </div>
    </>
  );
};

PagePaymentSuccess.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
