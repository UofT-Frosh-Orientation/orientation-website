import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';
import accountsReducer from './state/accounts/accountSlice';
import announcementsReducer from './state/announcements/announcementsSlice';
import froshReducer from './state/frosh/froshSlice';
import scuntSettingsReducer from './state/scuntSettings/scuntSettingsSlice';
import scuntMissionsReducer from './state/scuntMissions/scuntMissionsSlice';

const rootReducer = combineReducers({
  userReducer,
  accountsReducer,
  froshReducer,
  scuntSettingsReducer,
  announcementsReducer,
  scuntMissionsReducer,
});

export default rootReducer;
