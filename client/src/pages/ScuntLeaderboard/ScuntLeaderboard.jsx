import { React, useState, useEffect, useMemo } from 'react';
import PropTypes, { number } from 'prop-types';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import './ScuntLeaderboard.scss';

import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';
import { ScuntTitle } from '../../components/ScuntTitle/ScuntTitle.jsx';

import firstPlace from '../../assets/sponsors/sponsormedals/gold.png';
import secondPlace from '../../assets/sponsors/sponsormedals/silver.png';
import thirdPlace from '../../assets/sponsors/sponsormedals/bronze.png';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';

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
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Discipline 1', number: 1, points: 500 },
    { name: 'Discipline 2', number: 2, points: 350 },
    { name: 'Discipline 3', number: 3, points: 200 },
    { name: 'Discipline 4', number: 4, points: 150 },
    { name: 'Discipline 5', number: 5, points: 100 },
    { name: 'Discipline 6', number: 6, points: 80 },
    { name: 'Discipline 7', number: 7, points: 60 },
    { name: 'Discipline 8', number: 8, points: 40 },
    { name: 'Discipline 9', number: 9, points: 20 },
  ]);
  // const [leaderboard, setLeaderboard] = useState([]); -> revert when we set the page public

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

  /* -> uncomment when we set page to public
  if ((showLeaderboard !== true && !leader) || !loggedIn) {
    return (
      <div className="hidden-scunt-leaderboard-container">
        <ScuntTitle />
        <ScuntLinks />
        <div className="scunt-check-soon-title">
          <h1
            style={{
              textAlign: 'center',
              color: 'var(--text-primary)',
              fontWeight: '900',
              padding: '25px 4% 0 4%',
            }}
          >
            Check back soon!
          </h1>
        </div>
      </div>
    );
  }
  */

  return (
    <>
      <div className="scunt-leaderboard-container">
        <ScuntTitle />
        <div className="leaderboard-links-strip">
          <ScuntLinks />
        </div>
        <div className="leaderboard-yellow-strip">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="leaderboard-yellow-box" />
          ))}
        </div>
        <ScuntLeaderboardShow leaderboard={leaderboard} />
      </div>
    </>
  );
};

const ScuntLeaderboardShow = ({ leaderboard }) => {
  const computedLeaderboard = useMemo(() => {
    const { max, sum } = leaderboard.reduce(
      (prev, curr) => {
        if (curr.points > prev.max) prev.max = curr.points;
        prev.sum += curr.points;
        return prev;
      },
      { max: 0, sum: 0 },
    );

    const mean = sum / (leaderboard.length - 5);

    return leaderboard.map((team) => {
      team.computedPoints = team.points;
      const width = Math.round((team.computedPoints / max) * 100);
      team.width = String(width) + '%';
      return team;
    });
  }, [leaderboard]);

  const handle = useFullScreenHandle();

  return (
    <>
      {/* Heading */}
      <div className="leaderboard-heading-row">
        <div className="leaderboard-heading-pill">SKULE HUNT LIVE LEADERBOARD</div>
        <div className="leaderboard-cd-group">
          <div className="leaderboard-cd" />
          <div className="leaderboard-cd leaderboard-cd--2" />
          <div className="leaderboard-cd leaderboard-cd--3" />
          <div className="leaderboard-cd leaderboard-cd--4" />
        </div>
      </div>

      <FullScreen handle={handle}>
        <ScuntLeaderboardFullScreen arr={computedLeaderboard} />
      </FullScreen>

      <div className="display-only-desktop">
        <ScuntLeaderboardDesktop arr={computedLeaderboard} handle={handle} />
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

const ScuntLeaderboardDesktop = ({ arr, handle }) => {
  arr?.sort((a, b) => b.computedPoints - a.computedPoints);

  const top3 = arr?.slice(0, 3);
  const rest = arr?.slice(3);

  return (
    <div className="leaderboard-new-container">
      <div className="leaderboard-fullscreen-btn-row">
        <ButtonRound label="View Fullscreen" onClick={handle.enter} />
      </div>

      {/* Podium - 2nd, 1st, 3rd */}
      <div className="leaderboard-podium">
        <div className="leaderboard-podium-card leaderboard-podium-card--second">
          <div className="leaderboard-podium-medal">🥈</div>
          <div className="leaderboard-podium-name">{top3?.[1]?.name}</div>
          <div className="leaderboard-podium-pts" style={{ color: '#C0C0C0' }}>
            {top3?.[1]?.computedPoints} pts
          </div>
          <div className="leaderboard-podium-rank leaderboard-podium-rank--second">2nd</div>
        </div>
        <div className="leaderboard-podium-card leaderboard-podium-card--first">
          <div className="leaderboard-podium-medal" style={{ fontSize: '36px' }}>
            🥇
          </div>
          <div
            className="leaderboard-podium-name"
            style={{ color: 'var(--mikado)', fontWeight: 900 }}
          >
            {top3?.[0]?.name}
          </div>
          <div className="leaderboard-podium-pts" style={{ color: 'var(--mikado)' }}>
            {top3?.[0]?.computedPoints} pts
          </div>
          <div className="leaderboard-podium-rank leaderboard-podium-rank--first">1st</div>
        </div>
        <div className="leaderboard-podium-card leaderboard-podium-card--third">
          <div className="leaderboard-podium-medal">🥉</div>
          <div className="leaderboard-podium-name">{top3?.[2]?.name}</div>
          <div className="leaderboard-podium-pts" style={{ color: '#CD7F32' }}>
            {top3?.[2]?.computedPoints} pts
          </div>
          <div className="leaderboard-podium-rank leaderboard-podium-rank--third">3rd</div>
        </div>
      </div>

      {/* Divider */}
      <div className="leaderboard-divider" />

      {/* Ranks 4+ grid */}
      <div className="leaderboard-lower-grid">
        {rest?.map((item, index) => {
          const rank = index + 4;
          return (
            <div
              key={item.name + item.number}
              className={`leaderboard-lower-cell ${
                index % 2 === 0 ? 'leaderboard-new-row--odd' : 'leaderboard-new-row--even'
              }`}
            >
              <span className="leaderboard-lower-rank">{rank}.</span>
              <span className="leaderboard-lower-name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ScuntLeaderboardMobile = ({ arr }) => {
  arr?.sort((a, b) => b.computedPoints - a.computedPoints);

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
              showPoints={true}
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
              showPoints={true}
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
              showPoints={true}
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
              showPoints={false}
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
            fontSize: '24px',
          }}
        >
          {points}pts
        </h3>
      </div>
      <div className="leaderboard-team-info-v">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

// for mobile
const ScuntLeaderboardBubble = ({ name, number, points, rank, img, barwidth, showPoints }) => {
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
            </div>
          </div>
          {showPoints && (
            <h3 style={{ color: 'var(--white)', marginLeft: '5px' }}>{points + ' pts'}</h3>
          )}
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
  showPoints: PropTypes.bool,
  // key: PropTypes.string,
};

ScuntLeaderboardBubble.defaultProps = {
  img: undefined,
  rank: undefined,
};

ScuntLeaderboardDesktop.propTypes = {
  arr: PropTypes.array,
  handle: PropTypes.object,
};

ScuntLeaderboardFullScreen.propTypes = {
  arr: PropTypes.array,
};

ScuntLeaderboardMobile.propTypes = {
  arr: PropTypes.array,
  showPoints: PropTypes.bool,
};

export { ScuntLeaderboard };
