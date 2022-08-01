import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './state/user/userSlice';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
