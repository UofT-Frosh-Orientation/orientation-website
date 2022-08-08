import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';
import useAxios from '../../hooks/useAxios';
import {
  getAnnouncementsStart,
  getAnnouncementsSuccess,
  getAnnouncementsFailure,
} from './announcementSlice';

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

export default function* announcementsSaga() {
  yield takeLeading(getAnnouncements.type, getAnnouncementsSaga);
}
