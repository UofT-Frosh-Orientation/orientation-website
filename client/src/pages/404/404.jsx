import React from 'react';
import PropTypes from 'prop-types';
import DinoBones from '../../assets/404/DinoBones.svg';
import Grass from '../../assets/404/grass.png';
import Meteor from '../../assets/404/meteor.png';
import './404.scss';

const Page404 = () => {
  return (
    <div className="error404-container">
      <div className="error404-sky" />
      <div style={{ backgroundImage: `url(${Grass})` }} className="error404-grass" />
      <img src={DinoBones} className="error404-bg-image"></img>
      <img src={Meteor} className="error404-meteor-image"></img>
      <div style={{ margin: 'auto auto' }}>
        <h1>Error 404</h1>
        <h2>Page not found</h2>
      </div>
    </div>
  );
};

export { Page404 };
