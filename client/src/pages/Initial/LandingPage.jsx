import React, { useEffect, useState } from 'react';

// F!rosh 2T4 Landing Pages
import { AshLanding } from './AshLanding/AshLanding';
import { WilliamLanding } from './WilliamLanding/WilliamLanding';
import { AlissaLanding } from './AlissaLanding/AlissaLanding';
import { SplineLanding } from './SplineLanding/SplineLanding';

const currentYear = '2T5';

export const LandingPage = () => {
  return (
    <div>
      <SplineLanding />
    </div>
  );
};
