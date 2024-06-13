import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import api from "../../api/api";
import useFormInputs from "../../hooks/useInputs";
import { RootState } from "../../redux/store.ts";
import { AccountDataType, AccountInputType } from "../../types/account.type.ts";
import { StButton, StForm, StInputDiv } from "./FormComponentStyle.ts";

function FormComponent() {
  const initialValue: AccountInputType = {
    date: "",
    item: "",
    amount: "",
    content: "",
  };

  const user: any = useSelector<RootState>((state) => state.user.user);
  console.log(user);
  const { inputs, dateRef, handleOnChange, handleResetInputs } =
    useFormInputs(initialValue);

  const queryClient = useQueryClient();

  const { mutateAsync: createAccountBook } = useMutation<
    AccountDataType,
    Error,
    AccountDataType
  >({
    mutationFn: (data) => api.accountBook.createAccount(data),
    onSuccess: (data) => {
      queryClient.setQueryData<AccountDataType[] | undefined>(
        ["accountBook"],
        (prevData) => {
          return prevData ? [...prevData, data] : [data];
        }
      );
    },
  });

  const { date, item, amount, content } = inputs;

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !item || !amount || !content) {
      alert("빈칸은 허용되지 않습니다.");
      return;
    }

    const createdAt = dayjs().format("YYYY-MM-DD");

    const newAccountBook: AccountDataType = {
      userId: user.id,
      accountId: uuid(),
      date,
      item,
      amount,
      content,
      createdAt,
    };

    await createAccountBook(newAccountBook);
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

export default React.memo(FormComponent);
