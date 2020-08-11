import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminSurveysListContainer from '../containers/admin/AdminSurveysListContainer';

const AdminSurveyListPage = () => {
  return (
    <AdminListTemplate>
      <h1>AdminSurveyListPage</h1>;
      <AdminSurveysListContainer />
    </AdminListTemplate>
  );
};

export default AdminSurveyListPage;
