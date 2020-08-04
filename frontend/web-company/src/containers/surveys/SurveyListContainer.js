import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SurveyList from '../../components/surveys/SurveyList';
import { listSurveys } from '../../modules/surveys';

const SurveyListContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const { surveys, error, loading, user, companyId } = useSelector(
    ({ surveys, loading, user }) => ({
      surveys: surveys.surveys,
      error: surveys.error,
      loading: loading['surveys/LIST_SURVEYS'],
      user: user.user,
    }),
  );
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);
  if (user) {
    const { companyId } = user;
    console.log(companyId);
  }
  useEffect(() => {
    dispatch(listSurveys({ companyId }));
  }, [dispatch, companyId]);
  return <SurveyList loading={loading} error={error} surveys={surveys} />;
};

export default withRouter(SurveyListContainer);
