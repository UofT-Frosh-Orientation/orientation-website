import { React, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import faAngleDown from '../../../../assets/accordion/angle-up-solid.svg';
import './SingleAccordion.scss';

const SingleAccordion = ({ header, children, isOpen, setIsOpen }) => {
  const [Height, setHeight] = useState('0px');
  const [Rotate, setRotate] = useState('accordIcon');

  const content = useRef(null);

  useEffect(() => {
    setHeight(isOpen ? `${content.current.scrollHeight}px` : '0px');
    setRotate(isOpen ? 'accordIcon rotate' : 'accordIcon');
  }, [isOpen]);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="accordion" onClick={toggleAccordion}>
      <div className="accordHeader">
        <span>{header}</span>
        <span style={{ marginLeft: 'auto' }} className={'accordText'}>
          <img src={faAngleDown} className={`${Rotate}`} alt="Accordion Button" width="15px" />
        </span>
      </div>
      <div ref={content} style={{ maxHeight: `${Height}` }} className={'accordContent'}>
        <div className={'accordText'}>{children}</div>
      </div>
    </div>
  );
};

SingleAccordion.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export { SingleAccordion };
