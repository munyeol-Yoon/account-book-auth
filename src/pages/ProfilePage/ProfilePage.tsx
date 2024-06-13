import styled from "styled-components";
import ProfileFormComponent from "../../components/ProfilePage/ProfileFormComponent";

function ProfilePage() {
  return (
    <StProfilePageDiv>
      <ProfileFormComponent />
    </StProfilePageDiv>
  );
}

export default ProfilePage;

const StProfilePageDiv = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(248, 249, 250);
  border-radius: 8px;
`;
