import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import useFormInputs from "../../hooks/useInputs";
import {
  AccountEntry,
  addAccountEntry,
} from "../../redux/slices/accountBook.slice";

function FormComponent() {
  const initialValue: AccountEntry = {
    date: "",
    item: "",
    amount: "",
    content: "",
  };

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const { inputs, dateRef, handleOnChange, handleResetInputs } =
    useFormInputs(initialValue);

  const { date, item, amount, content } = inputs;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !item || !amount || !content) {
      alert("빈칸은 허용되지 않습니다.");
      return;
    }

    const createdAt = dayjs().format("YYYY-MM-DD");

    const newAccountBook = {
      userId: user.id,
      accountId: uuid(),
      date,
      item,
      amount,
      content,
      createdAt,
    };

    dispatch(addAccountEntry(newAccountBook));
    handleResetInputs();
  };

  return (
    <section>
      <StForm onSubmit={handleOnSubmit}>
        <StInputDiv>
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            name="date"
            id="date"
            ref={dateRef}
            value={date}
            onChange={handleOnChange}
          />
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="item">항목</label>
          <input
            type="text"
            name="item"
            id="item"
            value={item}
            onChange={handleOnChange}
          />
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="amount">금액</label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleOnChange}
          />
        </StInputDiv>
        <StInputDiv>
          <label htmlFor="content">내용</label>
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            onChange={handleOnChange}
          />
        </StInputDiv>
        <StButton type="submit">저장</StButton>
      </StForm>
    </section>
  );
}

const StForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`;

const StInputDiv = styled.div`
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

const StButton = styled.button`
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

export default React.memo(FormComponent);
