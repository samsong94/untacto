import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import survey, { surveySaga } from './survey';
import surveys, { surveysSaga } from './surveys';
import surveyAnswer, { surveyAnswerSaga } from './surveyAnswer';
import surveysAnswers, { surveysAnswersSaga } from './surveysAnswers';
import customerAuth, { customerAuthSaga } from './customerAuth';
import customer, { customerSaga } from './customer';
import adminSurveys, { adminSurveysSaga } from './adminSurveys';
import adminUsers, { adminUsersSaga } from './adminUsers';
import adminCustomers, { adminCustomersSaga } from './adminCustomers';
import adminKiosks, { adminKiosksSaga } from './adminKiosks';

// root reducer
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  survey,
  surveys,
  surveyAnswer,
  surveysAnswers,
  customerAuth,
  customer,
  adminSurveys,
  adminUsers,
  adminCustomers,
  adminKiosks,
});

// root saga
export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    surveySaga(),
    surveysSaga(),
    surveyAnswerSaga(),
    surveysAnswersSaga(),
    customerAuthSaga(),
    customerSaga(),
    adminSurveysSaga(),
    adminUsersSaga(),
    adminCustomersSaga(),
    adminKiosksSaga(),
  ]);
}

export default rootReducer;
