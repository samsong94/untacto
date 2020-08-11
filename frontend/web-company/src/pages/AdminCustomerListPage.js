import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminCustomersListContainer from '../containers/admin/AdminCustomersListContainer';

const AdminCustomerListPage = () => {
  return (
    <AdminListTemplate>
      <h1>AdminCustomerListPage</h1>
      <AdminCustomersListContainer />
    </AdminListTemplate>
  );
};

export default AdminCustomerListPage;
