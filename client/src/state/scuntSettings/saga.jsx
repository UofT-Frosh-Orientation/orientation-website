import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import {
  getScuntSettingsStart,
  getScuntSettingsSuccess,
  getScuntSettingsFailure,
  setScuntSettingsStart,
  setScuntSettingsSuccess,
  setScuntSettingsFailure,
  getJudgesStart,
  getJudgesSuccess,
  getJudgesFailure,
  giveJudgeBribePointsStart,
  giveJudgeBribePointsSuccess,
  giveJudgeBribePointsFailure,
} from './scuntSettingsSlice';
import useAxios from '../../hooks/useAxios';

export const getScuntSettings = createAction('getScuntSettingsSaga');

export function* getScuntSettingsSaga({ payload: setSnackbar }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntSettingsStart());
    const result = yield call(axios.get, '/scunt-game-controls');
    yield put(getScuntSettingsSuccess(result.data.settings));
  } catch (error) {
    yield put(getScuntSettingsFailure(error?.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error?.response?.data?.errorMessage, true);
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
    setSnackbar(error.response?.data?.errorMessage, true);
    yield put(setScuntSettingsFailure(error.response?.data?.errorMessage));
  }
}

export const getJudges = createAction('getJudgesSaga');

export function* getJudgesSaga({ payload: setSnackbar }) {
  const { axios } = useAxios();
  try {
    yield put(getJudgesStart());
    const result = yield call(axios.get, '/scunt-teams/judges');
    yield put(getJudgesSuccess(result.data.judges));
  } catch (error) {
    yield put(getJudgesFailure(error?.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error?.response?.data?.errorMessage, true);
  }
}

export const giveJudgeBribePoints = createAction('giveJudgeBribePointsSaga');

export function* giveJudgeBribePointsSaga({
  payload: { judgeUserId, points, isAddPoints, setSnackbar },
}) {
  const { axios } = useAxios();
  try {
    yield put(giveJudgeBribePointsStart());
    const result = yield call(axios.post, '/scunt-teams/transaction/refill-bribe', {
      judgeUserId,
      points,
      isAddPoints,
    });
    setSnackbar(result.data.message);
    yield put(giveJudgeBribePointsSuccess(result.data.judges));
  } catch (error) {
    yield put(giveJudgeBribePointsFailure(error?.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error?.response?.data?.errorMessage, true);
  }
}

export default function* scuntSettingsSaga() {
  yield takeLeading(getScuntSettings.type, getScuntSettingsSaga);
  yield takeLeading(setScuntSettings.type, setGameSettingsSaga);
  yield takeLeading(getJudges.type, getJudgesSaga);
  yield takeLeading(giveJudgeBribePoints.type, giveJudgeBribePointsSaga);
}
