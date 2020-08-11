import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminCustomersList from '../../components/admin/AdminCustomersList';
import { listAdminCustomers } from '../../modules/adminCustomers';

const AdminCustomersListContainer = () => {
  const dispatch = useDispatch();
  const { adminCustomers, error, loading } = useSelector(
    ({ adminCustomers, loading }) => ({
      adminCustomers: adminCustomers.adminCustomers,
      error: adminCustomers.error,
      loading: loading['adminCustomers/LIST_ADMIN_CUSTOMERS'],
    }),
  );
  useEffect(() => {
    dispatch(listAdminCustomers());
  }, [dispatch]);
  return (
    <AdminCustomersList
      loading={loading}
      error={error}
      adminCustomers={adminCustomers}
    />
  );
};

export default AdminCustomersListContainer;
