import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as adminAPI from '../lib/api/admin';
import { takeLatest } from 'redux-saga/effects';

// action type
const LIST_ADMIN_KIOSKS = 'adminKiosks/LIST_ADMIN_KIOSKS';
const LIST_ADMIN_KIOSKS_SUCCESS = 'adminKiosks/LIST_ADMIN_KIOSKS_SUCCESS';
const LIST_ADMIN_KIOSKS_FAILURE = 'adminKiosks/LIST_ADMIN_KIOSKS_FAILURE';

// action creator
export const listAdminKiosks = createAction(LIST_ADMIN_KIOSKS);

// saga
const listAdminKiosksSaga = createRequestSaga(
  LIST_ADMIN_KIOSKS,
  adminAPI.adminListKiosks,
);
export function* adminKiosksSaga() {
  yield takeLatest(LIST_ADMIN_KIOSKS, listAdminKiosksSaga);
}

// initial state
const initialState = {
  // adminKiosks: [
  //   {
  //     kioskId: 1,
  //     location: '역삼',
  //   },
  //   {
  //     kioskId: 2,
  //     location: '강남',
  //   },
  //   {
  //     kioskId: 3,
  //     location: '홍대',
  //   },
  //   {
  //     kioskId: 4,
  //     location: '신촌',
  //   },
  //   {
  //     kioskId: 5,
  //     location: '종로',
  //   },
  // ],
  adminKiosks: null,
  error: null,
};

// reducer
const adminKiosks = handleActions(
  {
    [LIST_ADMIN_KIOSKS_SUCCESS]: (state, { payload: adminKiosks }) => ({
      ...state,
      adminKiosks,
    }),
    [LIST_ADMIN_KIOSKS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminKiosks;
