import { React } from 'react';
import { Tabs } from '../../components/tabs/tabs';
import { EditAnnounce } from './EditAnnounce';
import { CreateAnnounce } from './CreateAnnounce';
import './AnnounceDash.scss';
const PageAnnounceDash = () => {
  const tabs = [
    {
      title: 'Edit',
      component: <EditAnnounce />,
    },
    {
      title: 'Create',
      component: <CreateAnnounce />,
    },
  ];

  return (
    <div className="announcement-dashboard-container">
      <div className="announcement-dashboard-tabs-container">
        <Tabs tabs={tabs} displayButtons={false} />
      </div>
    </div>
  );
};

export { PageAnnounceDash };
