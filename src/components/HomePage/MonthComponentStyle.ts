import styled from "styled-components";

interface StMonthButtonProps {
  selected: boolean;
}

export const StMonthWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const StMonthButton = styled.button<StMonthButtonProps>`
  text-align: center;
  font-family: Pretendard, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  height: 60px;
  padding: 20px;
  width: 104px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#2ec4b6" : "#f6f7fa")};
  color: ${(props) => (props.selected ? "#fff" : "black")};

  &:hover {
    color: #fff;
    background-color: #2ec4b6;
  }
`;
