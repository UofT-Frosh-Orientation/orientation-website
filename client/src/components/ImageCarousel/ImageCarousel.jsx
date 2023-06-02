import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ items }) => {
  const [currentLabel, setCurrentLabel] = useState(0);
  const [currentLabelMobile, setCurrentLabelMobile] = useState(0);

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
          onChange={(number, item) => {
            setCurrentLabel(number);
          }}
        >
          {items.map((item, index) => {
            return (
              <div key={item.name + index}>
                <a
                  className="carousel-link"
                  href={item.website}
                  key={item.name + index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="carousel-slide-container">
                    <img
                      className="carousel-slide"
                      src={item.image}
                      alt={item.name}
                      style={{
                        border: currentLabel === index ? '10px solid' : 'none',
                        borderImage:
                          currentLabel === index
                            ? `var(--sponsor-border-${item.rank}) 50 50 50 50 stretch stretch`
                            : 'none',
                      }}
                    />
                  </div>
                </a>
              </div>
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
          stopOnHover={false}
          onChange={(number, item) => {
            setCurrentLabelMobile(number);
          }}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          {items.map((item, index) => {
            return (
              <div key={item.name + index}>
                <a className="carousel-link" href={item.website}>
                  <div className="carousel-slide-container">
                    <img
                      className="carousel-slide"
                      src={item.image}
                      alt={item.name}
                      style={{
                        border: currentLabel === index ? '10px solid' : 'none',
                        borderImage:
                          currentLabel === index
                            ? `var(--sponsor-border-${item.rank}) 50 50 50 50 stretch stretch`
                            : 'none',
                      }}
                    />
                  </div>
                </a>
              </div>
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
