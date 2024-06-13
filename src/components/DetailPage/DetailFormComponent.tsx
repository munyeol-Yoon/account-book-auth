import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import useFormInputs from "../../hooks/useInputs";
import { AccountDataType, AccountJSONDataType } from "../../types/account.type";
import {
  StDetailButtonWrapper,
  StDetailDeleteButton,
  StDetailFormWrapper,
  StDetailGoBackButton,
  StDetailInputWrapper,
  StDetailUpdateButton,
} from "./DetailFormComponentStyle";

function DetailFormComponent() {
  const initialValue = {
    date: "",
    item: "",
    amount: "",
    content: "",
  };

  const { inputs, dateRef, handleOnChange } = useFormInputs(initialValue);
  const params = useParams<{ accountId: string }>();
  const accountId = params.accountId ?? "";
  const navigate = useNavigate();

  const { data: accountBook, isLoading } = useQuery<AccountDataType>({
    queryKey: ["accountBook"],
    queryFn: () => api.accountBook.findOneAccount(accountId),
  });

  const { mutateAsync: updateAccount } = useMutation<
    unknown,
    Error,
    AccountJSONDataType
  >({
    mutationFn: (data: AccountJSONDataType) =>
      api.accountBook.updateAccount(data),
  });

  const { mutateAsync: deleteAccount } = useMutation<unknown, Error, string>({
    mutationFn: (id) => api.accountBook.deleteAccount(id),
  });

  if (isLoading || !accountBook) {
    return <div>loading...</div>;
  }

  const { date, item, amount, content } = inputs;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!date || !item || !amount || !content) {
        alert("빈칸은 허용되지 않습니다.");
        return;
      }

      const newAccount: AccountJSONDataType = {
        ...accountBook,
        date,
        item,
        amount,
        content,
      };

      await updateAccount(newAccount);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    const isDelete = confirm("정말로 이 지출 할목을 삭제하시겠습니까?");
    if (!isDelete) return;

    try {
      await deleteAccount(accountId);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <StDetailFormWrapper onSubmit={handleUpdate}>
      <StDetailInputWrapper>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          name="date"
          id="date"
          ref={dateRef}
          value={date}
          onChange={handleOnChange}
        />
      </StDetailInputWrapper>
      <StDetailInputWrapper>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          name="item"
          id="item"
          value={item}
          onChange={handleOnChange}
        />
      </StDetailInputWrapper>
      <StDetailInputWrapper>
        <label htmlFor="amount">금액</label>
        <input
          type="text"
          name="amount"
          id="amount"
          value={amount}
          onChange={handleOnChange}
        />
      </StDetailInputWrapper>
      <StDetailInputWrapper>
        <label htmlFor="content">내용</label>
        <input
          type="text"
          name="content"
          id="content"
          value={content}
          onChange={handleOnChange}
        />
      </StDetailInputWrapper>
      <StDetailButtonWrapper>
        <StDetailUpdateButton type="submit">수정</StDetailUpdateButton>
        <StDetailDeleteButton type="button" onClick={handleDelete}>
          삭제
        </StDetailDeleteButton>
        <StDetailGoBackButton type="button" onClick={handleGoBack}>
          뒤로가기
        </StDetailGoBackButton>
      </StDetailButtonWrapper>
    </StDetailFormWrapper>
  );
}

export default DetailFormComponent;
