import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import {
  getScuntSettingsStart,
  getScuntSettingsSuccess,
  getScuntSettingsFailure,
  setScuntSettingsStart,
  setScuntSettingsSuccess,
  setScuntSettingsFailure,
} from './scuntSettingsSlice';

import useAxios from '../../hooks/useAxios';

export const getScuntSettings = createAction('getScuntSettingsSaga');

export function* getScuntSettingsSaga() {
  console.log('saga get scunt game settings');
  const { axios } = useAxios();
  try {
    yield put(getScuntSettingsStart());
    const result = yield call(axios.get, '/scunt-game-controls');
    yield put(getScuntSettingsSuccess(result.data.scuntSettings));
  } catch (error) {
    console.log(error);
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
  console.log('saga set scunt game settings');
  const { axios } = useAxios();
  try {
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
    yield put(setScuntSettingsSuccess(result.data.scuntSettings));
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
