import React from 'react';
import './404.scss';
import background from '../../assets/404/bg.png';
import cat from '../../assets/404/cat.svg';
import errorMsg from '../../assets/404/ERROR.svg';
import four from '../../assets/404/four.svg';
import sign from '../../assets/404/sign.svg';
import tree from '../../assets/404/tree.svg';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Page404 = () => {
  return (
    <>
      <LazyLoadComponent>
        <div className="error404-container">
          <img src={background} className="error404-bg"></img>
          <div className="error404-flex">
            <img src={four} className="error404-four error404-right"></img>
          </div>
          <div className="error404-flex">
            <img src={cat} className="error404-cat"></img>
          </div>
          <div className="error404-flex">
            <img src={four} className="error404-four error404-left"></img>
          </div>
          <img src={sign} className="error404-sign"></img>
          <img src={tree} className="error404-tree"></img>
          <div className="error404-flex">
            <img src={errorMsg} className="error404-msg"></img>
          </div>
        </div>
      </LazyLoadComponent>
    </>
  );
};

export { Page404 };
