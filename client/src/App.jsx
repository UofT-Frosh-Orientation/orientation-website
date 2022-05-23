import { useState } from 'react';
import InstagramLogo from './instagram_icon.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* Title Section */}
        <div className="title">
          <h1 className="title-text">
            SOMETHING AWESOME<br></br>IS IN THE WORKS
          </h1>
          <hr className="line"></hr>
          <p className="subtitle">
            Hey F!rosh! We are working hard to give you the best experience, check back soon!
          </p>
        </div>

        {/* Registration Info */}
        <div className="info">
          <a href="https://www.instagram.com/froshweek/" target="_blank" rel="noreferrer">
            <img src={InstagramLogo} className="instagram-logo" />
          </a>
          <p className="info-text">
            Registration for F!rosh Week will open around the end of June. Follow us on Instagram
            for more updates!
          </p>
        </div>

        {/* Footer */}
        <div className="footer">
          <h2 className="footer-text">Made with 💜 by the F!rosh Week 2T2 Tech Team</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
