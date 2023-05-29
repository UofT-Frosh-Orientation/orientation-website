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
    component: <L1 />,
  },
  {
    key: 2,
    component: <L1 />,
  },
];

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const LandingPage = () => {
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    // init of state variable
    console.log('first');
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

  //   useEffect(() => {
  //     // updating state var
  //     console.log("second")
  //     let randIdx = randomNumber(0, landingPages.length - 1);
  //     const localIdx = window.localStorage.getItem('landing_page_idx');

  //     // if (localIdx === null) {
  //     //   setPageIndex(JSON.parse(randIdx));
  //     // } else {
  //     //   while (randIdx === JSON.parse(localIdx)) {
  //     //     randIdx = randomNumber(0, landingPages.length - 1);
  //     //   }
  //     //   setPageIndex(JSON.parse(randIdx));
  //     // }

  //     if (localIdx !== null) {
  //         while (randIdx === JSON.parse(localIdx)) {
  //             randIdx = randomNumber(0, landingPages.length - 1);
  //         }
  //         setPageIndex(JSON.parse(randIdx));
  //     }

  //   }, []);

  //   useEffect(() => {
  //     // set the id in local storage
  //     console.log("third")
  //     window.localStorage.setItem('landing_page_idx', JSON.stringify(pageIndex));
  //   }, [pageIndex]);

  return (
    <>
      {/* {landingPages.map((item, idx) => {
            if (idx === pageIndex) {
                return (
                    <div className='initial-page'>
                     {item}
                    </div>
                )
            }
        })} */}
      <div key={landingPages[pageIndex]['key']}>{landingPages[pageIndex]['component']}</div>
    </>
  );
};
