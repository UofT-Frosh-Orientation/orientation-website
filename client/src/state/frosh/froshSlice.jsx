import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const initialState = {
  loading: false,
  error: false,
  frosh: null,
  froshList: [],
};

const froshSlice = createSlice({
  name: 'froshReducer',
  initialState,
  reducers: {
    getFroshListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFroshListSuccess: (state, { payload: frosh }) => {
      state.loading = false;
      state.error = null;
      state.froshList = frosh;
    },
    getFroshListFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    searchFroshListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchFroshListSuccess: (state, { payload: frosh }) => {
      state.loading = false;
      state.error = null;
      state.froshList = frosh;
    },
    searchFroshListFailure: (state, { payload: error }) => {
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
      state.froshList = reassignedFrosh;
    },
    redistributeFroshFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    signInFroshStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInFroshSuccess: (state, { payload: signedInFrosh }) => {
      state.loading = false;
      state.error = null;
      state.frosh = signedInFrosh;
    },
    signInFroshFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    preKitPickUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    preKitPickUpSuccess: (state, { payload: preKitFrosh }) => {
      state.loading = false;
      state.error = null;
      state.frosh = preKitFrosh;
    },
    preKitPickUpFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getFroshListStart,
  getFroshListSuccess,
  getFroshListFailure,
  redistributeFroshStart,
  redistributeFroshSuccess,
  redistributeFroshFailure,
  signInFroshStart,
  signInFroshSuccess,
  signInFroshFailure,
  preKitPickUpStart,
  preKitPickUpSuccess,
  preKitPickUpFailure,
  searchFroshListStart,
  searchFroshListSuccess,
  searchFroshListFailure,
} = froshSlice.actions;

export default froshSlice.reducer;

export const froshReducerSelector = (state) => state[froshSlice.name];

export const froshSelector = createSelector(froshReducerSelector, ({ frosh, loading, error }) => ({
  frosh,
  loading,
  error,
}));

export const froshListSelector = createSelector(
  froshReducerSelector,
  ({ froshList, loading, error }) => ({
    froshList,
    loading,
    error,
  }),
);

export const registeredFroshSelector = createSelector(
  froshReducerSelector,
  ({ froshList, loading, error }) => ({
    registeredFrosh: froshList.filter((f) => f.isRegistered),
    loading,
    error,
  }),
);
