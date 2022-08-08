import { React, useState, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
import './ScuntLeaderboard.scss';

import { ScuntLinks } from '../../components/ScuntLinks/ScuntLinks';
import { Header } from '../../components/text/Header/Header';

import firstPlace from '../../assets/scuntleaderboard/first-medal.svg';
import secondPlace from '../../assets/scuntleaderboard/second-medal.svg';
import thirdPlace from '../../assets/scuntleaderboard/third-medal.svg';

const test = [
  {
    name: 'HIHIHI jhjhj',
    number: 3, // group #3
    points: 2000,
  },
  {
    name: 'igsdkfj ea',
    number: 3, // group #3
    points: 2000,
  },
  {
    name: 'asdfsgadjdd',
    number: 3, // group #3
    points: 50,
  },
  {
    name: 'jhjhjh',
    number: 12, // group #3
    points: 50,
  },
  {
    name: 'happi happi happi fgf fg',
    number: 6, // group #3
    points: 5110,
  },
  {
    name: 'AADA DSAFKDGKAD',
    number: 14, // group #3
    points: 780,
  },
];

const ScuntLeaderboard = () => {
  //const [leaderboard, setLeaderboard] = useState([]);

  // useEffect(() => {
  //   //dispatch(getLeaderboard());
  // }, []);

  // for testing
  let testupdate = test;
  testupdate.sort((a, b) => {
    // sort array in decending order
    return b.points - a.points;
  });

  let highest = testupdate[0].points;

  testupdate.forEach((element) => {
    let widthtemp = Math.round((element.points / highest) * 100);
    element.width = String(widthtemp) + '%';
  });

  const [leaderboard, setLeaderboard] = useState(testupdate);

  return (
    <>
      <Header text={'Leaderboard'} underlineDesktop={'410px'} underlineMobile={'285px'}>
        <ScuntLinks />
      </Header>

      <h2 style={{ textAlign: 'center', color: 'var(--text-dark-use)', padding: '25px 4% 0 4%' }}>
        Leaderboard updates every _ minutes!
      </h2>

      <div className="display-only-desktop">
        <ScuntLeaderboardDesktop arr={leaderboard} />
      </div>
      <div className="display-only-tablet">
        <ScuntLeaderboardMobile arr={leaderboard} />
      </div>
    </>
  );
};

const ScuntLeaderboardDesktop = ({ arr }) => {
  return (
    <>
      <div className="leaderboard-page-desktop">
        <table className="leaderboard-page-table">
          {arr?.map((item) => {
            let key = item.name + String(item.number);
            return (
              <ScuntLeaderboardBar
                key={key}
                name={item.name}
                number={item.number}
                points={item.points}
                barwidth={item.width}
              />
            );
          })}
        </table>
      </div>
    </>
  );
};

const ScuntLeaderboardMobile = ({ arr }) => {
  return (
    <>
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
                points={item.points}
                img={firstPlace}
              />
            );
          } else if (rank === 2) {
            // second place
            return (
              <ScuntLeaderboardBubble
                key={key}
                name={item.name}
                number={item.number}
                points={item.points}
                img={secondPlace}
              />
            );
          } else if (rank === 3) {
            return (
              <ScuntLeaderboardBubble
                key={key}
                name={item.name}
                number={item.number}
                points={item.points}
                img={thirdPlace}
              />
            );
          } else {
            return (
              <ScuntLeaderboardBubble
                key={key}
                rank={rank}
                name={item.name}
                number={item.number}
                points={item.points}
              />
            );
          }
        })}
      </div>
    </>
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

// for mobile
const ScuntLeaderboardBubble = ({ name, number, points, rank, img }) => {
  return (
    <>
      <div className="scunt-leaderboard-bubble-outer">
        {img !== undefined ? (
          <img className="scunt-leaderboard-bubble-medal" src={img}></img>
        ) : (
          <></>
        )}
        <div className="scunt-leaderboard-bubble">
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
          <h3 style={{ color: 'var(--white)', marginLeft: '5px' }}>{points}pts</h3>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

ScuntLeaderboardBar.propTypes = {
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
  // key: PropTypes.string,
};

ScuntLeaderboardBubble.defaultProps = {
  img: undefined,
  rank: undefined,
};

ScuntLeaderboardDesktop.propTypes = {
  arr: PropTypes.array,
};

ScuntLeaderboardMobile.propTypes = {
  arr: PropTypes.array,
};

export { ScuntLeaderboard };
