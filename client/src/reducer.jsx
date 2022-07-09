import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './pages/userSlice';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
