import React from 'react';
import PropTypes from 'prop-types';
import DinoBones from '../../assets/404/dino-bones-new.svg';
import Grass from '../../assets/404/grass.png';
import Meteor from '../../assets/404/meteor.png';
import './404.scss';

import background from '../../assets/404/bg.png';
import cat from '../../assets/404/cat.svg';
import errorMsg from '../../assets/404/ERROR.svg';
import four from '../../assets/404/four.svg';
import sign from '../../assets/404/sign.svg';
import tree from '../../assets/404/tree.svg';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const Page404 = () => {
  return (
    <>
      {/* <div className="error404-main">

    </div> */}
      {/* FOREGROUND */}
      <div className="error404-container">
        <div className="error404-main">
          <img src={four} className="error404-four"></img>
        </div>
        <div className="error404-main">
          <img src={cat} className="error404-cat"></img>
        </div>
        <div className="error404-main">
          <img src={four} className="error404-four"></img>
        </div>
        {/* <img src={background} className='error404-bg'></img> */}
        {/* <img src={four} className="error404-bg"></img>
      <img src={cat} className="error404-bg"></img>
      <img src={four} className="error404-bg"></img> */}
        <img src={sign} className="error404-sign"></img>

        <img src={tree} className="error404-tree"></img>

        {/* <LazyLoadImage src={background} className='error404-bg' /> */}
        <div className="error404-main">
          <img src={errorMsg} className="error404-msg"></img>
        </div>
      </div>
      {/* <div className="error404-main">
      <img src={errorMsg} className="error404-msg"></img>
    </div> */}
    </>
    // <div className="error404-container">
    //   <div className="error404-sky" />
    //   <div style={{ backgroundImage: `url(${Grass})` }} className="error404-grass" />
    //   <img src={DinoBones} className="error404-bg-image"></img>
    //   <img src={Meteor} className="error404-meteor-image"></img>
    //   <div style={{ margin: 'auto auto' }}>
    //     <h1>Error 404</h1>
    //     <h2>Page not found</h2>
    //   </div>
    // </div>
  );
};

export { Page404 };
