import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as adminAPI from '../lib/api/admin';
import { takeLatest } from 'redux-saga/effects';

// action type
const LIST_ADMIN_SURVEYS = 'adminSurveys/LIST_ADMIN_SURVEYS';
const LIST_ADMIN_SURVEYS_SUCCESS = 'adminSurveys/LIST_ADMIN_SURVEYS_SUCCESS';
const LIST_ADMIN_SURVEYS_FAILURE = 'adminSurveys/LIST_ADMIN_SURVEYS_FAILURE';

// action creator
export const listAdminSurveys = createAction(LIST_ADMIN_SURVEYS);

// 필터를 통한 리스팅도 추가해야함

// saga
const listAdminSurveysSaga = createRequestSaga(
  LIST_ADMIN_SURVEYS,
  adminAPI.adminListSurveys,
);
export function* adminSurveysSaga() {
  yield takeLatest(LIST_ADMIN_SURVEYS, listAdminSurveysSaga);
}

// initial state
const initialState = {
  // adminSurveys: [
  //   {
  //     surveyId: 1,
  //     user: {
  //       userId: 1,
  //       email: 'kenny@company.com',
  //       userName: 'kenny company',
  //     },
  //     kiosk: {
  //       kioskId: 1,
  //       location: '역삼',
  //     },
  //     title: 'test survey 1',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //     expiresAt: '2020-08-08T04:16:38.000Z',
  //     beginsAt: '2020-08-05T04:16:38.000Z',
  //   },
  //   {
  //     surveyId: 2,
  //     user: {
  //       userId: 1,
  //       email: 'kenny@company.com',
  //       userName: 'kenny company',
  //     },
  //     kiosk: {
  //       kioskId: 1,
  //       location: '역삼',
  //     },
  //     title: 'test survey 2',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //     expiresAt: '2020-08-08T04:16:38.000Z',
  //     beginsAt: '2020-08-05T04:16:38.000Z',
  //   },
  //   {
  //     surveyId: 3,
  //     user: {
  //       userId: 1,
  //       email: 'kenny@company.com',
  //       userName: 'kenny company',
  //     },
  //     kiosk: {
  //       kioskId: 1,
  //       location: '역삼',
  //     },
  //     title: 'test survey 3',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //     expiresAt: '2020-08-08T04:16:38.000Z',
  //     beginsAt: '2020-08-05T04:16:38.000Z',
  //   },
  //   {
  //     surveyId: 4,
  //     user: {
  //       userId: 1,
  //       email: 'kenny@company.com',
  //       userName: 'kenny company',
  //     },
  //     kiosk: {
  //       kioskId: 1,
  //       location: '역삼',
  //     },
  //     title: 'test survey 4',
  //     createdAt: '2020-08-03T04:16:38.000Z',
  //     expiresAt: '2020-08-08T04:16:38.000Z',
  //     beginsAt: '2020-08-05T04:16:38.000Z',
  //   },
  // ],
  adminSurveys: null,
  error: null,
};

// reducer
const adminSurveys = handleActions(
  {
    [LIST_ADMIN_SURVEYS_SUCCESS]: (state, { payload: adminSurveys }) => ({
      ...state,
      adminSurveys,
    }),
    [LIST_ADMIN_SURVEYS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminSurveys;
