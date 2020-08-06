import React from 'react';
import MobileHeader from '../components/common/MobileHeader';
import CustomerLoginForm from '../containers/customer/CustomerLoginForm';
import CustomerAuthTemplate from '../components/customer/CustomerAuthTemplate';

const CustomerLoginPage = () => {
  return (
    <>
      <MobileHeader />
      <CustomerAuthTemplate>
        <CustomerLoginForm />
      </CustomerAuthTemplate>
    </>
  );
};

export default CustomerLoginPage;
