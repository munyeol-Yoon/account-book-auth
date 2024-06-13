import styled from "styled-components";

export const StForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`;

export const StInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-width: 120px;

  & > label {
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    text-align: left;
  }

  & > input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
  }
`;

export const StButton = styled.button`
  padding: 8px 20px;
  height: 33px;
  margin-top: 10px;
  background-color: rgb(0, 123, 255);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
`;
