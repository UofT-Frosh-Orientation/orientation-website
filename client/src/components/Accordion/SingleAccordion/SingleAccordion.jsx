import { React, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './SingleAccordion.scss';

const SingleAccordion = ({ header, children, toggle }) => {
  const [isActive, setActive] = useState('active');
  const [Height, setHeight] = useState('0px');
  const [Rotate, setRotate] = useState('accordIcon');

  const content = useRef(null);

  useEffect(() => {
    setActive(isActive === '' ? 'active' : '');
    setHeight(isActive === 'active' ? '0px' : `${content.current.scrollHeight}px`);
    setRotate(isActive === 'active' ? 'accordIcon' : 'accordIcon rotate');
  }, [toggle]);

  function toggleAccordion() {
    setActive(isActive === '' ? 'active' : '');
    setHeight(isActive === 'active' ? '0px' : `${content.current.scrollHeight}px`);
    setRotate(isActive === 'active' ? 'accordIcon' : 'accordIcon rotate');
  }

  return (
    <div className="accordian" onClick={toggleAccordion}>
      <div className="accordHeader">
        <span>{header}</span>
        <span style={{ marginLeft: 'auto' }} className={'accordText'}>
          <FontAwesomeIcon icon={faAngleDown} className={`${Rotate}`} />
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
  toggle: PropTypes.bool,
};

export { SingleAccordion };
