import styled from "styled-components";
import RegisterFormComponent from "../../components/RegisterPage/RegisterFormComponent";

function RegisterPage() {
  return (
    <StRegisterPageWrapper>
      <RegisterFormComponent />
    </StRegisterPageWrapper>
  );
}

export default RegisterPage;

const StRegisterPageWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  background-color: rgb(248, 249, 250);
  border-radius: 8px;
`;
