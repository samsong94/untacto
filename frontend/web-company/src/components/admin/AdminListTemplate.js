import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AdminListTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.indigo[1]};
`;

const AdminListTemplate = ({ children }) => {
  return <AdminListTemplateBlock>{children}</AdminListTemplateBlock>;
};

export default AdminListTemplate;
