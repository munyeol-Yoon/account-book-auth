import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import useFormInputs from "../../hooks/useInputs";
import { deleteAccount } from "../../redux/slices/accountBook.slice";

function DetailFormComponent() {
  const initialValue = {
    date: "",
    item: "",
    amount: "",
    content: "",
  };

  // const accountBook = useSelector(
  //   (state: RootState) => state.accountBook.accountBook
  // );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { inputs, dateRef, handleOnChange, setInputs } =
    useFormInputs(initialValue);
  const params = useParams<{ accountId: string }>();
  const accountId = params.accountId;
  const navigate = useNavigate();

  console.log(accountId);

  const { data: accountBook, isLoading } = useQuery({
    queryKey: ["accountBook"],
    queryFn: () => api.accountBook.findOneAccount(accountId),
  });

  if (isLoading || !accountBook) {
    return <div>loading...</div>;
  }
  console.log(accountBook);

  const { mutateAsync: updateAccount } = useMutation({
    mutationFn: (data) => api.accountBook.updateAccount(data),
  });

  const { date, item, amount, content } = inputs;

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!date || !item || !amount || !content) {
        alert("빈칸은 허용되지 않습니다.");
        return;
      }

      const newAccount = {
        accountId,
        date,
        item,
        amount,
        content,
      };

      console.log(accountId);

      await updateAccount(newAccount);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = () => {
    const isDelete = confirm("정말로 이 지출 할목을 삭제하시겠습니까?");
    if (!isDelete) return;

    dispatch(deleteAccount(params.accountId));
    navigate("/");
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

const StDetailFormWrapper = styled.form`
  background-color: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 16px;
`;

const StDetailInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & label {
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    text-align: left;
  }

  & input {
    padding: 10px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 14px;
  }
`;

const StDetailButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StDetailUpdateButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(0, 123, 255);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StDetailDeleteButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(255, 77, 77);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StDetailGoBackButton = styled.button`
  padding: 10px 20px;
  background-color: rgb(108, 117, 125);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default DetailFormComponent;
