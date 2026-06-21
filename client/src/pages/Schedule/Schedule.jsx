import React, { useEffect, useRef } from 'react';
import './Schedule.scss';
import RetroStar from '../../assets/schedule/schedule-retro-star.png';

export const PageSchedule = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Find the parent container (.hero-background) to adjust its height dynamically
    const container = canvas.parentElement;

    const colors = [
      '#711F8B',
      '#FFC600',
      '#A77AD7',
      '#3D0F58',
      '#FFFFFF',
      '#FED34C',
      '#DFCDF3',
      '#FBDC70',
    ];
    const danceRows = 5;
    const squareSize = 50; // Lock the square size strictly to 50px

    const renderDanceFloor = () => {
      // find how much total vertical space the hero section has
      const heroElement = container.parentElement;
      const totalAvailableHeight = heroElement.clientHeight || heroElement.offsetHeight;
      const width = heroElement.clientWidth || heroElement.offsetWidth;

      if (width === 0 || totalAvailableHeight === 0) return;

      // calculate how much space is left for the checkerboard,
      // then round it down so it only contains perfect multiples of 50px!
      const danceFloorHeight = danceRows * squareSize; // 250px
      const rawCheckerHeight = totalAvailableHeight - danceFloorHeight;
      const perfectCheckerHeight = Math.floor(rawCheckerHeight / squareSize) * squareSize;

      // snap the container elements to match this pixel-perfect math
      container.style.height = `${perfectCheckerHeight + danceFloorHeight}px`;
      const checkerboardElement = container.querySelector('.checkerboard');
      if (checkerboardElement) {
        checkerboardElement.style.height = `${perfectCheckerHeight}px`;
      }

      // update the canvas backing resolution
      canvas.width = width;
      canvas.height = danceFloorHeight;

      ctx.clearRect(0, 0, width, danceFloorHeight);
      const columns = Math.ceil(canvas.width / squareSize) + 1;

      // Draw the dance tiles
      for (let r = 0; r < danceRows; r++) {
        for (let c = 0; c < columns; c++) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(c * squareSize, r * squareSize, squareSize + 0.5, squareSize + 0.5);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      renderDanceFloor();
    });
    // Observe the outer hero wrapper instead of just the canvas
    if (canvas.parentElement?.parentElement) {
      resizeObserver.observe(canvas.parentElement.parentElement);
    }

    // The active matrix popping loop
    const interval = setInterval(() => {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      const columns = Math.ceil(width / squareSize) + 1;

      for (let i = 0; i < 3; i++) {
        const randomRow = Math.floor(Math.random() * danceRows);
        const randomCol = Math.floor(Math.random() * columns);

        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(
          randomCol * squareSize,
          randomRow * squareSize,
          squareSize + 0.5,
          squareSize + 0.5,
        );
      }
    }, 400);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <section className="schedule-hero">
      <div className="hero-background">
        <div className="checkerboard" />
        <canvas ref={canvasRef} className="dance-floor" />
      </div>

      <div className="hero-foreground">
        {/* Decorative stars */}
        <img src={RetroStar} className="star star-top-right" alt="decorative star" />
        <img src={RetroStar} className="star star-bottom-left-medium" alt="decorative star" />
        <img src={RetroStar} className="star star-bottom-left-small" alt="decorative star" />

        <div className="schedule-badge-container">
          <div className="schedule-badge" />
          {/* Main content */}
          <div className="schedule-text-container">
            <h1 className="schedule-title">Schedule</h1>
            <p className="schedule-dates">September 1 - 4</p>
          </div>
        </div>
      </div>
    </section>
  );
};
