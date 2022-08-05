import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';
import accountsReducer from './state/accounts/accountSlice';
import froshReducer from './state/frosh/froshSlice';

const rootReducer = combineReducers({
  userReducer,
  accountsReducer,
  froshReducer,
});

export default rootReducer;
