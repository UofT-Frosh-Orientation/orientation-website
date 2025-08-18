import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonRound } from '../button/ButtonRound/ButtonRound';
import { useEffect } from 'react';

const GoogleWallet = () => {
  // Something here
  return (
    <div className="tabs">
      <ButtonRound label="Add to Google Wallet" />
    </div>
  );
};

GoogleWallet.propTypes = {
  // Define prop types if needed
};

GoogleWallet.defaultProps = {
  // Define default props if needed
};

export { GoogleWallet };
