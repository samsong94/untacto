import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as answersAPI from '../lib/api/surveysAnswers';
import { takeLatest } from 'redux-saga/effects';

// action type
const READ_SURVEY_ANSWER = 'surveyAnswer/READ_SURVEY_ANSWER';
const READ_SURVEY_ANSWER_SUCCESS = 'surveyAnswer/READ_SURVEY_ANSWER_SUCCESS';
const READ_SURVEY_ANSWER_FAILURE = 'surveyAnswer/READ_SURVEY_ANSWER_FAILURE';
const UNLOAD_SURVEY_ANSWER = 'surveyAnswer/UNLOAD_SURVEY_ANSWER';

// action creator
export const readSurveyAnswer = createAction(READ_SURVEY_ANSWER, (id) => id);
export const unloadSurveyAnswer = createAction(UNLOAD_SURVEY_ANSWER);

// saga
const readSurveyAnswerSaga = createRequestSaga(
  READ_SURVEY_ANSWER,
  answersAPI.readSurveyAnswer,
);
export function* surveyAnswerSaga() {
  yield takeLatest(READ_SURVEY_ANSWER, readSurveyAnswerSaga);
}

// initial state
const initialState = {
  surveyAnswer: {
    total: [
      ['anger', 0.919, 0.8, 0.53, 0.2, 0.445, 0.22],
      ['contempt', 0.222, 0.555, 0.243, 0.111, 0.989, 0.5],
      ['disgust', 0.523, 0.234, 0.35, 0.256, 0.777, 0.137],
      ['fear', 0.259, 0.346, 0.547, 0.215, 0.474, 0.35],
      ['happiness', 0.02, 0.67, 0.37, 0.45, 0.873, 0.657],
      ['neutral', 0.685, 0.24, 0.345, 0.87, 0.234, 0.157],
      ['sadness', 0.43, 0.48, 0.457, 0.3, 0.75, 0.52],
      ['surprise', 0.45, 0.5, 0.324, 0.748, 0.49, 0.234],
    ],
    young: [
      ['anger', 0.919, 0.8, 0.53, 0.2, 0.445, 0.22],
      ['contempt', 0.222, 0.555, 0.243, 0.111, 0.989, 0.5],
      ['disgust', 0.523, 0.234, 0.35, 0.256, 0.777, 0.137],
      ['fear', 0.259, 0.346, 0.547, 0.215, 0.474, 0.35],
      ['happiness', 0.02, 0.67, 0.37, 0.45, 0.873, 0.657],
      ['neutral', 0.685, 0.24, 0.345, 0.87, 0.234, 0.157],
      ['sadness', 0.43, 0.48, 0.457, 0.3, 0.75, 0.52],
      ['surprise', 0.45, 0.5, 0.324, 0.748, 0.49, 0.234],
    ],
    old: [
      ['anger', 0.919, 0.8, 0.53, 0.2, 0.445, 0.22],
      ['contempt', 0.222, 0.555, 0.243, 0.111, 0.989, 0.5],
      ['disgust', 0.523, 0.234, 0.35, 0.256, 0.777, 0.137],
      ['fear', 0.259, 0.346, 0.547, 0.215, 0.474, 0.35],
      ['happiness', 0.02, 0.67, 0.37, 0.45, 0.873, 0.657],
      ['neutral', 0.685, 0.24, 0.345, 0.87, 0.234, 0.157],
      ['sadness', 0.43, 0.48, 0.457, 0.3, 0.75, 0.52],
      ['surprise', 0.45, 0.5, 0.324, 0.748, 0.49, 0.234],
    ],
    male: [
      ['anger', 0.919, 0.8, 0.53, 0.2, 0.445, 0.22],
      ['contempt', 0.222, 0.555, 0.243, 0.111, 0.989, 0.5],
      ['disgust', 0.523, 0.234, 0.35, 0.256, 0.777, 0.137],
      ['fear', 0.259, 0.346, 0.547, 0.215, 0.474, 0.35],
      ['happiness', 0.02, 0.67, 0.37, 0.45, 0.873, 0.657],
      ['neutral', 0.685, 0.24, 0.345, 0.87, 0.234, 0.157],
      ['sadness', 0.43, 0.48, 0.457, 0.3, 0.75, 0.52],
      ['surprise', 0.45, 0.5, 0.324, 0.748, 0.49, 0.234],
    ],
    female: [
      ['anger', 0.919, 0.8, 0.53, 0.2, 0.445, 0.22],
      ['contempt', 0.222, 0.555, 0.243, 0.111, 0.989, 0.5],
      ['disgust', 0.523, 0.234, 0.35, 0.256, 0.777, 0.137],
      ['fear', 0.259, 0.346, 0.547, 0.215, 0.474, 0.35],
      ['happiness', 0.02, 0.67, 0.37, 0.45, 0.873, 0.657],
      ['neutral', 0.685, 0.24, 0.345, 0.87, 0.234, 0.157],
      ['sadness', 0.43, 0.48, 0.457, 0.3, 0.75, 0.52],
      ['surprise', 0.45, 0.5, 0.324, 0.748, 0.49, 0.234],
    ],
  },
  // surveyAnswer: null,
  error: null,
};

// reducer
const surveyAnswer = handleActions(
  {
    [READ_SURVEY_ANSWER_SUCCESS]: (state, { payload: surveyAnswer }) => ({
      ...state,
      surveyAnswer,
    }),
    [READ_SURVEY_ANSWER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_SURVEY_ANSWER]: () => initialState,
  },
  initialState,
);

export default surveyAnswer;
