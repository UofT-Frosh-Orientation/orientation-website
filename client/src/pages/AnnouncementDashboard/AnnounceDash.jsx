import { React, useState, useEffect } from 'react';
import { Tabs } from '../../components/tabs/tabs';
import { EditAnnounce } from './EditAnnounce';
import { CreateAnnounce } from './CreateAnnounce';
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
    <div className="accounts-approval-page-container">
      <div className="accounts-approval-tabs-container">
        <Tabs tabs={tabs} displayButtons={false} />
      </div>
    </div>
  );
};

export { PageAnnounceDash };
