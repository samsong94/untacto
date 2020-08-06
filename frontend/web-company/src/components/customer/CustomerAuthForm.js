import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const CustomerAuthFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  h3 {
    display: flex;
    align-items: center;
    margin: 0;
    margin-right: 2rem;
    color: ${palette.gray[8]};
  }
  .custom-auth-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .gender-radio,
    .age-radio {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      .radio-inputs {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        label {
          margin-right: 1rem;
          color: ${palette.gray[9]};
          font-size: 1.125rem;
          padding: 0.25rem 0.5rem;
        }
      }
    }
  }
`;

const StyledInput = styled.input`
  margin-top: 1rem;
  font-size: 1.125rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const CustomerAuthForm = ({ form, onChange, onSubmit, error }) => {
  return (
    <CustomerAuthFormBlock>
      <h1>포인트 적립</h1>
      <form className="custom-auth-form" onSubmit={onSubmit}>
        <StyledInput
          autoComplete="phoneNumber"
          name="phoneNumber"
          placeholder="적립할 번호를 입력하세요"
          onChange={onChange}
          value={form.email}
        />
        <div className="gender-radio">
          <h3>성별</h3>
          <div className="radio-inputs">
            <input
              type="radio"
              id="genderChoice1"
              name="gender"
              value="male"
              onChange={onChange}
            />
            <label for="genderChoice1">Male</label>
            <input
              type="radio"
              id="genderChoice2"
              name="gender"
              value="female"
              onChange={onChange}
            />
            <label for="genderChoice2">Female</label>
          </div>
        </div>
        <div className="age-radio">
          <h3>나이</h3>
          <div className="radio-inputs">
            <input
              type="radio"
              id="ageChoice1"
              name="age"
              value="10"
              onChange={onChange}
            />
            <label for="ageChoice1">10대</label>
            <input
              type="radio"
              id="ageChoice2"
              name="age"
              value="20"
              onChange={onChange}
            />
            <label for="ageChoice2">20대</label>
            <input
              type="radio"
              id="ageChoice3"
              name="age"
              value="30"
              onChange={onChange}
            />
            <label for="ageChoice3">30대</label>
            <input
              type="radio"
              id="ageChoice4"
              name="age"
              value="40"
              onChange={onChange}
            />
            <label for="ageChoice4">40대</label>
            <input
              type="radio"
              id="ageChoice5"
              name="age"
              value="50"
              onChange={onChange}
            />
            <label for="ageChoice5">50대 이상</label>
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop indigo fullWidth>
          포인트 적립 및 확인
        </ButtonWithMarginTop>
      </form>
    </CustomerAuthFormBlock>
  );
};

export default CustomerAuthForm;
