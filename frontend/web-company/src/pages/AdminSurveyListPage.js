import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminSurveysListContainer from '../containers/admin/AdminSurveysListContainer';
import AdminHeader from '../components/admin/AdminHeader';

const AdminSurveyListPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminListTemplate>
        <h1>설문 목록</h1>
        <AdminSurveysListContainer />
      </AdminListTemplate>
    </>
  );
};

export default AdminSurveyListPage;
