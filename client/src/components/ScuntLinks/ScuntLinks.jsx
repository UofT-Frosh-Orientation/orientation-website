import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pages } from '../../util/pages';
import { ButtonOutlined } from '../button/ButtonOutlined/ButtonOutlined';

export const ScuntLinks = () => {
  const { pathname } = useLocation();
  return (
    <div className="scunt-links-container">
      {pages.scunt.map((page) => {
        return (
          <Link key={page.path} to={page.path} className="no-link-style">
            <ButtonOutlined isSecondary={pathname !== page.path} label={page.scuntLabel} />
          </Link>
        );
      })}
    </div>
  );
};
