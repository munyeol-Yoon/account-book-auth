import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";

function Header() {
  const [user, setUser] = useState({});

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

        setUser(response);
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    getUser();
  }, []);

  // TODO 로그아웃 만들어야함
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
        <StHeaderSpan>{user.id}</StHeaderSpan>
        <StHeaderLogoutButton>로그아웃</StHeaderLogoutButton>
      </StHeaderDivLink>
    </StHeaderNav>
  );
}

export default Header;

const StHeaderNav = styled.nav`
  background-color: rgb(51, 51, 51);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 1000;
  max-width: 760px;
  width: 100%;
  border-radius: 10px;
`;
const StHeaderDivLink = styled.div`
  display: flex;
  align-items: center;
`;

const StHeaderDivLinkA = styled.a`
  color: white;
  margin: 0px 10px;
  text-decoration: none;
`;

const StHeaderImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StHeaderSpan = styled.span`
  color: white;
  margin-right: 20px;
`;

const StHeaderLogoutButton = styled.button`
  padding: 8px 12px;
  background-color: rgb(255, 77, 77);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
