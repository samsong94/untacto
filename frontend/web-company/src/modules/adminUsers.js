import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as adminAPI from '../lib/api/admin';
import { takeLatest } from 'redux-saga/effects';

// action type
const LIST_ADMIN_USERS = 'adminUsers/LIST_ADMIN_USERS';
const LIST_ADMIN_USERS_SUCCESS = 'adminUsers/LIST_ADMIN_USERS_SUCCESS';
const LIST_ADMIN_USERS_FAILURE = 'adminUsers/LIST_ADMIN_USERS_FAILURE';

// action creator
export const listAdminUsers = createAction(LIST_ADMIN_USERS);

// saga
const listAdminUsersSaga = createRequestSaga(
  LIST_ADMIN_USERS,
  adminAPI.adminListUsers,
);
export function* adminUsersSaga() {
  yield takeLatest(LIST_ADMIN_USERS, listAdminUsersSaga);
}

// initial state
const initialState = {
  adminUsers: [
    {
      userId: 1,
      email: '성우@company.com',
      userName: '성우 company',
      createdAt: '2020-08-03T04:16:38.000Z',
    },
    {
      userId: 2,
      email: '승진@company.com',
      userName: '승진 company',
      createdAt: '2020-08-03T04:16:38.000Z',
    },
    {
      userId: 3,
      email: '재훈@company.com',
      userName: '재훈 company',
      createdAt: '2020-08-03T04:16:38.000Z',
    },
    {
      userId: 4,
      email: '승민@company.com',
      userName: '승민 company',
      createdAt: '2020-08-03T04:16:38.000Z',
    },
    {
      userId: 5,
      email: '영부@company.com',
      userName: '영부 company',
      createdAt: '2020-08-03T04:16:38.000Z',
    },
  ],
  // adminUsers: null,
  error: null,
};

// reducer
const adminUsers = handleActions(
  {
    [LIST_ADMIN_USERS_SUCCESS]: (state, { payload: adminUsers }) => ({
      ...state,
      adminUsers,
    }),
    [LIST_ADMIN_USERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminUsers;
