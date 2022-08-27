import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  scuntSettings: undefined,
  // scuntSettings: {
  //   revealJudgesAndBribes: false,
  //   revealTeams: false,
  //   showDiscordLink: false,
  //   revealLeaderboard: false,
  //   revealMissions: false,
  //   allowJudging: false,
  //   discordLink: '', //https://discord.gg/mRutbwuCK9
  // },
};

const scuntSettingsSlice = createSlice({
  name: 'scuntSettingsReducer',
  initialState,
  reducers: {
    getScuntSettingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScuntSettingsSuccess: (state, { payload: scuntSettings }) => {
      state.loading = false;
      state.error = null;
      state.scuntSettings = scuntSettings;
    },
    getScuntSettingsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },

    setScuntSettingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setScuntSettingsSuccess: (state, { payload: scuntSettings }) => {
      state.loading = false;
      state.error = null;
      state.scuntSettings = scuntSettings;
    },
    setScuntSettingsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getScuntSettingsStart,
  getScuntSettingsSuccess,
  getScuntSettingsFailure,
  setScuntSettingsStart,
  setScuntSettingsSuccess,
  setScuntSettingsFailure,
} = scuntSettingsSlice.actions;

export default scuntSettingsSlice.reducer;

export const scuntSettingsReducerSelector = (state) => state[scuntSettingsSlice.name];

export const scuntSettingsSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings, loading, error }) => ({ scuntSettings, loading, error }),
);

// selectors for individual settings...?

export const amountOfTeamsSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings }) => scuntSettings?.amountOfTeams,
);

export const amountOfStarterBribePointsSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings }) => scuntSettings?.amountOfStarterBribePoints,
);

export const maxAmountPointsPercentSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings }) => scuntSettings?.maxAmountPointsPercent,
);

export const showDiscordLinkSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings }) => scuntSettings?.showDiscordLink,
);

export const discordLinkSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ scuntSettings }) => scuntSettings?.discordLink,
);
