import { React, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import faAngleDown from '../../../../assets/accordion/angle-up-solid.svg';
import './SingleAccordion.scss';


const SingleAccordion = ({ header, children, isOpen, setIsOpen, canOpen, className, style }) => {
  const [Height, setHeight] = useState('0px');
  const [Rotate, setRotate] = useState('accord-icon');

  const content = useRef(null);

  useEffect(() => {
    setHeight(isOpen ? `${content.current.scrollHeight}px` : '0px');
    setRotate(isOpen ? 'accord-icon' : 'accord-icon rotate');
  }, [isOpen]);

  function toggleAccordion() {
    if (canOpen !== false) setIsOpen(!isOpen);
  }

  return (
    <div
      className={`accordion ${className}`}
      onClick={toggleAccordion}
      style={{ cursor: canOpen ? 'pointer' : 'unset', ...style }}
    >
      <div className="accord-header">
        {header}
        {canOpen !== false ? (
          <div style={{ marginLeft: 'auto' }} className={'accord-text'}>
            <img src={faAngleDown} className={`${rotate}`} alt="Accordion Button" width="15px" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div ref={content} style={{ maxHeight: `${height}` }} className={'accord-content'}>
        <div className={'accord-text'}>{children}</div>
      </div>
    </div>
  );
};

SingleAccordion.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  canOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export { SingleAccordion };
