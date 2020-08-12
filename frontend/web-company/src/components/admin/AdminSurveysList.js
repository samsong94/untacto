import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AdminSurveyListBlock = styled.div`
  background: ${palette.gray[2]};
  padding-top: 1rem;
  padding-bottom: 1rem;
  .infos {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    span + span {
      margin-left: 1rem;
    }
  }
`;
const AdminSurveyItemBlock = styled.div`
  background: white;
  margin: 1rem;
  padding: 3rem;
  &:first-child {
    margin-top: 0;
  }
  & + & {
    margin-top: 1rem;
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const AdminSurveyItem = ({ adminSurvey }) => {
  const {
    surveyId,
    user,
    kiosk,
    title,
    createdAt,
    expiresAt,
    beginsAt,
  } = adminSurvey;
  return (
    <AdminSurveyItemBlock>
      <h2>
        #{surveyId} {title}
      </h2>
      <div className="infos">
        <span>
          회사: <b>{user.userName}</b>
        </span>
        <span>
          키오스크 위치: <b>{kiosk.location}</b>
        </span>
      </div>
      <div className="infos">
        <span>
          등록일: <b>{new Date(createdAt).toLocaleDateString()}</b>
        </span>
        <span>
          시작일: <b>{new Date(beginsAt).toLocaleDateString()}</b>
        </span>
        <span>
          만료일: <b>{new Date(expiresAt).toLocaleDateString()}</b>
        </span>
      </div>
      <ButtonWithMarginTop fullWidth>삭제</ButtonWithMarginTop>
    </AdminSurveyItemBlock>
  );
};

const AdminSurveysList = ({ loading, error, adminSurveys }) => {
  // if (error) {
  //   return <AdminSurveyListBlock>에러가 발생했습니다</AdminSurveyListBlock>;
  // }
  return (
    <AdminSurveyListBlock>
      {!loading &&
        adminSurveys?.map((adminSurvey) => (
          <AdminSurveyItem
            adminSurvey={adminSurvey}
            key={adminSurvey.surveyId}
          />
        ))}
    </AdminSurveyListBlock>
  );
};

export default AdminSurveysList;
