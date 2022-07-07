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

  approveSingleCheck,
  denySingleCheck,
}) => {
  // TODO: need to "save" states on refresh --> or alternatively,
  //       save the approved state and check it?

  // states for select all -- purple check
  //const [approve, setApprove] = useState(false);
  //   const [approve, setApprove] = useState(false);
  //   const [deny, setDeny] = useState(false);

  const getApprove = () => {
    console.log('jddjd');
    return approve;
  };

  const [approveAll, setApproveAll] = useState(approve);
  const [denyAll, setDenyAll] = useState(deny);

  //console.log("DenyAll: ", denyAll);

  useEffect(() => {
    setApproveAll(approve);
    setDenyAll(deny);

    //setApprove(approveSingleCheck);

    // if approveAll is true --> disable clicks to deny checkbox
    if (approveAll === true) {
      setDeny(false);
    }
    if (denyAll === true) {
      setApprove(false);
    }

    // TODO: tell backend to update stuff here?
  }, [approve, approveAll, deny]);

  return (
    <div className="approve-deny-checkbox-container" style={style}>
      {/* approve check checkbox */}
      <div
        onClick={() => {
          if (deny === true) {
            // is approve is clicked while deny is highlighted
            setDeny(false);
            setApprove(true);
            setApproveAll(true);
          } else if (approveAll === true) {
            // don't do anything
          } else {
            // toggle approve
            setApproveAll(false);
            setApprove(!approve);
          }

          // TO-DO: or let the backend know that it was clicked, and approve account?
        }}
        className={`approve-deny-checkbox ${
          approve || approveAll ? 'approve-green-check' : 'approve-gray-checkbox'
        }`}
        style={approveAll ? { pointerEvents: 'none' } : {}}
      >
        <img
          className="approve-icon"
          src={`${approve || approveAll ? WhiteCheck : GrayCheck}`}
          alt="approval check"
        />
      </div>

      {/* deny checkbox */}
      <div
        onClick={() => {
          if (approveAll === true) {
            setDeny(false);
          } else if (approve === true) {
            setApprove(false);
            setDeny(true);
          } else {
            // toggle deny
            setDeny(!deny);
          }
        }}
        className={`approve-deny-checkbox ${
          deny || denyAll ? 'approve-red-cross' : 'approve-gray-checkbox'
        }`}
        style={approveAll ? { pointerEvents: 'none' } : {}}
      >
        <img
          className="deny-icon"
          src={`${deny || denyAll ? WhiteCross : GrayCross}`}
          alt="deny cross"
        />
      </div>
    </div>
  );
};

ApproveDenyCheckbox.propTypes = {
  style: PropTypes.object,
  approve: PropTypes.bool,
  deny: PropTypes.bool,
  approveSingleCheck: PropTypes.bool,
  denySingleCheck: PropTypes.bool,
  setApprove: PropTypes.func,
  setDeny: PropTypes.func,
};

export { ApproveDenyCheckbox };
