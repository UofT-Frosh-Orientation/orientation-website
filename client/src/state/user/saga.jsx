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
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
} from './userSlice';
import useAxios from '../../hooks/useAxios';

export const login = createAction('loginSaga');

export function* loginSaga({ payload: { setSnackbar, setIsLoading, email, password } }) {
  const { axios } = useAxios();
  try {
    yield put(loginStart());
    const result = yield call(axios.post, '/user/login', { email, password });
    yield put(loginSuccess(result.data.user));
  } catch (error) {
    setSnackbar(
      error.response?.data?.message
        ? error.response?.data?.message.toString()
        : error.response?.data
        ? error.response?.data.toString()
        : error.toString(),
      true,
    );
    setIsLoading(false);
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

export function* createUserSaga({ payload: { setSnackbar, setIsLoading, user } }) {
  const { axios } = useAxios();
  try {
    yield put(loginStart());
    const result = yield call(axios.post, '/user/signup', user);
    yield put(loginSuccess(result.data.user));
  } catch (error) {
    console.log(user);
    setSnackbar(
      error.response?.data?.message
        ? error.response?.data?.message.toString()
        : error.response?.data
        ? error.response?.data.toString()
        : error.toString(),
      true,
    );
    setIsLoading(false);
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

export function* logoutSaga({ payload: { navigate } }) {
  const { axios } = useAxios();

  try {
    yield put(logoutStart());
    const result = yield call(axios.post, '/user/logout');
    yield put(logoutSuccess());
    yield call(navigate, '/');
  } catch (err) {
    console.log(err);
    yield put(logoutFailure(err.response.data));
  }
}

export const requestAuthScopes = createAction('requestAuthScopesSaga');

export function* requestAuthScopesSaga({ payload: { authScopes, froshDataFields, setSnackbar } }) {
  const { axios } = useAxios();
  try {
    yield put(updateUserInfoStart());
    const result = yield call(axios.post, '/user/request-auth-scopes', {
      authScopes,
      froshDataFields,
    });
    yield put(updateUserInfoSuccess(result.data.user));
    setSnackbar('Success!', false);
  } catch (err) {
    console.log(err);
    yield put(updateUserInfoFailure(err.response.data));
    setSnackbar(
      err.response.data.message
        ? err.response.data.message.toString()
        : 'Uh oh, looks like something went wrong on our end! Please try again later',
      true,
    );
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
  yield takeLeading(requestAuthScopes.type, requestAuthScopesSaga);
}
