import React, { useState } from 'react';

import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const items = ['Option 1', 'Option 2', 'Option 3'];

export const Enabled = () => {
  return (
    <Dropdown
      initialSelectedIndex={0}
      label={'Label'}
      values={items}
      onSelect={(value) => {
        console.log(value);
      }}
      isDisabled={false}
    />
  );
};

export const Disabled = () => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Dropdown
      selected={selected}
      label={'Disabled'}
      values={items}
      onSelect={setSelected}
      isDisabled={true}
    />
  );
};
