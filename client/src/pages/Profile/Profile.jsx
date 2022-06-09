import React from 'react';
import PropTypes from 'prop-types';
import { getInformation } from './functions';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';

const PageProfile = () => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader />
    </>
  );
};

const ProfilePageHeader = () => {
  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          <h1>λ</h1>
          <p>Lambda</p>
        </div>
        <div className="profile-page-header-info-wrap">
          <div className="profile-page-header-info">
            <p className="profile-page-name-title">
              <b>James</b> Kokoska
            </p>
            <p>Incoming Computer Engineering student</p>
            <p>
              <u>
                <b>test.email</b>@mail.utoronto.com
              </u>
            </p>
          </div>
          <div className="profile-page-header-class">
            <p>Class of</p>
            <h2>2T6</h2>
          </div>
        </div>
      </div>
      <img src={WaveReverseFlip} className="wave-image home-page-bottom-wave-image" />
    </>
  );
};

export { PageProfile };
