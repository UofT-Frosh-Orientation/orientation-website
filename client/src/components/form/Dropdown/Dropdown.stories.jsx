import React, { useState } from 'react';

import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const items = [
  { label: 'Option 1', value: '1', isSelected: false },
  { label: 'Option 2', value: '2', isSelected: false },
];

export const Enabled = () => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Dropdown
      selected={selected}
      label={'Label'}
      items={items}
      onSelect={setSelected}
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
      items={items}
      onSelect={setSelected}
      isDisabled={true}
    />
  );
};
