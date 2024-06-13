import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { AccountEntry } from "../../redux/slices/accountBook.slice";

const handleSortedDateAscData = (data: AccountEntry[]) => {
  return data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

function ListComponent({
  month,
  handleGetMonthData,
}: {
  month: string;
  handleGetMonthData: (data: AccountEntry[], month: number) => AccountEntry[];
}) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const {
    data: accountBook,
    isLoading,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ["accountBook"],
    queryFn: () => api.accountBook.getAccount(),
  });

  if (!accountBook || isLoading || isFetching || isPending) {
    return <section>loading...</section>;
  }

  const filteredMonthData = handleGetMonthData(accountBook, ~~month[0]);

  const sortedData = handleSortedDateAscData(filteredMonthData);

  const handleOnClickListItem = (element) => {
    if (element.userId !== user.id) {
      alert("다른 유저의 글을 변경 할 수 없습니다.");
      return;
    }
    navigate(`/${element.id}`);
  };

  return (
    <section>
      <StListWrapper>
        {sortedData.map((element) => (
          <div
            onClick={() => handleOnClickListItem(element)}
            key={element.id}
            style={{ textDecoration: "none" }}
          >
            <StListCardWrapper key={element.accountId}>
              <StListCardSummary>
                <span>{element.date}</span>
                <span>
                  {element.item +
                    "-" +
                    element.content +
                    " (by " +
                    element.userId +
                    ")"}
                </span>
              </StListCardSummary>
              <span>{element.amount}</span>
            </StListCardWrapper>
          </div>
        ))}
      </StListWrapper>
    </section>
  );
}

const StListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StListCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: rgb(249, 249, 249);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  cursor: pointer;

  & span:last-child {
    font-weight: bold;
    color: rgb(0, 123, 255);
    flex-shrink: 0;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

const StListCardSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ListComponent;
