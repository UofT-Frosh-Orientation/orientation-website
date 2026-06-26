import React from 'react';
import './404.scss';
import sadLogo from '../../assets/404/sadlogo404.svg';

const Page404 = () => {
  return (
    <div className="error-404">
      <img className="error-404-logo" src={sadLogo} alt="Page not found" />
      <h1 className="error-404-title">Error 404</h1>
      <p className="error-404-subtitle">Page not found</p>
    </div>
  );
};

export { Page404 };
