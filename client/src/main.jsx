import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import configureAppStore, { sagaMiddleware } from './store';
import { Provider } from 'react-redux';
import userSaga from './state/user/saga';
import accountsSaga from './state/accounts/saga';
import announcementsSaga from './state/announcements/saga';
import froshSaga from './state/frosh/saga';
import scuntSettingsSaga from './state/scuntSettings/saga';
import scuntMissionsSaga from './state/scuntMissions/saga';
import scuntTeamsSaga from './state/scuntTeams/saga';

const store = configureAppStore();

sagaMiddleware.run(userSaga);
sagaMiddleware.run(accountsSaga);
sagaMiddleware.run(announcementsSaga);
sagaMiddleware.run(froshSaga);
sagaMiddleware.run(scuntSettingsSaga);
sagaMiddleware.run(scuntMissionsSaga);
sagaMiddleware.run(scuntTeamsSaga);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
