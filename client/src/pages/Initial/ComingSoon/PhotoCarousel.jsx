import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './PhotoCarousel.scss';

const randomIndex = (n) => Math.floor(Math.random() * n);

// Shows one photo at a time, crossfading to a random new one every `intervalMs`.
// During a change the previous photo stays underneath while the new one fades in
// on top, so there's never a blank/black frame. The `photos` list comes from a
// per-frame folder (see ComingSoon).
export const PhotoCarousel = ({
  photos,
  style,
  intervalMs = 15000,
  alt = 'F!rosh Week',
  emptyHint = 'the photos folder',
}) => {
  const [index, setIndex] = useState(() => (photos.length ? randomIndex(photos.length) : 0));
  const [prevIndex, setPrevIndex] = useState(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    if (photos.length <= 1) return undefined;
    const id = setInterval(() => {
      const cur = indexRef.current;
      let next = randomIndex(photos.length);
      while (next === cur) next = randomIndex(photos.length);
      setPrevIndex(cur); // keep the old photo underneath during the fade
      setIndex(next);
    }, intervalMs);
    return () => clearInterval(id);
  }, [photos.length, intervalMs]);

  if (!photos.length) {
    return (
      <div className="cs-carousel cs-carousel--empty" style={style}>
        Drop photos in
        <br />
        {emptyHint}
      </div>
    );
  }

  return (
    <div className="cs-carousel" style={style}>
      {prevIndex != null && (
        <img
          key={`prev-${prevIndex}`}
          src={photos[prevIndex]}
          alt=""
          className="cs-carousel__img cs-carousel__img--under"
          draggable={false}
        />
      )}
      <img
        key={`cur-${index}`}
        src={photos[index]}
        alt={alt}
        className="cs-carousel__img cs-carousel__img--top"
        draggable={false}
        onAnimationEnd={() => setPrevIndex(null)}
      />
    </div>
  );
};

PhotoCarousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
  intervalMs: PropTypes.number,
  alt: PropTypes.string,
  emptyHint: PropTypes.string,
};
