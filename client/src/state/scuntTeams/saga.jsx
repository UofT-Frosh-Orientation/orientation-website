import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import {
  getScuntTeamsStart,
  getScuntTeamsSuccess,
  getScuntTeamsFailure,
  setScuntTeamsStart,
  setScuntTeamsSuccess,
  setScuntTeamsFailure,
  getScuntTeamStart,
  getScuntTeamSuccess,
  getScuntTeamFailure,
  updateScuntTeamsStart,
  updateScuntTeamsSuccess,
  updateScuntTeamsFailure,
} from './scuntTeamsSlice';

import {
  updateUserInfoFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
} from '../user/userSlice';

import useAxios from '../../hooks/useAxios';

export const getScuntTeams = createAction('getScuntTeamsSaga');

export function* getScuntTeamsSaga({ payload: { setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(getScuntTeamsStart());
    const result = yield call(axios.get, '/scunt-teams');

    yield put(getScuntTeamsSuccess(result.data.teams));
  } catch (error) {
    yield put(getScuntTeamsFailure(error.response.data.errorMessage));
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
    yield put(updateScuntTeamsSuccess(result.data.teams));
    setSnackbar('Teams shuffled successfully!', false);
  } catch (error) {
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

export default function* scuntTeamsSaga() {
  yield takeLeading(getScuntTeams.type, getScuntTeamsSaga);
  yield takeLeading(setScuntTeams.type, setGameTeamsSaga);
  yield takeLeading(shuffleScuntTeams.type, shuffleScuntTeamsSaga);
  yield takeLeading(changeScuntTeam.type, changeScuntTeamSaga);
}
