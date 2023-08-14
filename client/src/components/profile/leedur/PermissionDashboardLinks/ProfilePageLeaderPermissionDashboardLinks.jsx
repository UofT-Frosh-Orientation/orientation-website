import React, { useState } from 'react';
import './ProfilePageLeaderPermissionDashboardLinks.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../state/user/userSlice';
import { Button } from '../../../button/Button/Button';
import { DashboardDropdown } from '../../../DashboardDropdown/DashboardDropdown';
import DataDashboardIcon from '../../../../assets/dashboarddropdown/data-icon.svg';
import OutreachDashboardIcon from '../../../../assets/dashboarddropdown/outreach-icon.svg';
import ScuntDashboardIcon from '../../../../assets/dashboarddropdown/scunt-icon.svg';

export const ProfilePageLeaderPermissionDashboardLinks = () => {
  const { user } = useSelector(userSelector);
  const [openDataDropdown, setOpenDataDropdown] = useState(false);
  const [openOutreachDropdown, setOpenOutreachDropdown] = useState(false);
  const [openScuntDropdown, setOpenScuntDropdown] = useState(false);
  const approved = user?.approved === true;

  const dropdowns = [
    {
      label: 'data',
      title: 'Data',
      state: openDataDropdown,
      setState: setOpenDataDropdown,
      icon: DataDashboardIcon,
      items: [
        {
          label: 'Leedur Account Scope Approval',
          anyRegisterScope: false,
          link: '/approve-accounts',
          authScopes: ['accounts:delete', 'accounts:edit', 'accounts:read'],
        },
        {
          label: 'Frosh Info Table',
          anyRegisterScope: true,
          link: '/frosh-info-table',
          authScopes: [],
        },
        {
          label: 'Frosh Redistribution',
          anyRegisterScope: false,
          link: '/frosh-redistribution',
          authScopes: ['admin:all'],
        },
      ],
    },
    {
      label: 'outreach',
      title: 'Outreach',
      state: openOutreachDropdown,
      setState: setOpenOutreachDropdown,
      icon: OutreachDashboardIcon,
      items: [
        {
          label: 'FAQ Admin Panel',
          anyRegisterScope: false,
          link: '/faq-admin',
          authScopes: ['faq:delete', 'faq:edit'],
        },
        {
          label: 'Timeline Admin Panel',
          anyRegisterScope: false,
          link: '/timeline-admin',
          authScopes: ['timeline:create', 'timeline:edit', 'timeline:delete'],
        },
        {
          label: 'Announcements Admin Panel',
          anyRegisterScope: false,
          link: '/announcement-dashboard',
          authScopes: ['announcements:delete', 'announcements:create', 'announcements:edit'],
        },
      ],
    },
    {
      label: 'scunt',
      title: 'Scunt',
      state: openScuntDropdown,
      setState: setOpenScuntDropdown,
      icon: ScuntDashboardIcon,
      items: [
        {
          label: 'Scunt Judge Panel',
          anyRegisterScope: false,
          link: '/scunt-judge-form',
          authScopes: [
            'scunt:exec allow leaderboard',
            'scunt:exec allow missions page',
            'scunt:exec hide leaderboard',
            'scunt:exec hide missions page',
            'scunt:exec hide wedding missions',
            'scunt:exec negative points',
            'scunt:exec refill bribe points',
            'scunt:exec show wedding missions',
            'scunt:judge bribe points',
            'scunt:judge missions',
          ],
        },
        {
          label: 'Scunt Mission Panel',
          anyRegisterScope: false,
          link: '/scunt-missions-dashboard',
          authScopes: [
            'scunt:exec show missions',
            'scunt:exec hide missions',
            'scunt:exec create missions',
            'scunt:exec delete missions',
          ],
        },
        {
          label: 'Scunt Point Transactions',
          anyRegisterScope: false,
          link: '/scunt-transactions',
          authScopes: ['scunt:exec view transactions'],
        },
        {
          label: 'Scunt Settings',
          anyRegisterScope: false,
          link: '/scunt-game-controls',
          authScopes: ['scunt:exec game controls'],
        },
      ],
    },
  ];

  let userDropdown = [];
  const approvedScopes = [...user.authScopes.approved];

  for (let i = 0; i < dropdowns.length; i++) {
    for (let j = 0; j < dropdowns[i].items.length; j++) {
      let allScopes = dropdowns[i].items[j].authScopes;
      let hasAuthScope = dropdowns[i].items[j].anyRegisterScope;
      for (let authScope of allScopes) {
        if (user && approvedScopes.includes(authScope)) {
          hasAuthScope = true;
        }
      }
      if (hasAuthScope) {
        if (
          userDropdown.length === 0 ||
          userDropdown[userDropdown.length - 1].label !== dropdowns[i].label
        ) {
          let newObject = {
            label: dropdowns[i].label,
            title: dropdowns[i].title,
            state: dropdowns[i].state,
            setState: dropdowns[i].setState,
            icon: dropdowns[i].icon,
            items: [],
          };
          userDropdown.push(newObject);
        }
        let newAuthScope = {
          label: dropdowns[i].items[j].label,
          anyRegisterScope: dropdowns[i].items[j].anyRegisterScope,
          link: dropdowns[i].items[j].link,
          authScopes: dropdowns[i].items[j].authScopes,
        };
        userDropdown[userDropdown.length - 1].items.push(newAuthScope);
      }
    }
  }

  return (
    <div className={'profile-leader-dashboard-links'}>
      {approved ? (
        <>
          <div className={'profile-leader-dashboard-permissions-links'}>
            <Link
              to={'/permission-request'}
              style={{ textDecoration: 'none' }}
              className={'no-link-style'}
            >
              <Button label="Request Leedur Permissions" style={{ margin: '0' }} />
            </Link>
          </div>
          <div className={'profile-leader-dashboard-other-links'}>
            {userDropdown.map((dropdown, index) => {
              return (
                <DashboardDropdown
                  key={`${dropdown.label}-${index}`}
                  open={dropdown.state}
                  setOpen={dropdown.setState}
                  items={dropdown.items}
                  title={dropdown.title}
                  icon={dropdown.icon}
                />
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
