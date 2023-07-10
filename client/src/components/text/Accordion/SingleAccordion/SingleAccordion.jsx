import { React, useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import faAngleDown from '../../../../assets/accordion/angle-up-solid.svg';
import './SingleAccordion.scss';
import { DarkModeContext } from '../../../../util/DarkModeProvider';

const SingleAccordion = ({ header, children, isOpen, setIsOpen, canOpen, className, style }) => {
  const { darkMode } = useContext(DarkModeContext);

  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('accord-icon');

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
            <img
              src={faAngleDown}
              className={`${rotate}`}
              style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
              alt="Accordion Button"
              width="15px"
            />
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
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  canOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export { SingleAccordion };
