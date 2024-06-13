import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AccountEntry } from "../../redux/slices/accountBook.slice";
import { RootState } from "../../redux/store";

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
  const accountBook = useSelector((state: RootState) => state.accountBook);

  const filteredMonthData = handleGetMonthData(
    accountBook.accountBook,
    ~~month[0]
  );

  const sortedData = handleSortedDateAscData(filteredMonthData);

  return (
    <section>
      <StListWrapper>
        {sortedData.map((element) => (
          <Link
            to={`/${element.accountId}`}
            key={element.accountId}
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
          </Link>
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
