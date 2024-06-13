import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import useFormInputs from "../../hooks/useInputs";

function RegisterFormComponent() {
  const initialValue = {
    registerId: "",
    password: "",
    nickname: "",
  };

  const navigate = useNavigate();

  const { inputs, handleOnChange } = useFormInputs(initialValue);

  const { registerId, password, nickname } = inputs;

  const handleOnClickSignUp = async () => {
    try {
      if (!registerId || !password || !nickname) {
        alert("빈칸은 허용되지 않습니다.");
        return;
      }

      if (registerId.length < 4 || registerId.length > 10) {
        alert("아이디는 4~10 자리로 입력해주세요..");
        return;
      }

      if (password.length < 4 || password.length > 15) {
        alert("비밀번호는 4~15 자리로 입력해주세요.");
        return;
      }

      if (nickname.length < 1 || nickname.length > 10) {
        alert("닉네임은 1~10 자리로 입력해주세요.");
        return;
      }

      const response = await api.auth.signUp({
        id: registerId,
        password,
        nickname,
      });

      console.log(response);

      alert("회원가입 완료");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <h2>회원가입</h2>
      <StRegisterFormInputWrapper>
        <label htmlFor="registerId">아이디</label>
        <input
          type="text"
          id="registerId"
          name="registerId"
          onChange={handleOnChange}
          value={registerId}
        />
      </StRegisterFormInputWrapper>
      <StRegisterFormInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleOnChange}
          value={password}
        />
      </StRegisterFormInputWrapper>
      <StRegisterFormInputWrapper>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          onChange={handleOnChange}
          value={nickname}
        />
      </StRegisterFormInputWrapper>
      <StRegisterFormButton onClick={handleOnClickSignUp}>
        회원가입
      </StRegisterFormButton>
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
