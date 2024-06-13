import styled from "styled-components";

export const StLoginFormInputWrapper = styled.div`
  margin-bottom: 15px;

  & Label {
    display: block;
    margin-bottom: 5px;
  }
  & input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

export const StLoginFormButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: rgb(160, 160, 160);
`;
