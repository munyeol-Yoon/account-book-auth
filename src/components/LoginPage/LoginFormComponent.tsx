import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import useFormInputs from "../../hooks/useInputs";
import {
  StLoginFormButton,
  StLoginFormInputWrapper,
} from "./LoginFormComponentStyle";

function LoginFormComponent() {
  const initialValue = {
    loginId: "",
    password: "",
  };

  const navigate = useNavigate();

  const { inputs, handleOnChange } = useFormInputs(initialValue);

  const { loginId, password } = inputs;

  const handleOnClickLogin = async () => {
    try {
      const response = await api.auth.login({
        id: loginId,
        password,
      });

      console.log(response);

      localStorage.setItem("accessToken", response.accessToken);

      alert("로그인 완료.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert((err as any).response.data.message);
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <StLoginFormInputWrapper>
        <label htmlFor="loginId">아이디</label>
        <input
          type="text"
          id="loginId"
          name="loginId"
          onChange={handleOnChange}
          value={loginId}
        />
      </StLoginFormInputWrapper>
      <StLoginFormInputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleOnChange}
          value={password}
        />
      </StLoginFormInputWrapper>
      <StLoginFormButton onClick={handleOnClickLogin}>로그인</StLoginFormButton>
      <StLoginFormButton onClick={() => navigate("/register")}>
        회원가입
      </StLoginFormButton>
    </>
  );
}

export default LoginFormComponent;
