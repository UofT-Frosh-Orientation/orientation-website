import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { pages } from '../../util/pages';
import { Link } from 'react-router-dom';

const Navbar = ({ onClick }) => {
  return (
    <div className="container">
      <div className="main">
        <div className="icon-logo"></div>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <Link to={page.path} key={page.path}>
              <div onClick={onClick} className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div className="underline"></div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          if (page.label === 'profile') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="icon-profile"> AA </div>
              </Link>
            );
          } else if (page.label === 'Register') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="register">{page.label}</div>
              </Link>
            );
          } else if (page.label === 'Login') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="login">{page.label}</div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  //label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  //isSecondary: PropTypes.bool,
  //isDisabled: PropTypes.bool,
  //style: PropTypes.object,
};

export { Navbar };
