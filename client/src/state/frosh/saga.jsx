import { createAction } from '@reduxjs/toolkit';
import useAxios from '../../hooks/useAxios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { getFroshFailure, getFroshStart, getFroshSuccess } from './froshSlice';

export const getFrosh = createAction('getFroshSaga');

export function* getFroshSaga({ payload: { showAllUsers } }) {
  const { axios } = useAxios();
  try {
    yield put(getFroshStart());
    const result = yield call(axios.get, '/frosh/filtered-data');
    yield put(getFroshSuccess(showAllUsers ? result?.data?.users : result?.data?.frosh));
  } catch (e) {
    console.log(e);
    yield put(getFroshFailure(e));
  }
}
export default function* froshSaga() {
  yield takeLeading(getFrosh.type, getFroshSaga);
}
