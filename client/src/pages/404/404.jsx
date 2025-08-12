import React from 'react';
import './404.scss';
import error404 from '../../assets/404/ERROR404.png';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';

const Page404 = () => {
  console.log('404 page loaded');
  return (
    <>
      <LazyLoadImage className="error-background" src={error404} alt="error404" />
    </>
  );
};

export { Page404 };
