import { React, useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import faAngleDown from '../../../../assets/accordion/angle-up-solid.svg';
import faAngleDownDark from '../../../../assets/accordion/angle-up-solid_yellow.svg';
import './RetreatSingleAccordion.scss';
import { DarkModeContext } from '../../../../util/DarkModeProvider';

const RetreatSingleAccordion = ({
  header,
  children,
  isOpen,
  setIsOpen,
  canOpen,
  className,
  style,
  dark,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('retreat-accord-icon');

  const content = useRef(null);

  useEffect(() => {
    setHeight(isOpen ? `${content.current.scrollHeight}px` : '0px');
    setRotate(isOpen ? 'retreat-accord-icon' : 'retreat-accord-icon rotate');

    // Without this event listener, if you open an accordion then resize, it'll retain
    // the height it had when you opened it, but the text will get resized, so it'll get
    // cut off
    const handleResize = () => {
      setHeight(isOpen ? `${content.current.scrollHeight}px` : '0px');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  function toggleAccordion() {
    if (canOpen !== false) setIsOpen(!isOpen);
  }

  return (
    <div
      className={`retreat-accordion ${className} ${canOpen ? 'accordion-clickable' : ''}`}
      onClick={toggleAccordion}
      //style={{ cursor: canOpen ? 'pointer' : 'unset', ...style }} // Removed to allow custom cursor
    >
      <div className="accord-header">
        {canOpen !== false ? (
          <div style={{}} className={'retreat-accord-icon'}>
            <img
              src={darkMode ? faAngleDownDark : faAngleDown}
              className={`${rotate}`}
              // style={{ filter: darkMode ? 'invert(1)' : 'unset' }}
              alt="Accordion Button"
              width="15px"
            />
          </div>
        ) : (
          <></>
        )}
        {header}
      </div>
      <div ref={content} style={{ maxHeight: `${height}` }} className={'retreat-accord-content'}>
        <div className={'retreat-accord-text'}>{children}</div>
      </div>
    </div>
  );
};

RetreatSingleAccordion.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  canOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  dark: PropTypes.bool,
};

export { RetreatSingleAccordion };
