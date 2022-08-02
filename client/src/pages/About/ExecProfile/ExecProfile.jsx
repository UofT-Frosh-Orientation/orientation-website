import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './ExecProfile.scss';

import wave from '../../../assets/about/wave-about.svg';
import { useState } from 'react';

const ExecProfile = ({
  image,
  name,
  role,
  discipline,
  roleDescription,
  description,
  favPart,
  exec,
  quote,
  subcom,
  cochairs,
  scuntJudge,
  bribes,
}) => {
  // initialize to false, don't show description
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`exec-container ${subcom ? 'subcom-container' : ''}`}
      onClick={() => setShowDescription(!showDescription)}
    >
      <div className="exec-image-hover">
        <LazyLoadImage className="exec-image" alt={name} effect="blur" src={image}></LazyLoadImage>
      </div>
      {/* <img src={image} className="exec-image"></img> */}
      <div
        className={` ${
          showDescription ? 'exec-profile-description-show' : 'exec-profile-description-hide'
        }`}
      >
        {exec ? (
          <ExecProfileDescription
            name={name}
            role={role}
            discipline={discipline}
            roleDescription={roleDescription}
            favPart={favPart}
          />
        ) : subcom ? (
          <SubcomProfileDescription name={name} description={roleDescription} cochairs={cochairs} />
        ) : scuntJudge ? (
          <ScuntJudgeDescription name={name} bribes={bribes} />
        ) : (
          <NonexecProfileDescription name={name} discipline={discipline} quote={quote} />
        )}
      </div>
    </div>
  );
};

const ExecProfileTitle = ({ name, role }) => {
  return (
    <>
      <img src={wave} className="wave-profile"></img>
      <div className="exec-profile-title-cont">
        <p className="exec-profile-position">{role.toUpperCase()}</p>
        <h3 className="exec-profile-name">{name}</h3>
      </div>
    </>
  );
};

const ExecProfileDescription = ({ name, role, discipline, roleDescription, favPart }) => {
  return (
    <div className="exec-profile-description">
      <div className="exec-profile-title-cont">
        <p className="exec-profile-position">{role.toUpperCase()}</p>
        <h3 className="exec-profile-name">{name}</h3>
      </div>

      <p className="exec-profile-description-dis">
        <span style={{ fontWeight: 'bold' }}>DISCIPLINE: </span>
        {discipline}
      </p>

      <p className="exec-profile-description-role">
        <span style={{ fontWeight: 'bold' }}>MY ROLE: </span>
        <br></br>
        {roleDescription}
      </p>

      <p className="exec-profile-description-fav">
        <span style={{ fontWeight: 'bold' }}>MY FAVOURITE PART: </span>
        <br></br>
        {favPart}
      </p>
    </div>
  );
};

const NonexecProfileDescription = ({ name, discipline, quote }) => {
  return (
    <div className="nonexec-profile-description-container" style={{ textAlign: 'center' }}>
      <div className="nonexec-profile-description">
        <div className="exec-profile-title-cont">
          <h3 className="exec-profile-name" style={{ textAlign: 'center' }}>
            {name}
          </h3>
          <p className="nonexec-dicipline">{discipline}</p>
        </div>
        <p className="exec-profile-description-role" style={{ marginBottom: '0' }}>
          {quote}
        </p>
      </div>
    </div>
  );
};

const SubcomProfileDescription = ({ name, description, cochairs }) => {
  return (
    <div
      className="nonexec-profile-description-container subcom-profile-mobile-display"
      style={{ textAlign: 'center' }}
    >
      <div className="nonexec-profile-description">
        <div className="exec-profile-title-cont">
          <h3 className="exec-profile-name" style={{ textAlign: 'center' }}>
            {name}
          </h3>
        </div>

        <div className="cochairs-list">
          <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>CO-CHAIRS: </span>
          {cochairs.map((person) => {
            return (
              <p key={person.name} className="profile-subcom-people">
                {person.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ScuntJudgeDescription = ({ name, bribes }) => {
  return (
    <>
      <div
        className={`exec-profile-description ${'nonexec-profile-description'}`}
        style={{ textAlign: 'center' }}
      >
        <div className="exec-profile-title-cont" style={{ marginBottom: '10px' }}>
          <h3 className="exec-profile-name">{name}</h3>
        </div>

        <p className="scunt-bribes-text">BRIBES:</p>
        <div className="scunt-bribes-list-all">
          <ul className="scunt-bribe-list" style={{ textDecoration: 'none' }}>
            {bribes.map((bribe) => {
              return (
                <li
                  className="scunt-bribe-list-item"
                  style={{ textDecoration: 'none' }}
                  key={bribe}
                >
                  {bribe}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

SubcomProfileDescription.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  cochairs: PropTypes.array,
};

NonexecProfileDescription.propTypes = {
  name: PropTypes.string,
  discipline: PropTypes.string,
  quote: PropTypes.string,
};

ExecProfile.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string, // use this for the name e.g. import "NAME" ?

  discipline: PropTypes.string,
  roleDescription: PropTypes.string,
  favPart: PropTypes.string,
  quote: PropTypes.string,
  cochairs: PropTypes.array, // list of subcom members

  subcom: PropTypes.bool, // true if a subcom
  exec: PropTypes.bool, // if true display bio for exec, if false, display bio for nonexec

  scuntJudge: PropTypes.bool, // true if a judge
  bribes: PropTypes.array, // all bribes
};

ExecProfileTitle.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
};

ExecProfileDescription.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  discipline: PropTypes.string,
  roleDescription: PropTypes.string,
  favPart: PropTypes.string,
};

ScuntJudgeDescription.propTypes = {
  name: PropTypes.string,
  bribes: PropTypes.array,
};

ExecProfileTitle.defaultProps = {
  role: 'role',
  name: 'First Last Name',
};

ExecProfile.defaultProps = {
  role: 'role',
  name: 'First Last Name',
  subcom: false,
};

export { ExecProfile };
