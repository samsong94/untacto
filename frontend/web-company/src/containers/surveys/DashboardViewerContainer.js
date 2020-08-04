import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardViewer from '../../components/surveys/DashboardViewer';
import { readSurveysAnswers } from '../../modules/surveysAnswers';
import { withRouter } from 'react-router-dom';

const DashboardViewerContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { surveysAnswers, error, loading, user, companyId } = useSelector(
    ({ surveysAnswers, loading, user }) => ({
      surveysAnswers: surveysAnswers.surveysAnswers,
      error: surveysAnswers.error,
      loading: loading['surveysAnswers/READ_SURVEYS_ANSWERS'],
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
  }
  useEffect(() => {
    dispatch(readSurveysAnswers({ companyId }));
  }, [dispatch, companyId]);

  if (user) {
    return (
      <DashboardViewer
        surveysAnswers={surveysAnswers}
        error={error}
        loading={loading}
      />
    );
  } else {
    return <h1>hi</h1>;
  }
};

export default withRouter(DashboardViewerContainer);
