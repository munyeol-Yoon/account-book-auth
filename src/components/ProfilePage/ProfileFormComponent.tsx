import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { setUser } from "../../redux/slices/user.slice";

function ProfileFormComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(user.nickname);
  const [avatar, setAvatar] = useState(null);

  const handleOnChangeNickname = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleOnClickUpdateProfile = async () => {
    try {
      const data = {
        nickname,
        imgFile: avatar,
      };

      const response = await api.auth.updateProfile(data, token);

      dispatch(
        setUser({
          ...user,
          nickname: response.nickname,
          avatar: response.avatar,
        })
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>프로필 수정</h2>
      <StProfileInputDivBox>
        <StProfileLabel htmlFor="nickname">닉네임</StProfileLabel>
        <StProfileInput
          type="text"
          value={nickname}
          id="nickname"
          name="nickname"
          onChange={handleOnChangeNickname}
        />
      </StProfileInputDivBox>
      <StProfileInputDivBox>
        <StProfileLabel htmlFor="avatar">아바타 이미지</StProfileLabel>
        <StProfileInput
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
        />
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
      </StProfileInputDivBox>
      <StProfileButton onClick={handleOnClickUpdateProfile}>
        프로필 업데이트
      </StProfileButton>
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
