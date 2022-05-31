// Importing React, css, frosh logo, and spinner animation
import React, {Component} from 'react';
import './LoadingAnimation.scss';
import logo from '../../../assets/icons/dino_test.svg'; // Change later: dino_test.svg is just placeholder for now
import Spinner from 'react-bootstrap/Spinner'; 

// Loading Animation class
// Note: If we don't want logo spinning, remove animation in css
class LoadingAnimation extends Component {
  render(){
    return (
      <div className="loadingAnimationContainer">
        <div className="loadingAnimation">
          <Spinner animation="border" role="status"/>
          <img src={logo} className="logo" alt="logo"/>
        </div>
      </div>
    )
  }
}

// Exporting Loading Animation
export default LoadingAnimation;


