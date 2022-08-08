import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  loading: false,
  error: null,
  announcements: [],
};

const announcementSlice = createSlice({
  name: 'announcementsReducer',
  initialState,
  reducers: {
    getAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAnnouncementsSuccess: (state, { payload: announcements }) => {
      state.loading = false;
      state.error = null;
      state.announcements = announcements;
    },
    getAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { getAnnouncementsStart, getAnnouncementsSuccess, getAnnouncementsFailure } =
  announcementSlice.actions;

export default announcementSlice.reducer;

export const announcementReducerSelector = (state) => state[announcementSlice.name];

export const announcementsSelector = createSelector(
  announcementReducerSelector,
  ({ announcements, loading, error }) => ({ announcements, loading, error }),
);
