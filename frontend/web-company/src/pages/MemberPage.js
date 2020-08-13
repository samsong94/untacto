import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MobileHeaderContainer from '../containers/common/MobileHeaderContainer';
import MemberPageViewer from '../components/etc/MemberPageViewer';
import Sidebar from '../components/common/Sidebar';

const MemberPage = () => {
  return (
    <>
      <HeaderContainer />
      <MobileHeaderContainer />
      <Sidebar />
      <MemberPageViewer />
    </>
  );
};

export default MemberPage;
