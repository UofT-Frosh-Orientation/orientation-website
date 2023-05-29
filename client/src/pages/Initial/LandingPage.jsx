import React, { useEffect, useState } from 'react';

const L1 = () => {
  return (
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
    </>
  );
};

const L2 = () => {
  return (
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
    </>
  );
};

const L3 = () => {
  return (
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
    </>
  );
};

const landingPages = [
  {
    key: 0,
    component: <L1 />,
  },
  {
    key: 1,
    component: <L2 />,
  },
  {
    key: 2,
    component: <L3 />,
  },
];

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const LandingPage = () => {
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    let randIdx = randomNumber(0, landingPages.length - 1);
    const localIdx = window.localStorage.getItem('landing_page_idx');

    if (localIdx !== null) {
      while (randIdx === JSON.parse(localIdx)) {
        randIdx = randomNumber(0, landingPages.length - 1);
      }
    }
    window.localStorage.setItem('landing_page_idx', JSON.stringify(randIdx));

    setPageIndex(JSON.parse(randIdx));
  }, []);

  return (
    <>
      {landingPages.map((item) => {
        if (item.key == pageIndex) {
          return <div key={item.key}>{item.component}</div>;
        }
      })}
    </>
  );
};
