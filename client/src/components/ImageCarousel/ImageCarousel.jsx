import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.scss';
import { Text } from '../text/Text/Text';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ items, redirect }) => {
  const { innerWidth: width } = window;
  const dotRefs = useRef(items.map(() => createRef()));
  const handleClick = (link) => {
    if (redirect) {
      window.open(link);
    }
  };

  const moveDots = () => {
    for (let index = 0; index < dotRefs.current.length; index++) {
      let dotRef = dotRefs.current[index];
      if (dotRef.current.className == 'dot dotSelected') {
        dotRef.current.className = 'dot';
        if (index !== 0) {
          dotRefs.current[index - 1].current.className = 'dot dotSelected';
          break;
        } else {
          dotRefs.current[dotRefs.current.length - 1].current.className = 'dot dotSelected';
          break;
        }
      }
    }
  };

  return (
    <div className="carousel-container">
      <Text
        type="info"
        style={{ fontSize: '25px', textAlign: 'center', display: 'block', 'margin-bottom': '1vh' }}
      >
        Our Sponsors
      </Text>
      <div className="slide-deck">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          centerMode={width <= 767 ? false : true}
          centerSlidePercentage={33}
          autoPlay={true}
          showThumbs={false}
          interval={3000}
          onChange={moveDots}
        >
          {items.map((item, index) => {
            return (
              <div
                className="carousel-slide"
                key={index}
                id={index}
                onClick={() => handleClick(item.website)}
                style={{ backgroundColor: `${item.backgroundColor}` }}
              >
                <img className="carousel-image" src={item.image} alt={item.name} />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="dot-container">
        {items.map((item, index) => {
          return (
            <span
              key={index}
              ref={dotRefs.current[index]}
              className={index === 0 ? 'dot dotSelected' : 'dot'}
            />
          );
        })}
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export { ImageCarousel };
