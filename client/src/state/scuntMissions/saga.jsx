import { createAction } from '@reduxjs/toolkit';
import useAxios from '../../hooks/useAxios';
import { put, call, takeLeading } from 'redux-saga/effects';
import {
  getScuntMissionsStart,
  getScuntMissionsSuccess,
  getScuntMissionsFailure,
} from './scuntMissionsSlice';

export const getScuntMissions = createAction('getScuntMissionsSaga');

export function* getScuntMissionsSaga({ payload: { showHidden, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntMissionsStart());
    const result = yield call(axios.get, `/scunt-missions/?showHidden=${showHidden}`);
    yield put(getScuntMissionsSuccess(result.data.missions));
    // setSnackbar("Successfully r")
  } catch (e) {
    setSnackbar(
      e.response.data.message
        ? e.response.data.message.toString()
        : e.response.data
        ? e.response.data.toString()
        : 'Uh oh, something went wrong! Please try again later.',
      true,
    );
  }
}

export default function* scuntMissionsSaga() {
  yield takeLeading(getScuntMissions.type, getScuntMissionsSaga);
}
