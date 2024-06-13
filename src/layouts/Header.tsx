import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { setUser } from "../redux/slices/user.slice";
import { RootState } from "../redux/store";
import {
  StHeaderDivLink,
  StHeaderDivLinkA,
  StHeaderImage,
  StHeaderLogoutButton,
  StHeaderNav,
  StHeaderSpan,
} from "./HeaderStyle";

function Header() {
  const dispatch = useDispatch();
  const user: any = useSelector<RootState>((state) => state.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.auth.checkToken(token);

        dispatch(setUser(response));
      } catch (err) {
        console.error(err);
        if ((err as any).response.status === 401) {
          navigate("/login");
        }
      }
    };

    getUser();
  }, []);

  // TODO 토큰이 없는 상태에서 메인페이지 접근시 잠깐 메인페이지가 보여지는 문제 해결해야함
  const handleOnClickLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <StHeaderNav>
      <StHeaderDivLink>
        <StHeaderDivLinkA onClick={() => navigate("/")}>HOME</StHeaderDivLinkA>
        <StHeaderDivLinkA onClick={() => navigate("/profile")}>
          내 프로필
        </StHeaderDivLinkA>
      </StHeaderDivLink>
      <StHeaderDivLink>
        <StHeaderImage src={user.avatar} alt={user.avatar} />
        <StHeaderSpan>{user.nickname}</StHeaderSpan>
        <StHeaderLogoutButton onClick={handleOnClickLogout}>
          로그아웃
        </StHeaderLogoutButton>
      </StHeaderDivLink>
    </StHeaderNav>
  );
}

export default Header;
