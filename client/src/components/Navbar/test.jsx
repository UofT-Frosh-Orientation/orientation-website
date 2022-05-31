import React from 'react';

import './test.scss';

const Test = () => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop />
      </div>
      <div className="navbar-mobile">
        <NavbarMobile />
      </div>
    </>
  );
};

const NavbarDesktop = () => {
  return <h1>hello</h1>;
};

const NavbarMobile = () => {
  return <h1>bye</h1>;
};

export { Test };
