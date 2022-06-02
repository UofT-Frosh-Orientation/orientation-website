import React from 'react';

import { PageMaintenance } from './Maintenance';

export default {
  title: 'Maintenance Page',
  component: PageMaintenance,
};

export const MaintenanceStory = (args) => <PageMaintenance {...args} />;
MaintenanceStory.storyName = 'Maintenance Page';
