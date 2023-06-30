import React from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../state/user/userSlice';
import { PageProfileFrosh } from './PageProfileFrosh';
import { PageProfileLeader } from './PageProfileLeader';


const PageProfile = () => {
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';
  
  return (
    <>
      {leader === true ? <PageProfileLeader/> : <PageProfileFrosh/>}
    </>
  );
};

export { PageProfile };