import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  scuntTeams: [],
  scuntTeam: {},
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
    getScuntTeamStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScuntTeamSuccess: (state, { payload: scuntTeam }) => {
      state.loading = false;
      state.error = null;
      state.scuntTeam = scuntTeam;
    },
    getScuntTeamFailure: (state, { payload: error }) => {
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
  },
});

export const {
  getScuntTeamsStart,
  getScuntTeamsSuccess,
  getScuntTeamsFailure,
  setScuntTeamsStart,
  setScuntTeamsSuccess,
  setScuntTeamsFailure,
  getScuntTeamStart,
  getScuntTeamSuccess,
  getScuntTeamFailure,
  updateScuntTeamsStart,
  updateScuntTeamsSuccess,
  updateScuntTeamsFailure,
} = scuntTeamsSlice.actions;

export default scuntTeamsSlice.reducer;

export const scuntTeamsReducerSelector = (state) => state[scuntTeamsSlice.name];

export const scuntTeamsSelector = createSelector(
  scuntTeamsReducerSelector,
  ({ scuntTeams, loading, error }) => ({ scuntTeams, loading, error }),
);

export const scuntTeamSelector = createSelector(
  scuntTeamsReducerSelector,
  ({ scuntTeam, loading, error }) => ({ scuntTeam, loading, error }),
);
