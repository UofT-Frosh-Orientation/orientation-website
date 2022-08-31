import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: false,
  missions: [],
};

const scuntMissionsSlice = createSlice({
  name: 'scuntMissionsReducer',
  initialState,
  reducers: {
    getScuntMissionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScuntMissionsSuccess: (state, { payload: missions }) => {
      state.loading = false;
      state.missions = missions;
    },
    getScuntMissionsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { getScuntMissionsStart, getScuntMissionsSuccess, getScuntMissionsFailure } =
  scuntMissionsSlice.actions;

export default scuntMissionsSlice.reducer;

export const scuntMissionsReducerSelector = (state) => state[scuntMissionsSlice.name];

export const scuntMissionsSelector = createSelector(
  scuntMissionsReducerSelector,
  ({ loading, error, missions }) => ({ loading, error, missions }),
);
