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
    const response = yield call(axios.get, '/user/all-auth-scopes');
    yield put(
      getAuthRequestsSuccess(
        response.data?.authRequests?.map(
          ({
            id,
            email,
            firstName,
            lastName,
            authScopes: { requested: requestedAuth = [], approved: approvedAuth = [] },
            froshDataFields: {
              requested: requestedFroshData = [],
              approved: approvedFroshData = [],
            },
          }) => ({
            id,
            email,
            name: `${firstName} ${lastName}`,
            group: 'default',
            auth: [
              // Should return approved scopes first. the duplicates (which can come after if a leader requests the same perms again) will be removed on the frontend. It's better to show approved scopes only and remove the duplicate unapproved ones.
              ...approvedAuth
                .map((r) => ({
                  authreq: r,
                  approve: true,
                  deny: false,
                  isFroshData: false,
                }))
                .sort((a, b) => (a?.authreq > b?.authreq ? 1 : b?.authreq > a?.authreq ? -1 : 0)),
              ...approvedFroshData
                .map((r) => ({
                  authreq: r,
                  approve: true,
                  deny: false,
                  isFroshData: true,
                }))
                .sort((a, b) => (a?.authreq > b?.authreq ? 1 : b?.authreq > a?.authreq ? -1 : 0)),
              ...requestedAuth
                .map((r) => ({
                  authreq: r,
                  approve: false,
                  deny: true,
                  isFroshData: false,
                }))
                .sort((a, b) => (a?.authreq > b?.authreq ? 1 : b?.authreq > a?.authreq ? -1 : 0)),
              ...requestedFroshData
                .map((r) => ({
                  authreq: r,
                  approve: false,
                  deny: true,
                  isFroshData: true,
                }))
                .sort((a, b) => (a?.authreq > b?.authreq ? 1 : b?.authreq > a?.authreq ? -1 : 0)),
            ],
          }),
        ),
      ),
    );
  } catch (e) {
    yield put(getAuthRequestsFailure(e));
  }
}

export const updateAccounts = createAction('updateAccountsSaga');

export function* updateAccountsSaga({ payload: { setSnackbar, accounts } }) {
  const { axios } = useAxios();
  try {
    yield put(updateAccountsAuthStart());
    const response = yield call(axios.put, '/user/account-statuses', { accounts });
    setSnackbar('Success!');
    yield put(updateAccountsAuthSuccess());
  } catch (e) {
    setSnackbar(
      e.response?.data?.message
        ? e.response?.data?.message.toString()
        : e.response?.data
        ? e.response?.data.toString()
        : e.toString(),
      true,
    );
    yield put(updateAccountsAuthFailure(e));
  }
}

export const updateAuthRequests = createAction('updateAuthRequestsSaga');

export function* updateAuthRequestsSaga({ payload: { setSnackbar, userAuthScopes } }) {
  const { axios } = useAxios();
  try {
    yield put(updateAccountsAuthStart());
    const result = yield call(axios.put, '/user/auth-scopes', { userAuthScopes });
    setSnackbar('Success!');
    yield put(updateAccountsAuthSuccess());
  } catch (e) {
    setSnackbar(
      e.response?.data?.message
        ? e.response?.data?.message.toString()
        : e.response?.data
        ? e.response?.data.toString()
        : e.toString(),
      true,
    );
    yield put(updateAccountsAuthFailure(e));
  }
}

export default function* accountsSaga() {
  yield takeLeading(getAccounts.type, getAccountsSaga);
  yield takeLeading(getAuthRequests.type, getAuthRequestsSaga);
  yield takeLeading(updateAccounts.type, updateAccountsSaga);
  yield takeLeading(updateAuthRequests.type, updateAuthRequestsSaga);
}
