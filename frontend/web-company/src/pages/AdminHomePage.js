import React from 'react';
import { Link } from 'react-router-dom';
import AdminListTemplate from '../components/admin/AdminListTemplate';

const AdminHomePage = () => {
  return (
    <AdminListTemplate>
      <h1>관리자 홈페이지</h1>
      <div>
        <Link to={'/admin/survey'}>설문 리스트</Link>
      </div>
      <div>
        <Link to={'/admin/user'}>회사 리스트</Link>
      </div>
      <div>
        <Link to={'/admin/customer'}>설문응답자 리스트</Link>
      </div>
      <div>
        <Link to={'/admin/kiosk'}>키오스크 리스트</Link>
      </div>
    </AdminListTemplate>
  );
};

export default AdminHomePage;
