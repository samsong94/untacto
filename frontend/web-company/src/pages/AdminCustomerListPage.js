import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminCustomersListContainer from '../containers/admin/AdminCustomersListContainer';
import AdminHeader from '../components/admin/AdminHeader';

const AdminCustomerListPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminListTemplate>
        <h1>설문응답자 목록</h1>
        <AdminCustomersListContainer />
      </AdminListTemplate>
    </>
  );
};

export default AdminCustomerListPage;
