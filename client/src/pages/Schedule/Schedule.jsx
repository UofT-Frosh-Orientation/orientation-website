import React, { useEffect, useRef } from 'react';
import './Schedule.scss';
import RetroStar from '../../assets/schedule/schedule-retro-star.png';
import { ScheduleComponent } from '../../components/schedule/ScheduleHome/ScheduleHome';

export const PageSchedule = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Find the parent container (.hero-background) to adjust its height dynamically
    const container = canvas.parentElement;

    const layerColors = [
      ['#521570', '#591876', '#AF6A4C', '#B0706E', '#711F8B', '#A073AE', '#894B9C'], // Layer 1
      ['#493152', '#B098B9', '#8F5AB8', '#6C1D86', '#491367', '#491364', '#C78C2A', '#EAA535'], // Layer 2
      [
        '#3D0F5D',
        '#4B1864',
        '#4A3C4E',
        '#74258D',
        '#E1A41A',
        '#6F1F89',
        '#461264',
        '#C8BACC',
        '#E5AA17',
        '#A06ECA',
        '#9E6BCA',
      ], // Layer 3
      ['#3C3C3C', '#A77AD7', '#FCC600', '#3D0F58', '#D9D9D9', '#DFCDF3'], // Layer 4
    ];

    const gridconfig = {
      danceRows: 4,
      squareSize: 50, // Default square size for larger screens
    };

    const renderDanceFloor = () => {
      // find how much total vertical space the hero section has
      const heroElement = container.parentElement;
      const totalAvailableHeight = heroElement.clientHeight || heroElement.offsetHeight;
      const width = heroElement.clientWidth || heroElement.offsetWidth;

      if (width === 0 || totalAvailableHeight === 0) return;

      if (width <= 480) {
        gridconfig.squareSize = 25; // Reduce square size for smaller screens
      } else {
        gridconfig.squareSize = 50; // Default square size for larger screens
      }
      // calculate how much space is left for the checkerboard,
      // then round it down so it only contains perfect multiples of 50px!

      const { danceRows, squareSize } = gridconfig;

      const danceFloorHeight = danceRows * squareSize; // 200px on large screens, 100px on small screens
      const rawCheckerHeight = totalAvailableHeight - danceFloorHeight;
      const perfectCheckerHeight = Math.floor(rawCheckerHeight / squareSize) * squareSize;

      // snap the container elements to match this pixel-perfect math
      container.style.height = `${perfectCheckerHeight + danceFloorHeight}px`;
      const checkerboardElement = container.querySelector('.checkerboard');
      if (checkerboardElement) {
        checkerboardElement.style.height = `${perfectCheckerHeight}px`;
        checkerboardElement.style.backgroundSize = `${squareSize * 2}px ${squareSize * 2}px`;
      }

      // update the canvas backing resolution
      canvas.width = width;
      canvas.height = danceFloorHeight;

      ctx.clearRect(0, 0, width, danceFloorHeight);
      const columns = Math.ceil(canvas.width / squareSize) + 1;

      // Draw the dance tiles
      for (let r = 0; r < danceRows; r++) {
        const currentRowPalette = layerColors[r];

        for (let c = 0; c < columns; c++) {
          ctx.fillStyle = currentRowPalette[Math.floor(Math.random() * currentRowPalette.length)];
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

      const { danceRows, squareSize } = gridconfig;
      const columns = Math.ceil(width / squareSize) + 1;

      for (let i = 0; i < 3; i++) {
        const randomRow = Math.floor(Math.random() * danceRows);
        const randomCol = Math.floor(Math.random() * columns);

        const currentRowPalette = layerColors[randomRow];
        ctx.fillStyle = currentRowPalette[Math.floor(Math.random() * currentRowPalette.length)];
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
    <section className="schedule-page">
      <section className="schedule-hero">
        <div className="hero-background">
          <div className="checkerboard" />
          <canvas ref={canvasRef} className="dance-floor" />
        </div>

        <div className="hero-foreground">
          <div className="schedule-badge-container">
            <div className="schedule-badge">
              <img src={RetroStar} className="star star-top-right" alt="decorative star" />
              <img src={RetroStar} className="star star-bottom-left-medium" alt="decorative star" />
              <img src={RetroStar} className="star star-bottom-left-small" alt="decorative star" />
              {/* Main content */}
            </div>
            <div className="schedule-text-container">
              <h1 className="schedule-title">Schedule</h1>
              <p className="schedule-dates">September 1 - 4</p>
            </div>
          </div>
        </div>
      </section>

      <section className="schedule-content">
        <ScheduleComponent />
      </section>
    </section>
  );
};
