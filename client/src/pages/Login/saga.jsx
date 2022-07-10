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
  console.log(newInfo);
  console.log('Updating');
  const { axios } = useAxios();
  try {
    const result = yield call(axios.put, '/frosh/info', newInfo);
    console.log(result);
    yield put(setUserInfo(result.data.user));
    navigate('/profile');
  } catch (error) {
    console.log(error);
    yield put(loginFail(error));
  }
}

export default function* userSaga() {
  yield takeLeading(login.type, loginSaga);
  yield takeLeading(getUserInfo.type, getUserInfoSaga);
  yield takeLeading(updateUserInfo.type, updateUserInfoSaga);
}
