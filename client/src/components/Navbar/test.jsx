import React from 'react';

import './test.scss';

const TestComponent = () => {
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
  return <div>hello</div>;
};

const NavbarMobile = () => {
  return <div>bye</div>;
};

export { TestComponent };
