import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as answersAPI from '../lib/api/surveysAnswers';
import { takeLatest } from 'redux-saga/effects';

// action type
const READ_SURVEYS_ANSWERS = 'surveysAnswers/READ_SURVEYS_ANSWERS';
const READ_SURVEYS_ANSWERS_SUCCESS =
  'surveysAnswers/READ_SURVEYS_ANSWERS_SUCCESS';
const READ_SURVEYS_ANSWERS_FAILURE =
  'surveysAnswers/READ_SURVEYS_ANSWERS_FAILURE';
const UNLOAD_SURVEYS_ANSWERS = 'surveysAnswers/UNLOAD_SURVEYS_ANSWERS';

// action creator
export const readSurveysAnswers = createAction(
  READ_SURVEYS_ANSWERS,
  ({ companyId }) => ({
    companyId,
  }),
);
export const unloadSurveysAnswers = createAction(UNLOAD_SURVEYS_ANSWERS);

// saga
const readSurveysAnswersSaga = createRequestSaga(
  READ_SURVEYS_ANSWERS,
  answersAPI.readSurveysAnswers,
);
export function* surveysAnswersSaga() {
  yield takeLatest(READ_SURVEYS_ANSWERS, readSurveysAnswersSaga);
}

// initial state
const initialState = {
  surveysAnswers: {
    bySurvey: [
      [
        'x',
        '2013-01-01',
        '2013-01-02',
        '2013-01-03',
        '2013-01-04',
        '2013-01-05',
        '2013-01-06',
      ],
      ['total', 130, 240, 200, 500, 250, 350],
      ['survey1', 60, 120, 40, 50, 100, 120],
      ['survey2', 70, 120, 160, 450, 150, 230],
    ],
    byGender: {
      data: [
        ['man', 130, 90, 40, 200, 100],
        ['woman', 100, 110, 60, 200, 50],
      ],
      categories: ['survey1', 'survey2', 'survey3', 'survey4', 'survey5'],
    },
    byAge: {
      '~20': [2, 3, 1],
      '20~29': [1, 5, 5],
      '30~39': [3, 2, 6],
      '40~49': [5, 3, 6],
      '50~59': [3, 1, 2],
      '60~': [1, 2, 3],
    },
  },
  // surveysAnswers: null,
  error: null,
};

// reducer
const surveysAnswers = handleActions(
  {
    [READ_SURVEYS_ANSWERS_SUCCESS]: (state, { payload: surveysAnswers }) => ({
      ...state,
      surveysAnswers,
    }),
    [READ_SURVEYS_ANSWERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_SURVEYS_ANSWERS]: () => initialState,
  },
  initialState,
);

export default surveysAnswers;
