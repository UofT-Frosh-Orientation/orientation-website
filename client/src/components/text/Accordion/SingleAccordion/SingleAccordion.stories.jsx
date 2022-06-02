import { React, useState } from 'react';

import { SingleAccordion } from './SingleAccordion';

export default {
  title: 'SingleAccordion',
  component: SingleAccordion,
};

export const Opened = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <SingleAccordion isOpen={isOpen} setIsOpen={setIsOpen} header={'This is the first header'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </SingleAccordion>
    </div>
  );
};

export const Closed = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SingleAccordion isOpen={isOpen} setIsOpen={setIsOpen} header={'This is the first header'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </SingleAccordion>
    </div>
  );
};
