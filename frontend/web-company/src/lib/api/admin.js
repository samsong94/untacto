import qs from 'qs';
import client from './client';

// surveys
export const adminListSurveys = ({ page, companyId, kioskId }) => {
  const queryString = qs.stringify({
    page,
    companyId,
    kioskId,
  });
  client.get(`/api/admin/surveys?${queryString}`);
};

// users(companies)
export const adminListUsers = () => client.get('/api/admin/users');

// customers
export const adminListCustomers = () => client.get('/api/admin/customers');

// kiosks
export const adminListKiosks = () => client.get('/api/admin/kiosks');

/* 

to-do

export const adminReadSurvey = (surveyId) =>
  client.get(`/api/admin/surveys/${surveyId}`);

export const adminDeleteSurvey = (surveyId) =>
  client.delete(`/api/admin/surveys/${surveyId}`);

export const adminDeleteUser = (companyId) =>
  client.delete(`/api/admin/users/${companyId}`);

export const adminDeleteCustomer = (customerId) =>
  client.delete(`/api/admin/customers/${customerId}`);

export const adminAddKiosk = ({ kioskId, location }) =>
  client.post('/api/admin/kiosks', { kioskId, location });

export const adminDeleteKiosk = (kioskId) =>
  client.delete(`/api/admin/kiosks/${kioskId}`);

*/
