import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: false,
  frosh: [],
};

const froshSlice = createSlice({
  name: 'froshReducer',
  initialState,
  reducers: {
    getFroshStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFroshSuccess: (state, { payload: frosh }) => {
      state.loading = false;
      state.error = null;
      state.frosh = frosh;
    },
    getFroshFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    redistributeFroshStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    redistributeFroshSuccess: (state, { payload: reassignedFrosh }) => {
      state.loading = false;
      state.error = null;
      state.frosh = reassignedFrosh;
    },
    redistributeFroshFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getFroshStart,
  getFroshSuccess,
  getFroshFailure,
  redistributeFroshStart,
  redistributeFroshSuccess,
  redistributeFroshFailure,
} = froshSlice.actions;

export default froshSlice.reducer;

export const froshReducerSelector = (state) => state[froshSlice.name];

export const froshSelector = createSelector(froshReducerSelector, ({ frosh, loading, error }) => ({
  frosh,
  loading,
  error,
}));

export const registeredFroshSelector = createSelector(
  froshReducerSelector,
  ({ frosh, loading, error }) => ({
    registeredFrosh: frosh.filter((f) => f.isRegistered),
    loading,
    error,
  }),
);
