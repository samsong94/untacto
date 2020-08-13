import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as adminAPI from '../lib/api/admin';
import { takeLatest } from 'redux-saga/effects';

// action type
const LIST_ADMIN_CUSTOMERS = 'adminCustomers/LIST_ADMIN_CUSTOMERS';
const LIST_ADMIN_CUSTOMERS_SUCCESS =
  'adminCustomers/LIST_ADMIN_CUSTOMERS_SUCCESS';
const LIST_ADMIN_CUSTOMERS_FAILURE =
  'adminCustomers/LIST_ADMIN_CUSTOMERS_FAILURE';

// action creator
export const listAdminCustomers = createAction(LIST_ADMIN_CUSTOMERS);

// saga
const listAdminCustomersSaga = createRequestSaga(
  LIST_ADMIN_CUSTOMERS,
  adminAPI.adminListCustomers,
);
export function* adminCustomersSaga() {
  yield takeLatest(LIST_ADMIN_CUSTOMERS, listAdminCustomersSaga);
}

// initial state
const initialState = {
  // adminCustomers: [
  //   {
  //     customerId: 1,
  //     point: 100,
  //     age: 27,
  //     gender: 'male',
  //     phoneNum: '01012341234',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //   },
  //   {
  //     customerId: 2,
  //     point: 100,
  //     age: 27,
  //     gender: 'male',
  //     phoneNum: '01012341234',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //   },
  //   {
  //     customerId: 3,
  //     point: 100,
  //     age: 27,
  //     gender: 'male',
  //     phoneNum: '01012341234',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //   },
  //   {
  //     customerId: 4,
  //     point: 100,
  //     age: 27,
  //     gender: 'male',
  //     phoneNum: '01012341234',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //   },
  //   {
  //     customerId: 5,
  //     point: 100,
  //     age: 27,
  //     gender: 'male',
  //     phoneNum: '01012341234',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //   },
  // ],
  adminCustomers: null,
  error: null,
};

// reducer
const adminCustomers = handleActions(
  {
    [LIST_ADMIN_CUSTOMERS_SUCCESS]: (state, { payload: adminCustomers }) => ({
      ...state,
      adminCustomers,
    }),
    [LIST_ADMIN_CUSTOMERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminCustomers;
