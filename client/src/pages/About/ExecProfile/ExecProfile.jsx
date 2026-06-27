import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './ExecProfile.scss';

import wave from '../../../assets/about/wave-about.svg';
import { useRef } from 'react';

const ExecProfile = ({
  image,
  name,
  role,
  discipline,
  roleDescription,
  description,
  exec,
  quote,
  subcom,
  cochairs,
  scuntJudge,
  bribes,
  style,
  isActiveCard,
  isCardFlipped,
  onCardSelect,
  onCardHover,
  onCardLeave,
}) => {
  const containerRef = useRef(null);

  // Pointer-tilt parallax + holographic glare: map the cursor position over the
  // card into tilt angles (--rx/--ry) and a moving highlight centre (--mx/--my).
  const handlePointerMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 (left) → 1 (right)
    const py = (e.clientY - rect.top) / rect.height; // 0 (top) → 1 (bottom)

    el.style.setProperty('--rx', `${(0.5 - py) * 16}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 16}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--holo-opacity', '0.9');
  };

  const resetTilt = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--holo-opacity', '0');
  };

  const handleMouseEnter = () => {
    if (onCardHover) onCardHover();
  };

  const handleMouseLeave = () => {
    resetTilt();
    if (onCardLeave) onCardLeave();
  };

  return (
    <div
      ref={containerRef}
      className={`exec-container ${isActiveCard ? 'active-fg' : ''} ${
        isCardFlipped ? 'flipped-3d' : ''
      }`}
      style={style}
      onClick={onCardSelect}
      onMouseMove={handlePointerMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tilt layer sits between the fan/scale transform and the flip so pointer
          tilt composes cleanly with the existing 180° card flip. */}
      <div className="card-tilt-layer">
        <div className="card-inner-3d-flipper">
          {/* ================= CARD FRONT ================= */}
          <div className="card-template card-face-front">
            {/* Vertical role text placed inside the yellow border area */}
            <span className="vertical-card-role-label">{role.toUpperCase()}</span>

            {/* Main layout image panel */}
            <div className="card-template__panel">
              <LazyLoadImage className="exec-image" alt={name} effect="blur" src={image} />
            </div>

            {/* Footer Band with Name */}
            <div className="card-template__footer">
              <h3 className="exec-profile-card-footer-name script-font">{name}</h3>
            </div>

            {/* Centered Seal */}
            <div className="card-template__seal"></div>

            {/* Holographic foil sheen overlay */}
            <div className="card-holo" aria-hidden="true"></div>
          </div>

          {/* ================= CARD BACK ================= */}
          {/* Back face is just the blank card panel; the readable bio is rendered
              in the flat overlay below so it can scroll on touch devices. */}
          <div className="card-template card-face-back">
            <div className="card-template__panel back-bio-panel"></div>
          </div>
        </div>
      </div>

      {/* Bio lives in a flat overlay OUTSIDE the 3D-transformed flip subtree:
          iOS Safari cannot reliably touch-scroll content nested inside a rotated,
          backface-hidden element, so we render and scroll it here instead. */}
      {isActiveCard && isCardFlipped && (
        <div className="bio-scroll-overlay">
          <div className="bio-forced-visible">
            {exec ? (
              <ExecProfileDescription
                name={name}
                role={role}
                discipline={discipline}
                roleDescription={roleDescription}
              />
            ) : subcom ? (
              <SubcomProfileDescription
                name={name}
                description={roleDescription}
                cochairs={cochairs}
              />
            ) : scuntJudge ? (
              <ScuntJudgeDescription name={name} bribes={bribes} description={description} />
            ) : (
              <NonexecProfileDescription name={name} discipline={discipline} quote={quote} />
            )}
          </div>
        </div>
      )}

      {/* Sparkle burst that plays once each time a card flips to its bio */}
      {isActiveCard && isCardFlipped && (
        <div className="flip-sparkles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = 70 + (i % 3) * 25;
            return (
              <span
                key={i}
                className="flip-sparkle"
                style={{
                  '--tx': `${Math.cos(angle) * dist}px`,
                  '--ty': `${Math.sin(angle) * dist}px`,
                  animationDelay: `${i * 0.025}s`,
                }}
              >
                ✦
              </span>
            );
          })}
        </div>
      )}
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

const ExecProfileDescription = ({ name, role, discipline, roleDescription }) => {
  return (
    <div className="exec-profile-description">
      <div className="exec-profile-title-cont">
        <p className="exec-profile-position">{role.toUpperCase()}</p>
        <h3 className="exec-profile-name">{name}</h3>
      </div>

      <p className="exec-profile-description-discipline">{discipline}</p>

      <p className="exec-profile-description-role">{roleDescription}</p>
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

const ScuntJudgeDescription = ({ name, bribes, description }) => {
  return (
    <>
      <div
        className={`exec-profile-description ${'nonexec-profile-description'}`}
        style={{ textAlign: 'center' }}
      >
        <div className="exec-profile-title-cont" style={{ marginBottom: '10px' }}>
          <h3 className="exec-profile-name">{name.toUpperCase()}</h3>
        </div>

        {description !== undefined ? (
          <div className="exec-profile-scunt-judges-description">
            <p>{description}</p>
          </div>
        ) : (
          <></>
        )}

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
  quote: PropTypes.string,
  cochairs: PropTypes.array, // list of subcom members

  subcom: PropTypes.bool, // true if a subcom
  exec: PropTypes.bool, // if true display bio for exec, if false, display bio for nonexec

  scuntJudge: PropTypes.bool, // true if a judge
  bribes: PropTypes.array, // all bribes

  style: PropTypes.object, // for the fan effect
  isActiveCard: PropTypes.bool,
  isCardFlipped: PropTypes.bool,
  onCardSelect: PropTypes.func,
  onCardHover: PropTypes.func,
  onCardLeave: PropTypes.func,
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
};

ScuntJudgeDescription.propTypes = {
  name: PropTypes.string,
  bribes: PropTypes.array,
  description: PropTypes.string,
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
