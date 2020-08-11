import React, { useEffect } from 'react';
import AdminSurveysList from '../../components/admin/AdminSurveysList';
import { useDispatch, useSelector } from 'react-redux';
import { listAdminSurveys } from '../../modules/adminSurveys';

const AdminSurveysListContainer = () => {
  const dispatch = useDispatch();
  const { adminSurveys, error, loading } = useSelector(
    ({ adminSurveys, loading }) => ({
      adminSurveys: adminSurveys.adminSurveys,
      error: adminSurveys.error,
      loading: loading['adminSurveys/LIST_ADMIN_SURVEYS'],
    }),
  );
  useEffect(() => {
    dispatch(listAdminSurveys());
  }, [dispatch]);

  return (
    <AdminSurveysList
      loading={loading}
      error={error}
      adminSurveys={adminSurveys}
    />
  );
};

export default AdminSurveysListContainer;
