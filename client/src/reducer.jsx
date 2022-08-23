import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';
import accountsReducer from './state/accounts/accountSlice';
import froshReducer from './state/frosh/froshSlice';
import scuntSettingsReducer from './state/scuntSettings/scuntSettingsSlice';

const rootReducer = combineReducers({
  userReducer,
  accountsReducer,
  froshReducer,
  scuntSettingsReducer,
});

export default rootReducer;
