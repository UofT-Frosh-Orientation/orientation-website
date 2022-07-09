import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  user: undefined,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginFail: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    loginSuccess: (state, { payload: user }) => {
      state.loading = false;
      state.error = null;
      state.user = user;
    },
    logoutSuccess: (state) => {
      state.user = undefined;
    },
    setUserInfo: (state, { payload: user }) => {
      state.user = user;
    },
  },
});

export const { loginStart, loginFail, loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;

export const userReducerSelector = (state) => state[userSlice.name];

export const userSelector = createSelector(userReducerSelector, ({ user, loading, error }) => ({
  user,
  loading,
  error,
}));
