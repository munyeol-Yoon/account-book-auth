import { styled } from "styled-components";

export const StHeaderNav = styled.nav`
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
export const StHeaderDivLink = styled.div`
  display: flex;
  align-items: center;
`;

export const StHeaderDivLinkA = styled.a`
  color: white;
  margin: 0px 10px;
  text-decoration: none;
  cursor: pointer;
`;

export const StHeaderImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StHeaderSpan = styled.span`
  color: white;
  margin-right: 20px;
`;

export const StHeaderLogoutButton = styled.button`
  padding: 8px 12px;
  background-color: rgb(255, 77, 77);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
