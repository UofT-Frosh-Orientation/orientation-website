import React from 'react';

import { MaintenancePage } from './Maintenance';

export default {
  title: 'Maintenance Page',
  component: MaintenancePage,
};

// const Template = (args) => <MaintenancePage {...args} />;

// export const Primary = Template.bind({});

export const MaintenanceStory = (args) => <MaintenancePage {...args} />;
MaintenanceStory.storyName = 'Maintenance Page';
