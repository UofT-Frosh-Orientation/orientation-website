import React from 'react';
import './Maintenance.scss';

import GearIcon from '../../assets/misc/gear-solid.svg';

const MaintenancePage = () => {
  return (
    <div className="full-page">
      <div className="maintenance-box">
        <img className="gear-icon" src={GearIcon} alt="gear"></img>
        <div className="maintenance-title">UNDER MAINTENANCE</div>
        <div className="maintenance-subtitle">
          We apologize for the inconvenience, we will be back soon! Check back here in a few
          minutes.
        </div>
      </div>
    </div>
  );
};

export { MaintenancePage };
