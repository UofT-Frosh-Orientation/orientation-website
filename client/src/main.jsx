import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import configureAppStore, { sagaMiddleware } from './store';
import { Provider } from 'react-redux';
import userSaga from './state/user/saga';
import accountsSaga from './state/accounts/saga';

const store = configureAppStore();

sagaMiddleware.run(userSaga);
sagaMiddleware.run(accountsSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
