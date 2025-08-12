import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonRound } from '../button/ButtonRound/ButtonRound';
import { ButtonBubble } from '../button/ButtonBubble/ButtonBubble';
import { useEffect } from 'react';

import examplePass from '../../assets/walletpass/example.pkpass';

const AppleWallet = () => {
  const downloadPass = () => {
    const link = document.createElement('a');
    link.href = examplePass; // Webpack will replace this with the file's final URL
    link.download = 'example.pkpass'; // suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tabs">
      {/* <ButtonRound label='Add to Apple Wallet'/> */}
      <ButtonBubble
        label={'Add to Apple Wallet'}
        onClick={downloadPass}
        isSecondary
        style={{ marginBottom: '30px', marginTop: '30px' }}
      />
    </div>
  );
};

AppleWallet.propTypes = {
  // Define prop types if needed
};

AppleWallet.defaultProps = {
  // Define default props if needed
};

export { AppleWallet };
