import { React, useEffect, useState } from 'react';
import './SplineLanding.scss';
import Spline from '@splinetool/react-spline';

const SplineLanding = () => {
  return (
    <div className="bg">
      <Spline scene="https://prod.spline.design/a7uuTeKGiRGtSK02/scene.splinecode" />
    </div>
  );
};

export { SplineLanding };
