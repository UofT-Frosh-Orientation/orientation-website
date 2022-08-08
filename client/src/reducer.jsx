import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';
import accountsReducer from './state/accounts/accountSlice';
import announcementsReducer from './state/announcements/announcementsSlice';
import froshReducer from './state/frosh/froshSlice';

const rootReducer = combineReducers({
  userReducer,
  accountsReducer,
  froshReducer,
  announcementsReducer,
});

export default rootReducer;
