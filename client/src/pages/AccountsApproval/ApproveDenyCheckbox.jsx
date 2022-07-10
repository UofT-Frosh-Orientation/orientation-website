import { useState } from 'react';
import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import './ApproveDenyCheckbox.scss';

import GrayCross from '../../assets/misc/xmark-solid-gray.svg';
import WhiteCross from '../../assets/misc/xmark-solid-white.svg';
import GrayCheck from '../../assets/misc/check-solid-gray.svg';
import WhiteCheck from '../../assets/misc/check-solid-white.svg';

const ApproveDenyCheckbox = ({
  style,
  approve,
  deny,
  setApprove,
  setDeny,
  pointerEvents,
  changesMade,
  setChangesMade,
}) => {
  //console.log(pointerEvents);
  return (
    <div className="approve-deny-checkbox-container" style={style}>
      {/* approve check checkbox */}
      <div
        onClick={() => {
          setChangesMade(true);
          if (deny === true) {
            setDeny(false);
            setApprove(true);
          } else {
            setApprove(!approve);
          }
        }}
        className={`approve-deny-checkbox ${
          approve ? 'approve-green-check' : 'approve-gray-checkbox'
        }`}
        style={pointerEvents}
      >
        <img
          className="approve-icon"
          src={`${approve ? WhiteCheck : GrayCheck}`}
          alt="approval check"
        />
      </div>

      {/* deny checkbox */}
      <div
        onClick={() => {
          setChangesMade(true);
          if (approve === true) {
            setApprove(false);
            setDeny(true);
          } else {
            setDeny(!deny);
          }
        }}
        className={`approve-deny-checkbox ${deny ? 'approve-red-cross' : 'approve-gray-checkbox'}`}
        style={pointerEvents}
      >
        <img className="deny-icon" src={`${deny ? WhiteCross : GrayCross}`} alt="deny cross" />
      </div>
    </div>
  );
};

ApproveDenyCheckbox.propTypes = {
  style: PropTypes.object,
  approve: PropTypes.bool,
  deny: PropTypes.bool,
  setApprove: PropTypes.func,
  setDeny: PropTypes.func,
  pointerEvents: PropTypes.object,
  changesMade: PropTypes.bool,
  setChangesMade: PropTypes.func,
};

export { ApproveDenyCheckbox };
