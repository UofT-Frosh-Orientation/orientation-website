import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { pages } from '../../util/pages';
import { Link } from 'react-router-dom';
import froshlogo from '../../assets/social/Instagram_icon.png';

const Navbar = ({ onClick }) => {
  return (
    <div className="container">
      {/* <img className="frosh-logo" src={froshlogo} alt="F!rosh Logo"></img> */}

      {/* circle placeholder for main F!rosh icon */}
      <div className="icon-logo"></div>

      <div className="main"></div>
      {/* MAIN PAGES */}
      {pages.main.map((page) => {
        // pages.main -> array containing Home, About, FAQ objects
        // map loops through the array
        return (
          <Link to={page.path} key={page.path}>
            <div onClick={onClick} className="sub-container">
              <div className="navbar-link"> {page.label} </div>
              <div className="underline"></div>
            </div>
          </Link>
        );
        // note key is unique!
      })}

      {/* SPECIAL PAGES */}
      {pages.special.map((page) => {
        // pages.main -> array containing Home, About, FAQ objects
        // map loops through the array
        if (page.label === 'Profile') {
          return (
            <Link to={page.path} key={page.path}>
              <div className="icon-profile"> AA </div>
            </Link>
          );
        }
        // else if (page.label === 'Register') {
        //   return (
        //     <Link to={page.path} key={page.path}>
        //       {/* TODO */}
        //       <div className="icon-profile">AA</div>
        //     </Link>
        //   );
        // }
        // else if (page.label === 'Login') {
        //   return (
        //     <Link to={page.path} key={page.path}>
        //       {/* TODO */}
        //       <div className="icon-profile">AA</div>
        //     </Link>
        //   );
        // }

        // note key is unique!
      })}

      {/* <Link to={pages.special.path} key={pages.special.path}>
        <div className="icon-profile">AA</div>
      </Link> */}
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
