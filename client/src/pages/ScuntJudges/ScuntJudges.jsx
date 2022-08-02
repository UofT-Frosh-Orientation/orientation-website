import React, { useEffect, useState } from 'react';
import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';
import { ExecProfile } from '../About/ExecProfile/ExecProfile';
import { scuntJudges } from '../../util/scunt-judges';

import './ScuntJudges.scss';

const ScuntJudges = () => {
  let clicks = scuntJudges.length - 1; // only show tech team if all the profiles have been clicked
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem('Profile_Clicks_Scunt_Judges');

    if (data !== null) {
      setTotalClicks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Profile_Clicks_Scunt_Judges', JSON.stringify(totalClicks));
  }, [totalClicks]);

  return (
    <>
      <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}>
        <ScuntLinks />
      </Header>
      <div className="scunt-judges-container">
        {scuntJudges.map((judge) => {
          const [clickProfile, setClickProfile] = useState(false);
          const [numClicks, setNumClicks] = useState(0);

          useEffect(() => {
            if (clickProfile) {
              setNumClicks(numClicks + 1);
            }
            if (numClicks === 1) {
              setTotalClicks(totalClicks + 1);
            }
          }, [numClicks]);

          if (judge.name === 'Tech Team') {
            if (totalClicks >= clicks) {
              return (
                <div>
                  <ExecProfile
                    image={judge.img}
                    name={judge.name}
                    scuntJudge={true}
                    bribes={judge.content}
                  />
                </div>
              );
            } else {
              return <></>;
            }
          } else {
            return (
              <div
                onClick={() => {
                  setNumClicks(numClicks + 1);
                }}
              >
                <ExecProfile
                  image={judge.img}
                  name={judge.name}
                  scuntJudge={true}
                  bribes={judge.content}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export { ScuntJudges };
