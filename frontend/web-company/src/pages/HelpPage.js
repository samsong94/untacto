import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MobileHeaderContainer from '../containers/common/MobileHeaderContainer';
import HelpViewer from '../components/faq/HelpViewer';
import Sidebar from '../components/common/Sidebar';

const HelpPage = () => {
  return (
    <>
      <HeaderContainer />
      <MobileHeaderContainer />
      <Sidebar />
      <HelpViewer />
    </>
  );
};

export default HelpPage;
