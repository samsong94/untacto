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
    total: {
      anger: [0.5, 0.9, 0.4, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      contemp: [0.1, 0.1, 0.3, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      disqust: [0.3, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fear: [0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      neutral: [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    young: {
      anger: [0.5, 0.9, 0.4, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      contemp: [0.1, 0.1, 0.3, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      disqust: [0.3, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fear: [0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      neutral: [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    old: {
      anger: [0.5, 0.9, 0.4, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      contemp: [0.1, 0.1, 0.3, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      disqust: [0.3, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fear: [0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      neutral: [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    male: {
      anger: [0.5, 0.9, 0.4, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      contemp: [0.1, 0.1, 0.3, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      disqust: [0.3, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fear: [0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      neutral: [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    female: {
      anger: [0.5, 0.9, 0.4, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      contemp: [0.1, 0.1, 0.3, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      disqust: [0.3, 0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      fear: [0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      neutral: [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
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
