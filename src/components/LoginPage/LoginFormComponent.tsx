import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginFormComponent() {
  const navigate = useNavigate();

  return (
    <>
      <h2>로그인</h2>
      <StLoginFormInputWrapper>
        <label htmlFor="loginId">아이디</label>
        <input type="text" id="loginId" name="loginId" />
      </StLoginFormInputWrapper>
      <StLoginFormInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password" />
      </StLoginFormInputWrapper>
      <StLoginFormButton>로그인</StLoginFormButton>
      <StLoginFormButton onClick={() => navigate("/register")}>
        회원가입
      </StLoginFormButton>
    </>
  );
}

export default LoginFormComponent;

const StLoginFormInputWrapper = styled.div`
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

const StLoginFormButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: rgb(160, 160, 160);
`;
