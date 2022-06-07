// Importing React, css, frosh logo
import React, { Component } from 'react';
import './LoadingAnimation.scss';
import logo from '../../../assets/misc/dino_test.svg'; // Change later: dino_test.svg is just placeholder for now

// Loading Animation class
// Note: If we don't want logo spinning, remove animation in css
class LoadingAnimation extends Component {
  render() {
    return (
      <div className="loading-animation-container">
        <div className="loading-animation"></div>
        <img src={logo} className="logo" alt="logo" />
      </div>
    );
  }
}

// Exporting Loading Animation
export default LoadingAnimation;
