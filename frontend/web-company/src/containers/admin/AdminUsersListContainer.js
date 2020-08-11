import React, { useEffect } from 'react';
import AdminUsersList from '../../components/admin/AdminUsersList';
import { useDispatch, useSelector } from 'react-redux';
import { listAdminUsers } from '../../modules/adminUsers';

const AdminUsersListContainer = () => {
  const dispatch = useDispatch();
  const { adminUsers, error, loading } = useSelector(
    ({ adminUsers, loading }) => ({
      adminUsers: adminUsers.adminUsers,
      error: adminUsers.error,
      loading: loading['adminUsers/LIST_ADMIN_USERS'],
    }),
  );
  useEffect(() => {
    dispatch(listAdminUsers());
  }, [dispatch]);
  return (
    <AdminUsersList loading={loading} error={error} adminUsers={adminUsers} />
  );
};

export default AdminUsersListContainer;
