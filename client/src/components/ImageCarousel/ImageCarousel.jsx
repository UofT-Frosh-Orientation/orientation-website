import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.scss';
import { Text } from '../text/Text/Text';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ items }) => {
  return (
    <div>
      <div className="desktop-only">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          centerMode={true}
          centerSlidePercentage={33}
          autoPlay={true}
          showThumbs={false}
          interval={4000}
          emulateTouch={true}
          stopOnHover={false}
        >
          {items.map((item, index) => {
            return (
              <a className="carousel-link" href={item.website} key={item.name + index}>
                <img className="carousel-slide" src={item.image} alt={item.name} />
              </a>
            );
          })}
        </Carousel>
      </div>
      <div className="mobile-only">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          centerMode={false}
          autoPlay={true}
          showThumbs={false}
          interval={4000}
          emulateTouch={true}
          stopOnHover={false}
        >
          {items.map((item, index) => {
            return (
              <a className="carousel-link" href={item.website} key={item.name + index}>
                <img className="carousel-slide" src={item.image} alt={item.name} />
              </a>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export { ImageCarousel };
