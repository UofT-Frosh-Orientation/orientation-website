import React from 'react';
import './Schedule.scss';

export const PageSchedule = () => {
  return (
    <section className="schedule-hero">
      <div className="hero-background">
        <div className="checkerboard" />
        <div className="dance-floor" />
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
