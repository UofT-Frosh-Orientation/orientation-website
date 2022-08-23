import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';
import useAxios from '../../hooks/useAxios';
import {
  getScuntSettingsStart,
  getScuntSettingsSuccess,
  getScuntSettingsFailure,
  setScuntSettingsStart,
  setScuntSettingsSuccess,
  setScuntSettingsFailure,
} from './scuntSettingsSlice';

export const getScuntSettings = createAction('getScuntSettingsSaga');

export function* getScuntSettingsSaga() {
  const { axios } = useAxios();
  //yield call(console.log, 'saga get scunt game settings');
  try {
    yield put(getScuntSettingsStart());
    const result = yield call(axios.get, '/scunt-game-controls');
    //console.log('saga result', result);
    yield put(getScuntSettingsSuccess(result.data.settings));
  } catch (error) {
    //console.log(error);
    yield put(getScuntSettingsFailure(error.response.data));
  }
}

export const setScuntSettings = createAction('setGameSettingsSaga');

export function* setGameSettingsSaga({
  payload: {
    setSnackbar,
    name,
    amountOfTeams,
    amountOfStarterBribePoints,
    maxAmountPointsPercent,
    minAmountPointsPercent,
    revealTeams,
    discordLink,
    revealLeaderboard,
    revealMissions,
    allowJudging,
  },
}) {
  const { axios } = useAxios();
  try {
    //console.log('saga set scunt game settings');
    yield put(setScuntSettingsStart());
    const result = yield call(axios.post, '/scunt-game-controls', {
      name,
      amountOfTeams,
      amountOfStarterBribePoints,
      maxAmountPointsPercent,
      minAmountPointsPercent,
      revealTeams,
      discordLink,
      revealLeaderboard,
      revealMissions,
      allowJudging,
    });
    yield put(setScuntSettingsSuccess(result.data.settings));
  } catch (error) {
    setSnackbar(
      error.response?.data?.message
        ? error.response?.data?.message.toString()
        : error.response?.data
        ? error.response?.data.toString()
        : error.toString(),
      true,
    );
    //   setIsLoading(false);
    console.log(error);
    yield put(setScuntSettingsFailure(error.response.data));
  }
}

export default function* scuntSettingsSaga() {
  yield takeLeading(getScuntSettings.type, getScuntSettingsSaga);
  yield takeLeading(setScuntSettings.type, setGameSettingsSaga);
}
