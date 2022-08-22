import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  user: undefined,
  loggedIn: undefined,
  resetPasswordSucceeded: false,
  passwordResetRequest: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.loggedIn = undefined;
    },
    loginFail: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
      state.loggedIn = false;
    },
    loginSuccess: (state, { payload: user }) => {
      state.loading = false;
      state.error = null;
      state.user = user;
      state.loggedIn = true;
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    logoutFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.loading = false;
      state.error = null;
    },
    setUserInfo: (state, { payload: user }) => {
      state.user = user;
      state.loggedIn = true;
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.user = null;
      state.resetPasswordSucceeded = false;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordSucceeded = true;
      state.loading = false;
      state.error = false;
    },
    resetPasswordFailure: (state) => {
      state.resetPasswordSucceeded = false;
      state.loading = false;
      state.error = true;
    },
    requestPasswordResetStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    requestPasswordResetSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.passwordResetRequest = true;
    },
    requestPasswordResetFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
      state.passwordResetRequest = false;
    },
    updateUserInfoStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateUserInfoSuccess: (state, { payload: user }) => {
      state.loading = false;
      state.error = false;
      state.user = user;
    },
    updateUserInfoFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    unsubscribeUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    unsubscribeUserSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    unsubscribeUserFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  loginStart,
  loginFail,
  loginSuccess,
  logoutStart,
  logoutFailure,
  logoutSuccess,
  setUserInfo,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  requestPasswordResetStart,
  requestPasswordResetFailure,
  requestPasswordResetSuccess,
  updateUserInfoFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
  unsubscribeUserStart,
  unsubscribeUserSuccess,
  unsubscribeUserFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const userReducerSelector = (state) => state[userSlice.name];

export const userSelector = createSelector(userReducerSelector, ({ user, loading, error }) => ({
  user,
  loading,
  error,
}));

export const loggedInSelector = createSelector(userReducerSelector, ({ loggedIn }) => loggedIn);

export const registeredSelector = createSelector(
  userReducerSelector,
  ({ user }) => user?.isRegistered ?? false,
);

export const initialsSelector = createSelector(
  userReducerSelector,
  ({ user }) => `${user?.firstName?.toUpperCase()[0]}${user?.lastName?.toUpperCase()[0]}`,
);

export const passwordResetSelector = createSelector(
  userReducerSelector,
  ({ loading, error, resetPasswordSucceeded }) => ({ loading, error, resetPasswordSucceeded }),
);

export const requestPasswordResetSelector = createSelector(
  userReducerSelector,
  ({ loading, error, passwordResetRequest }) => ({ loading, error, passwordResetRequest }),
);
