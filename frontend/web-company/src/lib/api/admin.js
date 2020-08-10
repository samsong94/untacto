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

export const adminReadSurvey = (surveyId) =>
  client.get(`/api/admin/surveys/${surveyId}`);

export const adminDeleteSurvey = (surveyId) =>
  client.delete(`/api/admin/surveys/${surveyId}`);

// users(companies)
export const adminListUsers = () => client.get('/api/admin/users');

export const adminReadUser = (companyId) =>
  client.get(`/api/admin/users/${companyId}`);

export const adminDeleteUser = (companyId) =>
  client.delete(`/api/admin/users/${companyId}`);

// customers
export const adminListCustomers = () => client.get('/api/admin/customers');

export const adminReadCustomer = (customerId) =>
  client.get(`/api/admin/customers/${customerId}`);

export const adminDeleteCustomer = (customerId) =>
  client.delete(`/api/admin/customers/${customerId}`);

// kiosks
export const adminListKiosks = () => client.get('/api/admin/kiosks');

export const adminAddKiosk = ({ kioskId, location }) =>
  client.post('/api/admin/kiosks', { kioskId, location });

export const adminDeleteKiosk = (kioskId) =>
  client.delete(`/api/admin/kiosks/${kioskId}`);
