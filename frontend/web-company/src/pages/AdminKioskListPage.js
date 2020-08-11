import React from 'react';
import AdminListTemplate from '../components/admin/AdminListTemplate';
import AdminKiosksListContainer from '../containers/admin/AdminKiosksListContainer';

const AdminKioskListPage = () => {
  return (
    <AdminListTemplate>
      <h1>AdminKioskListPage</h1>
      <AdminKiosksListContainer />
    </AdminListTemplate>
  );
};

export default AdminKioskListPage;
