import React, { useEffect, useState } from 'react';
import { TanuLanding } from './TanuLanding/TanuLanding';
import { UzmaLanding } from './UzmaLanding/UzmaLanding';
import { NatLanding } from './NatLanding/NatLanding';
import { SherryLanding } from './SherryLanding/SherryLanding';

const landingPages = [
  {
    key: 0,
    component: <TanuLanding />,
  },
  {
    key: 1,
    component: <UzmaLanding />,
  },
  {
    key: 2,
    component: <NatLanding />,
  },
  {
    key: 3,
    component: <SherryLanding />,
  },
];

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
