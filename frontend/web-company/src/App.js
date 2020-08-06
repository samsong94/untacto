import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SurveyListPage from './pages/SurveyListPage';
import SurveyPage from './pages/SurveyPage';
import WritePage from './pages/WritePage';
import MemberPage from './pages/MemberPage';
import HelpPage from './pages/HelpPage';
import CustomerHomePage from './pages/CustomerHomePage';
import CustomerLoginPage from './pages/CustomerLoginPage';

function App() {
  return (
    <>
      <Route component={DashboardPage} path={'/'} exact />
      <Route component={SurveyListPage} path={'/survey'} exact />
      <Route component={SurveyPage} path={'/survey/:surveyId'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={SignupPage} path={'/signup'} />
      <Route component={LoginPage} path={'/login'} />
      <Route component={MemberPage} path={'/member'} exact />
      <Route component={HelpPage} path={'/help'} exact />
      <Route component={CustomerLoginPage} path={'/customerlogin'} />
      <Route component={CustomerHomePage} path={'/customer/:customerId'} />
    </>
  );
}

export default App;
