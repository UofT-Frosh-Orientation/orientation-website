import React from 'react';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';

import './ScuntLeaderboard.scss';

const ScuntLeaderboard = () => {
  return (
    <>
      <Header text={'Leaderboard'} underlineDesktop={'410px'} underlineMobile={'285px'}>
        <ScuntLinks />
      </Header>
    </>
  );
};

export { ScuntLeaderboard };
