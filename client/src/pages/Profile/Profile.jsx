import React, { Suspense, lazy } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';

const PageProfileFrosh = lazy(() =>
  import('./PageProfileFrosh').then((module) => ({ default: module.PageProfileFrosh })),
);
const PageProfileLeader = lazy(() =>
  import('./PageProfileLeader').then((module) => ({ default: module.PageProfileLeader })),
);

const PageProfile = () => {
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';

  return <Suspense>{leader === true ? <PageProfileLeader /> : <PageProfileFrosh />}</Suspense>;
};

export { PageProfile };
