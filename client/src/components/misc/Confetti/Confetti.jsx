import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCanvasConfetti from 'react-canvas-confetti';

const Confetti = ({ animate }) => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  useEffect(() => {
    if (animate === true) {
      let animationCount = 0;
      const interval = setInterval(() => {
        animationCount = animationCount + 1;
        makeShot(60, 0);
        makeShot(120, 1);
        if (animationCount >= 5) clearInterval(interval);
      }, 400);
    }
  }, [animate]);

  const makeShot = useCallback((angle, originX) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        particleCount: 100,
        angle,
        spread: 100,
        origin: { x: originX, y: 0.6 },
        colors: ['#6F1E88', '#FFC112', '#B27EC2', '#FFF567'],
      });
  }, []);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 200,
      }}
    />
  );
};

Confetti.propTypes = {
  animate: PropTypes.bool.isRequired,
};

export { Confetti };
