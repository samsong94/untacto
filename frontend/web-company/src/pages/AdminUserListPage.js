import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminUsersListContainer from '../containers/admin/AdminUsersListContainer';

const AdminUserListPage = () => {
  return (
    <AdminListTemplate>
      <h1>AdminUserListPage</h1>;
      <AdminUsersListContainer />
    </AdminListTemplate>
  );
};

export default AdminUserListPage;
