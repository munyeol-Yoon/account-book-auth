import styled from "styled-components";
function RegisterFormComponent() {
  return (
    <>
      <h2>회원가입</h2>
      <StRegisterFormInputWrapper>
        <label htmlFor="registerId">아이디</label>
        <input type="text" id="registerId" name="registerId" />
      </StRegisterFormInputWrapper>
      <StRegisterFormInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" name="password" />
      </StRegisterFormInputWrapper>
      <StRegisterFormInputWrapper>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" name="nickname" />
      </StRegisterFormInputWrapper>
      <StRegisterFormButton>회원가입</StRegisterFormButton>
      <StRegisterFormButton>로그인</StRegisterFormButton>
    </>
  );
}

export default RegisterFormComponent;

const StRegisterFormInputWrapper = styled.div`
  margin-bottom: 15px;

  & Label {
    display: block;
    margin-bottom: 5px;
  }
  & input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const StRegisterFormButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: rgb(160, 160, 160);
`;
