import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import {
  loginStart,
  loginFail,
  loginSuccess,
  setUserInfo,
  logoutSuccess,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordStart,
  requestPasswordResetStart,
  requestPasswordResetSuccess,
  requestPasswordResetFailure,
  logoutStart,
  logoutFailure,
} from '../userSlice';
import useAxios from '../../hooks/useAxios';

export const login = createAction('loginSaga');

export function* loginSaga({ payload: { email, password } }) {
  const { axios } = useAxios();
  try {
    yield put(loginStart());
    const result = yield call(axios.post, '/user/login', { email, password });
    yield put(loginSuccess(result.data.user));
  } catch (error) {
    yield put(loginFail(error.response.data));
  }
}

export const getUserInfo = createAction('getUserInfoSaga');

export function* getUserInfoSaga({ payload: navigate }) {
  const { axios } = useAxios();
  try {
    const result = yield call(axios.get, '/user/info');
    yield put(setUserInfo(result.data.user));
  } catch (error) {
    console.log(error);
    yield put(logoutSuccess());
    navigate && navigate('/login');
  }
}

export const updateUserInfo = createAction('updateUserInfoSaga');

export function* updateUserInfoSaga({ payload: { newInfo, navigate } }) {
  const { axios } = useAxios();
  try {
    const result = yield call(axios.put, '/frosh/info', newInfo);
    console.log(result);
    yield put(setUserInfo(result.data.user));
    navigate('/profile');
  } catch (error) {
    console.log(error);
    yield put(loginFail(error.response.data));
  }
}

export const signUp = createAction('createUserSaga');

export function* createUserSaga({ payload: user }) {
  const { axios } = useAxios();
  try {
    yield put(loginStart());
    const result = yield call(axios.post, '/user/signup', user);
    yield put(loginSuccess(result.data.user));
  } catch (error) {
    console.log(error);
    yield put(loginFail(error.response.data));
  }
}

export const resetPassword = createAction('resetPasswordSaga');

export function* resetPasswordSaga({ payload: { email, password, token } }) {
  const { axios } = useAxios();
  try {
    yield put(resetPasswordStart());
    const result = yield call(axios.post, '/user/reset-password', { email, password, token });
    yield put(resetPasswordSuccess());
  } catch (err) {
    console.log(err);
    yield put(resetPasswordFailure());
  }
}

export const requestPasswordReset = createAction('requestPasswordResetSaga');

export function* requestPasswordResetSaga({ payload: email }) {
  const { axios } = useAxios();
  try {
    yield put(requestPasswordResetStart());
    const result = yield call(axios.post, '/user/request-password-reset', { email });
    yield put(requestPasswordResetSuccess());
  } catch (err) {
    console.log(err);
    yield put(requestPasswordResetFailure());
  }
}

export const logout = createAction('logoutSaga');

export function* logoutSaga({ payload: { navigate, setShowLogoutPopup } }) {
  console.log('Logging out p2');
  const { axios } = useAxios();

  try {
    yield put(logoutStart());
    const result = yield call(axios.post, '/user/logout');
    yield put(logoutSuccess());
    setShowLogoutPopup(false);
    yield call(navigate, '/');
  } catch (err) {
    console.log(err);
    yield put(logoutFailure(err));
  }
}

export default function* userSaga() {
  yield takeLeading(login.type, loginSaga);
  yield takeLeading(getUserInfo.type, getUserInfoSaga);
  yield takeLeading(updateUserInfo.type, updateUserInfoSaga);
  yield takeLeading(signUp.type, createUserSaga);
  yield takeLeading(resetPassword.type, resetPasswordSaga);
  yield takeLeading(requestPasswordReset.type, requestPasswordResetSaga);
  yield takeLeading(logout.type, logoutSaga);
}
