import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: null,
  scuntSettings: undefined,
  judges: [],
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
    getJudgesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getJudgesSuccess: (state, { payload: judges }) => {
      state.loading = false;
      state.error = null;
      state.judges = judges;
    },
    getJudgesFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    giveJudgeBribePointsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    giveJudgeBribePointsSuccess: (state, { payload: judges }) => {
      state.loading = false;
      state.error = null;
      state.judges = judges;
    },
    giveJudgeBribePointsFailure: (state, { payload: error }) => {
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
  getJudgesStart,
  getJudgesSuccess,
  getJudgesFailure,
  giveJudgeBribePointsStart,
  giveJudgeBribePointsSuccess,
  giveJudgeBribePointsFailure,
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

// export const showDiscordLinkSelector = createSelector(
//   scuntSettingsReducerSelector,
//   ({ scuntSettings }) => scuntSettings?.showDiscordLink,
// );

// export const discordLinkSelector = createSelector(
//   scuntSettingsReducerSelector,
//   ({ scuntSettings }) => scuntSettings?.discordLink,
// );

export const scuntJudgeSelector = createSelector(
  scuntSettingsReducerSelector,
  ({ judges, loading, error }) => ({ judges, loading, error }),
);
