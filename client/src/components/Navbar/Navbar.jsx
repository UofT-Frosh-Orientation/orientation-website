import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { pages } from '../../util/pages';
import { Link } from 'react-router-dom';
import froshlogo from '../../assets/social/Instagram_icon.png';

const Navbar = () => {
  return (
    <div className="container">
      {/* <img className="frosh-logo" src={froshlogo} alt="F!rosh Logo"></img> */}

      {/* circle placeholder for main F!rosh icon */}
      <div className="icon-logo"></div>

      {pages.main.map((page) => {
        // pages.main -> array containing Home, About, FAQ objects
        // map loops through the array
        return (
          <Link to={page.path} key={page.path}>
            <div className="navbar-link"> {page.label} </div>
          </Link>
        );
        // note key is unique!
      })}

      <div className="icon-profile">AA</div>
    </div>
  );
};

export { Navbar };
