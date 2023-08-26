import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  scuntTeamTransactions: [],
  scuntTeam: {},
  missionStatus: null,
};

const scuntTeamsSlice = createSlice({
  name: 'scuntTeamsReducer',
  initialState,
  reducers: {
    getScuntTeamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScuntTeamsSuccess: (state, { payload: scuntTeams }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeams = scuntTeams;
    },
    getScuntTeamsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    setScuntTeamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setScuntTeamsSuccess: (state, { payload: scuntTeams }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeams = scuntTeams;
    },
    setScuntTeamsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    getScuntTeamTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScuntTeamTransactionsSuccess: (state, { payload: scuntTeamTransactions }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeamTransactions = scuntTeamTransactions;
    },
    getScuntTeamTransactionsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    updateScuntTeamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateScuntTeamsSuccess: (state, { payload: scuntTeams }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeams = scuntTeams;
    },
    updateScuntTeamsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    addPointsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPointsSuccess: (state, { payload: scuntTeams }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeams = scuntTeams;
    },
    addPointsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    subtractPointsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    subtractPointsSuccess: (state, { payload: scuntTeams }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeams = scuntTeams;
    },
    subtractPointsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    getMissionStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMissionStatusSuccess: (state, { payload: missionStatus }) => {
      state.loading = false;
      state.error = null;
      state.missionStatus = missionStatus;
    },
    getMissionStatusFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getScuntTeamsStart,
  getScuntTeamsSuccess,
  getScuntTeamsFailure,
  setScuntTeamsStart,
  setScuntTeamsSuccess,
  setScuntTeamsFailure,
  getScuntTeamTransactionsStart,
  getScuntTeamTransactionsSuccess,
  getScuntTeamTransactionsFailure,
  updateScuntTeamsStart,
  updateScuntTeamsSuccess,
  updateScuntTeamsFailure,
  addPointsStart,
  addPointsSuccess,
  addPointsFailure,
  subtractPointsStart,
  subtractPointsSuccess,
  subtractPointsFailure,
  getMissionStatusStart,
  getMissionStatusSuccess,
  getMissionStatusFailure,
} = scuntTeamsSlice.actions;

export default scuntTeamsSlice.reducer;

export const scuntTeamsReducerSelector = (state) => state[scuntTeamsSlice.name];

export const scuntTeamsSelector = createSelector(
  scuntTeamsReducerSelector,
  ({ scuntTeams, loading, error }) => ({ scuntTeams, loading, error }),
);

export const scuntTeamTransactionsSelector = createSelector(
  scuntTeamsReducerSelector,
  ({ scuntTeamTransactions, loading, error }) => ({ scuntTeamTransactions, loading, error }),
);

export const missionStatusSelector = createSelector(
  scuntTeamsReducerSelector,
  ({ missionStatus, loading, error }) => ({ missionStatus, loading, error }),
);
