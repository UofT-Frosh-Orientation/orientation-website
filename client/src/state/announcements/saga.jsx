import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';
import useAxios from '../../hooks/useAxios';
import {
  getAnnouncementsStart,
  getAnnouncementsSuccess,
  getAnnouncementsFailure,
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
    // if (sendAsEmail) {
    //   logic to send announcement email
    // }
    yield put(createAnnouncementsSuccess());
    setSnackbar('Successfully Created!');
  } catch (e) {
    setSnackbar(
      e.response?.data?.message
        ? e.response?.data?.message.toString()
        : e.response?.data
        ? e.response?.data.toString()
        : e.toString(),
      true,
    );
    yield put(createAnnouncementsFailure(e));
  }
}

export const completeAnnouncements = createAction('completeAnnouncementsSaga');

export function* completeAnnouncementsSaga({ payload: { announcementData } }) {
  const { axios } = useAxios();
  try {
    yield put(completeAnnouncementsStart());
    const response = yield call(axios.put, `/announcements/${announcementData.id}/complete`, {
      announcementData,
    });
    yield put(completeAnnouncementsSuccess());
  } catch (e) {
    yield put(completeAnnouncementsFailure(e));
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
  } catch (e) {
    setSnackbar(
      e.response?.data?.message
        ? e.response?.data?.message.toString()
        : e.response?.data
        ? e.response?.data.toString()
        : e.toString(),
      true,
    );
    yield put(editAnnouncementsFailure(e));
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
  } catch (e) {
    setSnackbar(
      e.response?.data?.message
        ? e.response?.data?.message.toString()
        : e.response?.data
        ? e.response?.data.toString()
        : e.toString(),
      true,
    );
    yield put(deleteAnnouncementsFailure(e));
  }
}

export default function* announcementsSaga() {
  yield takeLeading(getAnnouncements.type, getAnnouncementsSaga);
  yield takeLeading(createAnnouncements.type, createAnnouncementsSaga);
  yield takeLeading(completeAnnouncements.type, completeAnnouncementsSaga);
  yield takeLeading(editAnnouncement.type, editAnnouncementSaga);
  yield takeLeading(deleteAnnouncement.type, deleteAnnouncementSaga);
}
