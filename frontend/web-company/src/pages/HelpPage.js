import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MobileHeaderContainer from '../containers/common/MobileHeaderContainer';
import HelpPageViewer from '../components/etc/HelpPageViewer';
import Sidebar from '../components/common/Sidebar';

const HelpPage = () => {
  return (
    <>
      <HeaderContainer />
      <MobileHeaderContainer />
      <Sidebar />
      <HelpPageViewer />
    </>
  );
};

export default HelpPage;
