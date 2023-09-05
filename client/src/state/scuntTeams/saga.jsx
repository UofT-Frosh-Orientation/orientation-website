import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import {
  getScuntTeamsStart,
  getScuntTeamsSuccess,
  getScuntTeamsFailure,
  setScuntTeamsStart,
  setScuntTeamsSuccess,
  setScuntTeamsFailure,
  getScuntTeamTransactionsStart,
  getScuntTeamTransactionsSuccess,
  getScuntTeamTransactionsFailure,
  updateScuntTeamsStart,
  updateScuntTeamsSuccess,
  updateScuntTeamsFailure,
  addPointsStart,
  addPointsSuccess,
  addPointsFailure,
  subtractPointsStart,
  subtractPointsSuccess,
  subtractPointsFailure,
  getMissionStatusStart,
  getMissionStatusSuccess,
  getMissionStatusFailure,
} from './scuntTeamsSlice';

import {
  updateUserInfoFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
} from '../user/userSlice';

import useAxios from '../../hooks/useAxios';

export const getScuntTeams = createAction('getScuntTeamsSaga');

export function* getScuntTeamsSaga({ payload: setSnackbar }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntTeamsStart());
    const result = yield call(axios.get, '/scunt-teams');

    yield put(getScuntTeamsSuccess(result.data.scuntTeams));
  } catch (error) {
    yield put(getScuntTeamsFailure(error.response.data.errorMessage));
    setSnackbar && setSnackbar(error.response.data.errorMessage, true);
  }
}

export const getScuntTeamTransactions = createAction('getScuntTeamSaga');

export function* getScuntTeamSaga({ payload: { teamNumber, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntTeamTransactionsStart());
    const result = yield call(axios.post, `/scunt-teams/transactions`, { teamNumber });
    yield put(getScuntTeamTransactionsSuccess(result.data?.transactions));
  } catch (error) {
    yield put(getScuntTeamTransactionsFailure(error.response.data.errorMessage));
    setSnackbar && setSnackbar(error.response.data.errorMessage, true);
  }
}

export const setScuntTeams = createAction('setGameTeamsSaga');

export function* setGameTeamsSaga({ payload: { scuntTeams, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(setScuntTeamsStart());
    const result = yield call(axios.put, '/scunt-teams/rename-teams', {
      teamObjs: scuntTeams,
    });
    setSnackbar('Scunt Teams Updated!');
    console.log(result);
    yield put(setScuntTeamsSuccess(result.data.scuntTeams));
  } catch (error) {
    console.error(error);
    setSnackbar(error.response?.data?.errorMessage, true);
    yield put(setScuntTeamsFailure(error.response.data));
  }
}

export const shuffleScuntTeams = createAction('shuffleScuntTeamsSaga');

export function* shuffleScuntTeamsSaga({ payload: setSnackbar }) {
  const { axios } = useAxios();
  try {
    yield put(updateScuntTeamsStart());
    const result = yield call(axios.post, '/scunt-teams/shuffle');
    yield put(updateScuntTeamsSuccess(result.data.scuntTeams));
    setSnackbar(result.data.message, false);
  } catch (error) {
    updateScuntTeamsFailure(error.response?.data?.errorMessage);
    setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export const changeScuntTeam = createAction('changeScuntTeamSaga');

export function* changeScuntTeamSaga({ payload: { teamNumber, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(updateUserInfoStart());

    const result = yield call(axios.post, '/scunt-teams/update-team', { teamNumber });
    setSnackbar('Team updated successfully!', false);
    yield put(updateUserInfoSuccess(result.data.user));
  } catch (error) {
    setSnackbar(error.response?.data?.errorMessage, true);
    yield put(updateUserInfoFailure(error.response?.data?.errorMessage));
  }
}

export const addPoints = createAction('addPointsSaga');

export function* addPointsSaga({ payload: { teamNumber, points, missionNumber, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(addPointsStart());
    const result = yield call(axios.post, '/scunt-teams/transaction/add', {
      teamNumber,
      points,
      missionNumber,
    });
    yield put(addPointsSuccess(result.data.scuntTeams));
    setSnackbar && setSnackbar(result?.data?.message, false);
  } catch (error) {
    yield put(addPointsFailure(error.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export const subtractPoints = createAction('subtractPointsSaga');

export function* subtractPointsSaga({ payload: { teamNumber, points, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(subtractPointsStart());
    const result = yield call(axios.post, '/scunt-teams/transaction/subtract', {
      teamNumber,
      points,
    });
    yield put(subtractPointsSuccess(result.data.scuntTeams));
    setSnackbar && setSnackbar('Points subtracted successfully!', false);
  } catch (error) {
    yield put(subtractPointsFailure(error.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export const getMissionStatus = createAction('getMissionStatusSaga');

export function* getMissionStatusSaga({ payload: { teamNumber, missionNumber, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(getMissionStatusStart());
    const result = yield call(axios.post, '/scunt-teams/transaction/check', {
      teamNumber,
      missionNumber,
    });
    yield put(getMissionStatusSuccess(result.data?.missionStatus));
    setSnackbar && setSnackbar('Mission status retrieved successfully!', false);
  } catch (error) {
    yield put(getMissionStatusFailure(error.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export const submitBribePoints = createAction('submitBribePointsSaga');

export function* submitBribePointsSaga({ payload: { teamNumber, points, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(addPointsStart());
    yield put(updateUserInfoStart());
    const result = yield call(axios.post, '/scunt-teams/transaction/bribe', {
      teamNumber,
      points,
    });
    yield put(addPointsSuccess(result.data.scuntTeams));
    yield put(updateUserInfoSuccess(result.data.user));
  } catch (error) {
    yield put(addPointsFailure(error.response?.data?.errorMessage));
    yield put(updateUserInfoFailure(error.response?.data?.errorMessage));
    setSnackbar && setSnackbar(error.response?.data?.errorMessage, true);
  }
}

export default function* scuntTeamsSaga() {
  yield takeLeading(getScuntTeams.type, getScuntTeamsSaga);
  yield takeLeading(getScuntTeamTransactions.type, getScuntTeamSaga);
  yield takeLeading(setScuntTeams.type, setGameTeamsSaga);
  yield takeLeading(shuffleScuntTeams.type, shuffleScuntTeamsSaga);
  yield takeLeading(changeScuntTeam.type, changeScuntTeamSaga);
  yield takeLeading(subtractPoints.type, subtractPointsSaga);
  yield takeLeading(getMissionStatus.type, getMissionStatusSaga);
  yield takeLeading(addPoints.type, addPointsSaga);
  yield takeLeading(submitBribePoints.type, submitBribePointsSaga);
}
