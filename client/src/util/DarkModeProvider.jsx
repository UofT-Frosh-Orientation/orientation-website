import React, { createContext, useEffect, useState } from 'react';
import { colors } from './colors';
import PropTypes from 'prop-types';

const DarkModeContext = createContext();

function setColor(varName, newColor) {
  document.documentElement.style.setProperty(varName, newColor);
}

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const setDarkModeStatus = (status) => {
    setDarkMode(status);
    localStorage.setItem('dark-mode', status);
    for (let color of Object.keys(colors)) {
      if (status === false) {
        setColor(color, colors[color][0]);
      } else {
        setColor(color, colors[color][1]);
      }
    }
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('dark-mode');
    if (isDarkMode === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('dark-mode', true);
        setDarkModeStatus(true);
      } else {
        localStorage.setItem('dark-mode', false);
        setDarkModeStatus(false);
      }
    } else {
      setDarkModeStatus(JSON.parse(isDarkMode));
    }
  }, []);

  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, setDarkModeStatus }}>
        {children}
      </DarkModeContext.Provider>
    </div>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node,
};

export { DarkModeContext, DarkModeProvider };
