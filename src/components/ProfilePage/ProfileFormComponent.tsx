import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { setUser } from "../../redux/slices/user.slice";
import { RootState } from "../../redux/store";
import {
  StProfileButton,
  StProfileInput,
  StProfileInputDivBox,
  StProfileLabel,
} from "./ProfileFormComponentStyle";

function ProfileFormComponent() {
  const user: any = useSelector<RootState>((state) => state.user.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(user.nickname);
  const [avatar, setAvatar] = useState(null);

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files ? e.target.files[0] : null;
    setAvatar(file);
  };

  const handleOnClickUpdateProfile = async () => {
    try {
      const data = {
        nickname,
        imgFile: avatar,
      };

      if (token) {
        const response = await api.auth.updateProfile(data, token);
        dispatch(
          setUser({
            ...user,
            nickname: response.nickname,
            avatar: response.avatar,
          })
        );
        navigate("/");
      }

      throw new Error("Token is not Found");
    } catch (err) {
      console.error(err);
      alert((err as any).response.data.message);
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
