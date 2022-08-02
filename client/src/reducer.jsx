import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';
import accountsReducer from './state/accounts/accountSlice';

const rootReducer = combineReducers({
  userReducer,
  accountsReducer,
});

export default rootReducer;
