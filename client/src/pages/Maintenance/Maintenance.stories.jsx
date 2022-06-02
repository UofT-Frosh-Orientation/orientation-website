import React from 'react';

import { MaintenancePage } from './Maintenance';

export default {
  title: 'Maintenance Page',
  component: MaintenancePage,
};

export const MaintenanceStory = (args) => <MaintenancePage {...args} />;
MaintenanceStory.storyName = 'Maintenance Page';
