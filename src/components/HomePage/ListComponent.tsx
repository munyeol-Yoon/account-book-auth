import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { RootState } from "../../redux/store";
import { AccountJSONDataType } from "../../types/account.type";
import {
  StListCardSummary,
  StListCardWrapper,
  StListWrapper,
} from "./ListComponentStyle";

const handleSortedDateAscData = (data: AccountJSONDataType[]) => {
  return data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

function ListComponent({
  month,
  handleGetMonthData,
}: {
  month: string;
  handleGetMonthData: (
    data: AccountJSONDataType[],
    month: number
  ) => AccountJSONDataType[];
}) {
  const user: any = useSelector<RootState>((state) => state.user.user);
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

  const filteredMonthData = handleGetMonthData(accountBook, parseInt(month));

  const sortedData = handleSortedDateAscData(filteredMonthData);

  const handleOnClickListItem = (element: AccountJSONDataType) => {
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

export default ListComponent;
