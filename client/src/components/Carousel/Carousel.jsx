import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';
import { Text } from '../text/Text/Text';

const Carousel = ({ items, redirect }) => {
  const [counter, setCounter] = useState(0);

  const slideRefs = useRef(items.map(() => createRef()));
  const dotRefs = useRef(items.map(() => createRef()));

  const [queue, setQueue] = useState(
    slideRefs.current.map((ref) => {
      return ref;
    }),
  );
  const [positions, setPositions] = useState([undefined, undefined, undefined]);

  const moveSlides = () => {
    let i = positions.pop();

    if (i !== undefined) {
      i.current.position = undefined;
      queue.push(i);
    }

    positions.unshift(queue.shift());

    if (positions.includes(undefined)) {
      moveSlides();
    } else {
      positions.map((ref, index) => {
        ref.current.position = index;
      });
    }
  };

  const moveDots = () => {
    for (let index = 0; index < dotRefs.current.length; index++) {
      let dotRef = dotRefs.current[index];
      if (dotRef.current.className == 'dot selected') {
        dotRef.current.className = 'dot';
        if (index !== 0) {
          dotRefs.current[index - 1].current.className = 'dot selected';
          break;
        } else {
          dotRefs.current[dotRefs.current.length - 1].current.className = 'dot selected';
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      moveSlides();

      slideRefs.current.map((slideRef) => {
        slideRef.current.className = `carousel-slide position${slideRef.current.position}`;
      });

      moveDots();

      setCounter(3);
    }
  }, [counter]);

  const handleClick = (link) => {
    if (redirect) {
      window.open(link);
    }
  };
  return (
    <div className="carousel-container">
      <Text type="info" style={{ fontSize: '25px', textAlign: 'center', display: 'block' }}>
        Our Sponsors
      </Text>
      <div className="slide-deck">
        <ul>
          {items.map((item, index) => {
            return (
              <li
                className="carousel-slide"
                ref={slideRefs.current[index]}
                key={index}
                id={index}
                onClick={() => handleClick(item.website)}
                style={{ backgroundColor: `${item.backgroundColor}` }}
              >
                <img className="carousel-image" src={item.image} alt={item.name} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="dot-container">
        {items.map((item, index) => {
          return (
            <span
              key={index}
              ref={dotRefs.current[index]}
              className={index === 0 ? 'dot selected' : 'dot'}
            />
          );
        })}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export { Carousel };
