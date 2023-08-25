import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';
import useAxios from '../../hooks/useAxios';
import {
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
} from './announcementsSlice';

export const getAnnouncements = createAction('getAnnouncementsSaga');

export function* getAnnouncementsSaga() {
  const { axios } = useAxios();
  try {
    yield put(getAnnouncementsStart());
    const response = yield call(axios.get, '/announcements');
    yield put(getAnnouncementsSuccess(response.data?.announcements));
  } catch (e) {
    yield put(getAnnouncementsFailure(e));
  }
}

export const getCompletedAnnouncements = createAction('getCompletedAnnouncementsSaga');

export function* getCompletedAnnouncementsSaga() {
  const { axios } = useAxios();
  try {
    yield put(getCompletedAnnouncementsStart());
    const response = yield call(axios.get, '/announcements/completedAnnouncements');
    yield put(getCompletedAnnouncementsSuccess(response.data?.announcements));
  } catch (e) {
    yield put(getCompletedAnnouncementsFailure(e));
  }
}

export const createAnnouncements = createAction('createAnnouncementsSaga');

export function* createAnnouncementsSaga({
  payload: {
    setSnackbar,
    announcementData,
    // sendAsEmail
  },
}) {
  const { axios } = useAxios();
  try {
    yield put(createAnnouncementsStart());
    const response = yield call(axios.post, `/announcements/create`, { announcementData });
    yield put(createAnnouncementsSuccess());
    setSnackbar('Successfully Created!');
  } catch (error) {
    setSnackbar(error.response?.data?.errorMessage, true);
    yield put(createAnnouncementsFailure(error));
  }
}

export const completeAnnouncements = createAction('completeAnnouncementsSaga');

export function* completeAnnouncementsSaga({ payload: { announcementData } }) {
  const { axios } = useAxios();
  try {
    yield put(completeAnnouncementsStart());
    const response = yield call(axios.put, `/announcements/${announcementData.id}/complete`);
    yield put(completeAnnouncementsSuccess(response.data?.announcements));
  } catch (error) {
    yield put(completeAnnouncementsFailure(error.response?.data?.errorMessage));
  }
}

export const editAnnouncement = createAction('editAnnouncementSaga');

export function* editAnnouncementSaga({ payload: { setSnackbar, announcementData } }) {
  const { axios } = useAxios();
  try {
    yield put(editAnnouncementsStart());
    const response = yield call(axios.put, `/announcements/${announcementData.id}/edit`, {
      announcementData,
    });
    yield put(editAnnouncementsSuccess());
    setSnackbar('Successfully Edited!');
  } catch (error) {
    yield put(editAnnouncementsFailure(error.response?.data?.errorMessage));
    setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export const deleteAnnouncement = createAction('deleteAnnouncementSaga');

export function* deleteAnnouncementSaga({ payload: { setSnackbar, announcementData } }) {
  const { axios } = useAxios();
  try {
    yield put(deleteAnnouncementsStart());
    const response = yield call(axios.delete, `/announcements/${announcementData.id}/delete`);
    yield put(deleteAnnouncementsSuccess());
    setSnackbar('Successfully Deleted!');
  } catch (error) {
    yield put(deleteAnnouncementsFailure(error.response?.data?.errorMessage));
    setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export default function* announcementsSaga() {
  yield takeLeading(getAnnouncements.type, getAnnouncementsSaga);
  yield takeLeading(getCompletedAnnouncements.type, getCompletedAnnouncementsSaga);
  yield takeLeading(createAnnouncements.type, createAnnouncementsSaga);
  yield takeLeading(completeAnnouncements.type, completeAnnouncementsSaga);
  yield takeLeading(editAnnouncement.type, editAnnouncementSaga);
  yield takeLeading(deleteAnnouncement.type, deleteAnnouncementSaga);
}
