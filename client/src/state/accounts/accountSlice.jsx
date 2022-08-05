import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  accounts: [],
  authRequests: [],
};

const accountSlice = createSlice({
  name: 'accountsReducer',
  initialState,
  reducers: {
    getAccountsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAccountsSuccess: (state, { payload: accounts }) => {
      state.loading = false;
      state.error = null;
      state.accounts = accounts;
    },
    getAccountsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    updateAccountsAuthStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAccountsAuthFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    updateAccountsAuthSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    getAuthRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthRequestsSuccess: (state, { payload: authRequests }) => {
      state.loading = false;
      state.error = null;
      state.authRequests = authRequests;
    },
    getAuthRequestsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getAccountsFailure,
  getAccountsSuccess,
  getAccountsStart,
  getAuthRequestsFailure,
  getAuthRequestsStart,
  getAuthRequestsSuccess,
  updateAccountsAuthFailure,
  updateAccountsAuthStart,
  updateAccountsAuthSuccess,
} = accountSlice.actions;

export default accountSlice.reducer;

export const accountReducerSelector = (state) => state[accountSlice.name];

export const accountsSelector = createSelector(
  accountReducerSelector,
  ({ accounts, loading, error }) => ({ accounts, loading, error }),
);

export const authRequestsSelector = createSelector(
  accountReducerSelector,
  ({ authRequests, loading, error }) => ({ authRequests, loading, error }),
);
