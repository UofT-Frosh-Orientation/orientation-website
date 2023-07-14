import React, { createContext, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorSuccessBox } from '../components/containers/ErrorSuccessBox/ErrorSuccessBox';

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const snackbarRef = useRef(null);

  const setSnackbar = (content, isError) => {
    snackbarRef?.current?.setVisible(content, isError);
  };

  return (
    <SnackbarContext.Provider value={{ setSnackbar }}>
      {children}
      <Snackbar ref={snackbarRef} />
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};

const Snackbar = forwardRef((props, ref) => {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [animateDisappear, setAnimateDisappear] = useState(false);

  useImperativeHandle(ref, () => ({
    setVisible: (content, isError) => {
      const timer = setTimeout(() => {
        setAnimateDisappear(true);
        setTimeout(() => {
          setAnimateDisappear(false);
          setSnackbarQueue((snackbarQueue) => [...snackbarQueue.slice(1)]);
        }, 500);
      }, 5000); //Show snackbar for 5000ms
      snackbarQueue.push({ content: content, isError: isError ? isError : false, timer: timer });
      setSnackbarQueue([...snackbarQueue]);
    },
  }));

  const removeSnackbarItem = () => {
    setAnimateDisappear(true);
    clearTimeout(snackbarQueue[0].timer);
    setTimeout(() => {
      setAnimateDisappear(false);
      setSnackbarQueue((snackbarQueue) => [...snackbarQueue.slice(1)]);
    }, 500);
  };

  return (
    <div
      className="error-success-box-snackbar-fixed"
      style={{
        opacity: snackbarQueue.length > 0 ? 1 : 0,
        transform: snackbarQueue.length > 0 ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 500ms, transform 500ms',
      }}
      onClick={() => {
        removeSnackbarItem();
      }}
    >
      {snackbarQueue.map((snackbar, index) => {
        return (
          <div
            key={index}
            style={{
              transition: index === 0 && animateDisappear ? 'transform 500ms' : '',
              transform: index === 0 && animateDisappear ? 'translateX(-100%)' : '',
            }}
          >
            <ErrorSuccessBox
              style={{ marginBottom: '-10px' }}
              success={!snackbar?.isError}
              error={snackbar?.isError}
              content={snackbar?.content}
            />
          </div>
        );
      })}
    </div>
  );
});

Snackbar.displayName = 'Snackbar';

Snackbar.propTypes = {
  children: PropTypes.node,
};

export { SnackbarContext, SnackbarProvider };
