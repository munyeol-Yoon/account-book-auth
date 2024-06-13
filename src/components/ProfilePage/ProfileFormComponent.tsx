import styled from "styled-components";

function ProfileFormComponent() {
  return (
    <div>
      <h2>프로필 수정</h2>
      <StProfileInputDivBox>
        <StProfileLabel htmlFor="">닉네임</StProfileLabel>
        <StProfileInput type="text" />
      </StProfileInputDivBox>
      <StProfileInputDivBox>
        <StProfileLabel htmlFor="">아바타 이미지</StProfileLabel>
        <StProfileInput type="file" />
      </StProfileInputDivBox>
      <StProfileButton>프로필 업데이트</StProfileButton>
    </div>
  );
}

export default ProfileFormComponent;

const StProfileInputDivBox = styled.div`
  margin-bottom: 15px;
`;

const StProfileLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const StProfileInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const StProfileButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgb(0, 123, 255);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;
