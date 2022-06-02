import React from 'react';
import './Maintenance.scss';

import GearIcon from '../../assets/misc/gear-solid.svg';

const MaintenancePage = () => {
  return (
    <div className="full-page">
      <div className="box">
        <img className="gear-icon" src={GearIcon} alt="gear"></img>
        <div className="title">UNDER MAINTENANCE</div>
        <div className="subtitle">
          We apologize for the inconvenience, we will be back in five minutes!
        </div>
      </div>
    </div>
  );
};

export { MaintenancePage };
