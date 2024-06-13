import styled from "styled-components";

interface StStatusBarElementProps {
  width: string;
  color: string;
}

export const StStatusFontTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

export const StStatusBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
  background-color: rgb(233, 236, 239);
  border-radius: 8px;
  overflow: 8px;
`;

export const StStatusBarElement = styled.div<StStatusBarElementProps>`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`;

export const StStatusBarSummary = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const StStatusBarSummaryElement = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(85, 85, 85);
`;

export const StStatusBarSummaryElementColorBox = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;
