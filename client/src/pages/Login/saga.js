import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';

import { loginStart, loginFail, loginSuccess, setUserInfo, logoutSuccess } from '../userSlice';
import useAxios from '../../hooks/useAxios';

export const login = createAction('loginSaga');

export function* loginSaga({ payload: { email, password } }) {
  const { axios } = useAxios();
  try {
    yield put(loginStart());
    const result = yield call(axios.post, '/user/login', { email, password });
    yield put(loginSuccess(result.data.user));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export const getUserInfo = createAction('getUserInfoSaga');

export function* getUserInfoSaga({ payload: navigate }) {
  console.log('Getting user info');
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

export default function* userSaga() {
  yield takeLeading(login.type, loginSaga);
  yield takeLeading(getUserInfo.type, getUserInfoSaga);
}
