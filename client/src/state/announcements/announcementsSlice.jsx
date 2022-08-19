import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  loading: false,
  error: null,
  announcements: [],
  completedAnnouncements: [],
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
    getCompletedAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCompletedAnnouncementsSuccess: (state, { payload: completedAnnouncements }) => {
      state.loading = false;
      state.error = null;
      state.completedAnnouncements = completedAnnouncements;
    },
    getCompletedAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    createAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    createAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    completeAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    completeAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    completeAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    editAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteAnnouncementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAnnouncementsFailure: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
    deleteAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getAnnouncementsStart,
  getAnnouncementsSuccess,
  getAnnouncementsFailure,
  getCompletedAnnouncementsStart,
  getCompletedAnnouncementsSuccess,
  getCompletedAnnouncementsFailure,
  createAnnouncementsStart,
  createAnnouncementsFailure,
  createAnnouncementsSuccess,
  completeAnnouncementsStart,
  completeAnnouncementsFailure,
  completeAnnouncementsSuccess,
  editAnnouncementsStart,
  editAnnouncementsFailure,
  editAnnouncementsSuccess,
  deleteAnnouncementsStart,
  deleteAnnouncementsFailure,
  deleteAnnouncementsSuccess,
} = announcementSlice.actions;

export default announcementSlice.reducer;

export const announcementReducerSelector = (state) => state[announcementSlice.name];

export const announcementsSelector = createSelector(
  announcementReducerSelector,
  ({ announcements, loading, error }) => ({ announcements, loading, error }),
);

export const completedAnnouncementsSelector = createSelector(
  announcementReducerSelector,
  ({ completedAnnouncements, loading, error }) => ({ completedAnnouncements, loading, error }),
);
