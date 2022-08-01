import React from 'react';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';
import { ExecProfile } from '../About/ExecProfile/ExecProfile';
import { scuntJudges } from '../../util/scunt-judges';

import './ScuntJudges.scss';

const ScuntJudges = () => {
  return (
    <>
      <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}>
        <ScuntLinks />
      </Header>
      <div className="scunt-judges-container">
        {scuntJudges.map((judge) => {
          return (
            <>
              <ExecProfile
                image={judge.img}
                name={judge.name}
                scuntJudge={true}
                bribes={judge.content}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export { ScuntJudges };
