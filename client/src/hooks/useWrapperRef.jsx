import { useEffect, useRef } from 'react';

const useWrapperRef = (onClickOutside) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);
  return ref;
};

export { useWrapperRef };
