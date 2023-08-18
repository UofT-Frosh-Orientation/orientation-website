import { createAction } from '@reduxjs/toolkit';
import useAxios from '../../hooks/useAxios';
import { put, call, takeLeading } from 'redux-saga/effects';
import {
  getFroshListFailure,
  getFroshListStart,
  getFroshListSuccess,
  redistributeFroshFailure,
  redistributeFroshStart,
  redistributeFroshSuccess,
  signInFroshStart,
  signInFroshSuccess,
  signInFroshFailure,
  preKitPickUpStart,
  preKitPickUpSuccess,
  preKitPickUpFailure,
  searchFroshListStart,
  searchFroshListSuccess,
  searchFroshListFailure,
} from './froshSlice';

export const getFroshList = createAction('getFroshListSaga');

export function* getFroshListSaga({ payload: { showAllUsers } }) {
  const { axios } = useAxios();
  try {
    yield put(getFroshListStart());
    const result = yield call(axios.get, '/frosh/filtered-data');
    yield put(getFroshListSuccess(showAllUsers ? result?.data?.users : result?.data?.frosh));
  } catch (e) {
    console.error(e);
    yield put(getFroshListFailure(e));
  }
}

export const clearFroshList = createAction('clearFroshListSaga');

export function* clearFroshListSaga() {
  yield put(getFroshListSuccess([]));
}

export const searchFroshList = createAction('searchFroshListSaga');

export function* searchFroshListSaga({ payload: { searchTerm, fields } }) {
  const { axios } = useAxios();
  try {
    yield put(searchFroshListStart());
    const result = yield call(axios.post, '/frosh/search', { searchTerm, fields });
    console.log(result?.data?.frosh);
    yield put(searchFroshListSuccess(result?.data?.frosh));
  } catch (error) {
    console.error(error);
    yield put(searchFroshListFailure(error?.response?.data?.errorMessage));
  }
}

export const redistributeFrosh = createAction('redistributeFroshSaga');

export function* redistributeFroshSaga() {
  const { axios } = useAxios();
  try {
    yield put(redistributeFroshStart());
    const result = yield call(axios.post, '/frosh/redistribute');
    yield put(redistributeFroshSuccess(result?.data?.reassignedFrosh));
  } catch (e) {
    console.error(e);
    yield put(redistributeFroshFailure(e));
  }
}

export const signInFrosh = createAction('signInFroshSaga');

export function* signInFroshSaga({ payload: { userID } }) {
  const { axios } = useAxios();
  try {
    yield put(signInFroshStart());
    const date = new Date();
    const result = yield call(axios.put, '/qr/sign-in', {
      userID,
      date: date.toISOString(),
      tzOffset: date.getTimezoneOffset(),
    });
    yield put(signInFroshSuccess(result?.data?.frosh));
  } catch (error) {
    console.error(error);
    yield put(signInFroshFailure(error?.response?.data?.errorMessage));
  }
}

export const preKitPickUp = createAction('preKitPickUpSaga');

export function* preKitPickUpSaga({ payload: { userID } }) {
  const { axios } = useAxios();
  try {
    yield put(preKitPickUpStart());
    const date = new Date();
    const result = yield call(axios.put, '/qr/prekit', {
      userID,
      date: date.toISOString(),
      tzOffset: date.getTimezoneOffset(),
    });
    yield put(preKitPickUpSuccess(result?.data?.frosh));
  } catch (error) {
    console.error(error);
    yield put(preKitPickUpFailure(error?.response?.data?.errorMessage));
  }
}

export default function* froshSaga() {
  yield takeLeading(getFroshList.type, getFroshListSaga);
  yield takeLeading(redistributeFrosh.type, redistributeFroshSaga);
  yield takeLeading(signInFrosh.type, signInFroshSaga);
  yield takeLeading(preKitPickUp.type, preKitPickUpSaga);
  yield takeLeading(searchFroshList.type, searchFroshListSaga);
  yield takeLeading(clearFroshList.type, clearFroshListSaga);
}
