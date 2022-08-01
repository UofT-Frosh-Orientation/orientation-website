import { createAction } from '@reduxjs/toolkit';
import { put, call, takeLeading } from 'redux-saga/effects';
import useAxios from '../../hooks/useAxios';
import {
  getAccountsFailure,
  getAccountsStart,
  getAccountsSuccess,
  getAuthRequestsFailure,
  getAuthRequestsStart,
  getAuthRequestsSuccess,
  updateAccountsAuthFailure,
  updateAccountsAuthStart,
  updateAccountsAuthSuccess,
} from './accountSlice';

export const getAccounts = createAction('getAccountsSaga');

export function* getAccountsSaga() {
  const { axios } = useAxios();
  try {
    yield put(getAccountsStart());
    const response = yield call(axios.get, '/user/unapproved-users');
    yield put(
      getAccountsSuccess(
        response.data?.unapprovedUsers?.map(({ id, email }) => ({
          id,
          email,
          valid: false,
          approved: false,
          deny: false,
        })),
      ),
    );
  } catch (e) {
    yield put(getAccountsFailure(e));
  }
}

export const getAuthRequests = createAction('getAuthRequestsSaga');

export function* getAuthRequestsSaga() {
  const { axios } = useAxios();
  try {
    yield put(getAuthRequestsStart());
    const response = yield call(axios.get, '/user/unapproved-auth-scopes');
    yield put(
      getAuthRequestsSuccess(
        response.data?.authRequests?.map(
          ({ id, email, firstName, lastName, authScopes: { requested } }) => ({
            id,
            email,
            name: `${firstName} ${lastName}`,
            group: 'default',
            auth: requested.map((r) => ({ authreq: r, approve: false, deny: false })),
          }),
        ),
      ),
    );
  } catch (e) {
    yield put(getAuthRequestsFailure(e));
  }
}

export const updateAccounts = createAction('updateAccountsSaga');

export function* updateAccountsSaga({ payload: accounts }) {
  const { axios } = useAxios();
  try {
    yield put(updateAccountsAuthStart());
    const response = yield call(axios.put, '/user/account-statuses', { accounts });
    yield put(updateAccountsAuthSuccess());
  } catch (e) {
    yield put(updateAccountsAuthFailure(e));
  }
}

export const updateAuthRequests = createAction('updateAuthRequestsSaga');

export function* updateAuthRequestsSaga({ payload: userAuthScopes }) {
  const { axios } = useAxios();
  try {
    yield put(updateAccountsAuthStart());
    const result = yield call(axios.put('/user/auth-scopes', { userAuthScopes }));
    yield put(updateAccountsAuthSuccess());
  } catch (e) {
    yield put(updateAccountsAuthFailure(e));
  }
}

export default function* accountsSaga() {
  yield takeLeading(getAccounts.type, getAccountsSaga);
  yield takeLeading(getAuthRequests.type, getAuthRequestsSaga);
  yield takeLeading(updateAccounts.type, updateAccountsSaga);
  yield takeLeading(updateAuthRequests.type, updateAuthRequestsSaga);
}
