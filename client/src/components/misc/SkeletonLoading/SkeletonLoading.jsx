import React from 'react';
import './SkeletonLoading.scss';

export function SkeletonLoading() {
  return (
    <div className="skeleton-profile">
      <div className="skeleton avatar"></div>
      <div className="skeleton line short"></div>
      <div className="skeleton line medium"></div>
      <div className="skeleton line long"></div>
      <div className="skeleton line medium"></div>
      <div className="skeleton line short"></div>
    </div>
  );
}