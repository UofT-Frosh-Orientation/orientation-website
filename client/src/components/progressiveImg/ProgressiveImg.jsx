import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProgressiveImage = ({ src, placeholder, alt, classStyle }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {isLoading && (
        <img src={placeholder} alt={alt} className={classStyle} style={{ filter: 'blur(20px)' }} />
      )}
      <img
        src={src}
        alt={alt}
        className={classStyle}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        onLoad={handleLoad}
      />
    </>
  );
};

ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  classStyle: PropTypes.string,
};

export default ProgressiveImage;
