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
  const { axios } = useAxios();
  try {
    yield put(getScuntSettingsStart());
    const result = yield call(axios.get, '/scunt-game-controls');

    yield put(getScuntSettingsSuccess(result.data.settings));
  } catch (error) {
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
    revealJudgesAndBribes,
    revealTeams,
    showDiscordLink,
    discordLink,
    revealLeaderboard,
    revealMissions,
    allowJudging,
  },
}) {
  const { axios } = useAxios();
  try {
    yield put(setScuntSettingsStart());
    const result = yield call(axios.post, '/scunt-game-controls', {
      name,
      amountOfTeams,
      amountOfStarterBribePoints,
      maxAmountPointsPercent,
      minAmountPointsPercent,
      revealJudgesAndBribes,
      revealTeams,
      showDiscordLink,
      discordLink,
      revealLeaderboard,
      revealMissions,
      allowJudging,
    });
    setSnackbar('Scunt Settings Updated!');
    yield put(setScuntSettingsSuccess(result.data.settings));
  } catch (error) {
    console.error(error);
    setSnackbar(
      error.response?.data?.message
        ? error.response?.data?.message.toString()
        : error.response?.data
        ? error.response?.data.toString()
        : error.toString(),
      true,
    );
    console.error(error);
    yield put(setScuntSettingsFailure(error.response.data));
  }
}

export const shuffleScuntTeams = createAction('shuffleScuntTeamsSaga');

export function* shuffleScuntTeamsSaga({ payload: setSnackbar }) {
  const { axios } = useAxios();
  try {
    yield call(axios.post, '/scunt-teams/shuffle');
    setSnackbar('Teams shuffled successfully!', false);
  } catch (error) {
    setSnackbar(
      error.response?.data?.message
        ? error.response?.data?.message.toString()
        : error.response?.data
        ? error.response?.data.toString()
        : error.toString(),
      true,
    );
  }
}

export default function* scuntSettingsSaga() {
  yield takeLeading(getScuntSettings.type, getScuntSettingsSaga);
  yield takeLeading(setScuntSettings.type, setGameSettingsSaga);
  yield takeLeading(shuffleScuntTeams.type, shuffleScuntTeamsSaga);
}
