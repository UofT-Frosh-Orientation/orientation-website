import React, { useEffect, useRef } from 'react';
import './Schedule.scss';

export const PageSchedule = () => {
  // 150 tiles ensures coverage for screens up to 3000px wide (30 columns * 5 rows)  const totalTiles = 50;
  const totalTiles = 150;
  const danceFloorTiles = Array.from({ length: totalTiles });

  return (
    <section className="schedule-hero">
      <div className="hero-background">
        <div className="checkerboard" />

        <div className="dance-floor">
          {danceFloorTiles.map((_, index) => (
            <div key={index} className="dance-tile" />
          ))}
        </div>
      </div>

      <div className="hero-foreground">
        <div className="schedule-ellipse">
          <h1>Schedule</h1>
          <p>September 1 - 4</p>
        </div>
      </div>
    </section>
  );
};
