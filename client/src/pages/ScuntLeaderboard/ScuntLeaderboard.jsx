import { React, useState, useEffect, useMemo } from 'react';
import PropTypes, { number } from 'prop-types';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import './ScuntLeaderboard.scss';

import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';

import firstPlace from '../../assets/scuntleaderboard/first-medal.svg';
import secondPlace from '../../assets/scuntleaderboard/second-medal.svg';
import thirdPlace from '../../assets/scuntleaderboard/third-medal.svg';
import { Button } from '../../components/button/Button/Button';

import { useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../../state/user/userSlice';
import { scuntSettingsSelector } from '../../state/scuntSettings/scuntSettingsSlice';
import io from 'socket.io-client';

const buttonStyle = { width: 'fit-content' };

const ScuntLeaderboard = () => {
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';
  const loggedIn = useSelector(loggedInSelector);
  const { scuntSettings } = useSelector(scuntSettingsSelector);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const socket = io(`${import.meta.env.VITE_API_BASE_URL}/leaderboard`, { autoConnect: false });
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      socket.emit('getScores');
    });
    socket.on('scores', (scores) => {
      setLeaderboard(
        scores.map((team) => {
          if (team.points < 0) {
            team.points = 0;
          }
          return team;
        }),
      );
    });
    socket.on('update', (teamNumber, points) => {
      setLeaderboard((prevLeaderboard) => {
        return prevLeaderboard.map((team) => {
          if (team.number === teamNumber) {
            team.points = points < 0 ? 0 : points;
          }
          return team;
        });
      });
    });

    return () => {
      socket.off('connect');
      socket.off('scores');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scuntSettings) {
      setShowLeaderboard(scuntSettings?.revealLeaderboard);
    }
  }, [scuntSettings]);

  if ((showLeaderboard !== true && !leader) || !loggedIn) {
    return (
      <Header text={'Judges'} underlineDesktop={'265px'} underlineMobile={'180px'}>
        <ScuntLinks />
        <div className="scunt-check-soon-title">
          <h1 style={{ color: 'var(--text-light)' }}>Check back soon!</h1>
        </div>
      </Header>
    );
  }

  return (
    <>
      <Header text={'Leaderboard'} underlineDesktop={'410px'} underlineMobile={'285px'}>
        <ScuntLinks />
      </Header>
      <ScuntLeaderboardShow leaderboard={leaderboard} />
    </>
  );
};

const ScuntLeaderboardShow = ({ leaderboard }) => {
  // const [leaderboard, setLeaderboard] = useState([]);

  const computedLeaderboard = useMemo(() => {
    const { max, sum } = leaderboard.reduce(
      (prev, curr) => {
        if (curr.points > prev.max) {
          prev.max = curr.points;
        }
        prev.sum += curr.points;
        return prev;
      },
      { max: 0, sum: 0 },
    );

    const mean = sum / (leaderboard.length - 5);

    const result = leaderboard.map((team) => {
      if (team.points < mean) {
        // team.computedPoints = Math.round(
        //   Math.min(team.points + mean, max - mean / leaderboard.length),
        // );
        // disable the algorithm temp
        team.computedPoints = team.points;
      } else {
        team.computedPoints = team.points;
      }
      const width = Math.round((team.computedPoints / max) * 100);
      team.width = String(width) + '%';

      return team;
    });
    return result;
  }, [leaderboard]);
  const handle = useFullScreenHandle();

  return (
    <>
      <h2 style={{ textAlign: 'center', color: 'var(--text-dark-use)', padding: '25px 4% 0 4%' }}>
        Leaderboard updates in real time!
      </h2>

      <FullScreen handle={handle}>
        <ScuntLeaderboardFullScreen arr={computedLeaderboard} />
      </FullScreen>

      <div className="display-only-desktop">
        <div className="scunt-leaderboard">
          <Button style={buttonStyle} label="View Fullscreen" onClick={handle.enter} />
        </div>
        <ScuntLeaderboardDesktop arr={computedLeaderboard} />
      </div>
      <div className="display-only-tablet">
        <ScuntLeaderboardMobile arr={computedLeaderboard} />
      </div>
    </>
  );
};

const ScuntLeaderboardFullScreen = ({ arr }) => {
  return (
    <div className="scunt-leaderboard-fullscreen">
      {/* <h1 style={{ color: 'var(--text-dark-use)', textAlign: 'center', margin: '2% 0' }}>
        Leaderboard
      </h1> */}
      <div className="scunt-leaderboard-fullscreen-container">
        {arr?.map((item) => {
          let key = item.name + String(item.number);
          return (
            <ScuntLeaderboardBarVertical
              key={key}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              barwidth={item.width}
            />
          );
        })}
      </div>
    </div>
  );
};

const ScuntLeaderboardDesktop = ({ arr }) => {
  return (
    <div className="leaderboard-page-desktop">
      <table className="leaderboard-page-table">
        {arr?.map((item) => {
          let key = item.name + String(item.number);
          return (
            <ScuntLeaderboardBar
              key={key}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              barwidth={item.width}
            />
          );
        })}
      </table>
    </div>
  );
};

const ScuntLeaderboardMobile = ({ arr }) => {
  arr.sort((a, b) => b.computedPoints - a.computedPoints);

  return (
    <div className="leaderboard-page-mobile">
      {arr.map((item) => {
        let rank = arr.indexOf(item) + 1;
        let key = item.name + String(item.number);
        if (rank === 1) {
          // first place
          return (
            <ScuntLeaderboardBubble
              key={key}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              img={firstPlace}
              barwidth={item.width}
            />
          );
        } else if (rank === 2) {
          // second place
          return (
            <ScuntLeaderboardBubble
              key={key}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              img={secondPlace}
              barwidth={item.width}
            />
          );
        } else if (rank === 3) {
          return (
            <ScuntLeaderboardBubble
              key={key}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              img={thirdPlace}
              barwidth={item.width}
            />
          );
        } else {
          return (
            <ScuntLeaderboardBubble
              key={key}
              rank={rank}
              name={item.name}
              number={item.number}
              points={item.computedPoints}
              barwidth={item.width}
            />
          );
        }
      })}
    </div>
  );
};

const ScuntLeaderboardBar = ({ name, number, points, barwidth }) => {
  return (
    <>
      {/* <div className='scunt-leaderboard-bar-container'> */}
      <tbody>
        <tr style={{ height: '10vh' }} className="scunt-leaderboard-row">
          <td style={{ width: '15%', borderRight: '3px solid var(--button-outlined-border)' }}>
            <div className="leaderboard-team-info">
              <h3 className="leaderboard-team-name">{name}</h3>
              <p className="leaderboard-team-group">Group {number}</p>
            </div>
          </td>
          <td>
            <div className="scunt-leaderboard-bar-container">
              <div className="scunt-leaderboard-bar" style={{ width: barwidth }}>
                {/* <h3>{points} pts</h3> */}
              </div>
              <h3 style={{ color: 'var(--payment-error-text)', marginLeft: '20px' }}>
                {points}pts
              </h3>
            </div>
          </td>
        </tr>
        {/* </div> */}
      </tbody>
    </>
  );
};

const ScuntLeaderboardBarVertical = ({ name, number, points, barwidth }) => {
  return (
    <div className="scunt-leaderboard-bar-outer-v">
      <div className="scunt-leaderboard-bar-container-v">
        <div className="scunt-leaderboard-bar-v" style={{ height: barwidth }}></div>
        <h3
          style={{
            color: 'var(--payment-error-text)',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {points}pts
        </h3>
      </div>
      <div className="leaderboard-team-info-v">
        <h3>{name}</h3>
        <p>Group {number}</p>
      </div>
    </div>
  );
};

// for mobile
const ScuntLeaderboardBubble = ({ name, number, points, rank, img, barwidth }) => {
  return (
    <div className="scunt-leaderboard-bubble-outer">
      <div className="scunt-leaderboard-bubble-outer-hover">
        {img !== undefined ? (
          <img className="scunt-leaderboard-bubble-medal" src={img}></img>
        ) : (
          <></>
        )}
        <div
          className="scunt-leaderboard-bubble"
          style={{
            backgroundImage: `linear-gradient(90deg,var(--light-purple) 0%,var(--light-purple) ${barwidth},var(--purple-transparent) ${barwidth},var(--purple-transparent) 100%)`,
          }}
        >
          <div className="scunt-leaderboard-bubble-info">
            {rank !== undefined ? (
              <h1 className="scunt-leaderboard-bubble-rank">{rank}</h1>
            ) : (
              <h1 className="scunt-leaderboard-bubble-rank"></h1>
            )}
            <div className="scunt-leaderboard-bubble-name">
              <h3 style={{ fontSize: '16px' }}>{name}</h3>
              <p style={{ fontSize: '14px' }}>Group {number}</p>
            </div>
          </div>
          {/* <div className='scunt-leaderboard-bubble-points'> */}
          <h3 style={{ color: 'var(--white)', marginLeft: '5px' }}>{points + ' pts'}</h3>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

ScuntLeaderboardShow.propTypes = {
  leaderboard: PropTypes.array,
};

ScuntLeaderboardBar.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  points: PropTypes.number,
  barwidth: PropTypes.string,
  // key: PropTypes.string,
};

ScuntLeaderboardBarVertical.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  points: PropTypes.number,
  barwidth: PropTypes.string,
  // key: PropTypes.string,
};

ScuntLeaderboardBubble.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  points: PropTypes.number,
  rank: PropTypes.number,
  img: PropTypes.any,
  barwidth: PropTypes.string,
  // key: PropTypes.string,
};

ScuntLeaderboardBubble.defaultProps = {
  img: undefined,
  rank: undefined,
};

ScuntLeaderboardDesktop.propTypes = {
  arr: PropTypes.array,
};

ScuntLeaderboardFullScreen.propTypes = {
  arr: PropTypes.array,
};

ScuntLeaderboardMobile.propTypes = {
  arr: PropTypes.array,
};

export { ScuntLeaderboard };
