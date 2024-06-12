import styled from "styled-components";
import LoginFormComponent from "../../components/LoginPage/LoginFormComponent";

function LoginPage() {
  return (
    <StLoginPageWrapper>
      <LoginFormComponent />
    </StLoginPageWrapper>
  );
}

export default LoginPage;

const StLoginPageWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  background-color: rgb(248, 249, 250);
  border-radius: 8px;
`;
