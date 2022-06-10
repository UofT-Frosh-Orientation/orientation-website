import { React, useState } from 'react';

import { ButtonSelector } from './ButtonSelector';

export default {
  title: 'ButtonSelector',
  component: ButtonSelector,
};

export const firstButtonActive = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' }];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};

export const secondButtonActive = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const data = [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' }];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};

export const colouredButtons = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const data = [
    { name: 'Monday', buttonColor: 'red' },
    { name: 'Tuesday', buttonColor: 'green' },
    { name: 'Wednesday', buttonColor: 'blue' },
  ];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};
