import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminUsersListContainer from '../containers/admin/AdminUsersListContainer';
import AdminHeader from '../components/admin/AdminHeader';

const AdminUserListPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminListTemplate>
        <h1>회사 목록</h1>
        <AdminUsersListContainer />
      </AdminListTemplate>
    </>
  );
};

export default AdminUserListPage;
