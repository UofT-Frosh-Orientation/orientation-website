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
    setSnackbar && setSnackbar('Successfully retrieved missions');
  } catch (error) {
    yield put(getScuntMissionsFailure(error.response.data?.errorMessage));
    setSnackbar && setSnackbar(error.response.data?.errorMessage, true);
  }
}

export const createMultipleMissions = createAction('createMultipleMissionsSaga');

export function* createMultipleMissionsSaga({ payload: { array, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntMissionsStart());
    const result = yield call(axios.post, 'scunt-missions/bulk', { array });
    yield put(getScuntMissionsSuccess(result.data.missions));
    setSnackbar && setSnackbar('Successfully uploaded missions!', false);
  } catch (error) {
    console.error(error);
    yield put(getScuntMissionsFailure(error));
    setSnackbar && setSnackbar(error.response.data?.errorMessage, true);
  }
}

export default function* scuntMissionsSaga() {
  yield takeLeading(getScuntMissions.type, getScuntMissionsSaga);
  yield takeLeading(createMultipleMissions.type, createMultipleMissionsSaga);
}
