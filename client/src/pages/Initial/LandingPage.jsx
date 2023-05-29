import React, { useEffect, useState } from 'react';

const l1 = () => {
  <>
    <div
      style={{
        width: '50px',
        height: '50px',
        position: 'absolute',
        top: '50%',
        bottom: '50px',
        backgroundColor: 'blue',
      }}
    ></div>
  </>;
};

const l2 = () => {
  <>
    <div
      style={{
        width: '50px',
        height: '50px',
        position: 'absolute',
        top: '50%',
        bottom: '50px',
        backgroundColor: 'green',
      }}
    ></div>
  </>;
};

const l3 = () => {
  <>
    <div
      style={{
        width: '50px',
        height: '50px',
        position: 'absolute',
        top: '50%',
        bottom: '50px',
        backgroundColor: 'red',
      }}
    ></div>
  </>;
};

const landingPages = [l1, l2, l3];

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const LandingPage = () => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    let randIdx = randomNumber(0, landingPages.length - 1);
    const localIdx = JSON.parse(window.localStorage.getItem('landing_page_idx'));

    if (localIdx === null) {
      setPageIndex(JSON.parse(randIdx));
    } else {
      while (randIdx === localIdx) {
        randIdx = randomNumber(0, landingPages.length - 1);
      }
      setPageIndex(JSON.parse(randIdx));
    }
  }, []);

  useEffect(() => {
    // set the id in local storage
    window.localStorage.setItem('landing_page_idx', JSON.stringify(pageIndex));
  }, [pageIndex]);

  return landingPages[pageIndex];
};
