import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { AccountEntry } from "../../redux/slices/accountBook.slice";
import {
  StStatusBarElement,
  StStatusBarSummary,
  StStatusBarSummaryElement,
  StStatusBarSummaryElementColorBox,
  StStatusBarWrapper,
  StStatusFontTitle,
} from "./StatusBarComponentStyle";

const colorPalette: string[] = [
  "#28d485",
  "#f5f87c",
  "#f36d54",
  "#f05650",
  "#d9d9d9",
  "#6499b0",
];

const handleCalculatePercentage = (part: number, whole: number) => {
  return ((part / whole) * 100).toFixed(2) + "%";
};

const handleCalculateMonthAmountTotalSum = (data: AccountEntry[]) => {
  return data.reduce((prev, current) => ~~prev + ~~current.amount, 0);
};

const handleSortedAmountDescData = (data: AccountEntry[]) => {
  return data.sort((a, b) => ~~b.amount - ~~a.amount);
};

function StatusBarComponent({
  month,
  handleGetMonthData,
}: {
  month: string;
  handleGetMonthData: (data: AccountEntry[], month: number) => AccountEntry[];
}) {
  const {
    data: accountBook,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["accountBook"],
    queryFn: () => api.accountBook.getAccount(),
  });

  if (!accountBook || isLoading || isFetching) {
    return <section>loading...</section>;
  }

  const filteredMonthData = handleGetMonthData(accountBook, parseInt(month));

  const totalAmount = handleCalculateMonthAmountTotalSum(filteredMonthData);

  const sortedData = handleSortedAmountDescData(filteredMonthData);

  return (
    <section>
      <StStatusFontTitle>
        {month} 총 지출 : {totalAmount} 원
      </StStatusFontTitle>
      <StStatusBarWrapper>
        {sortedData.map((element, index) => (
          <StStatusBarElement
            key={element.accountId}
            width={handleCalculatePercentage(~~element.amount, totalAmount)}
            color={colorPalette[index % colorPalette.length]}
          />
        ))}
      </StStatusBarWrapper>
      <StStatusBarSummary>
        {sortedData.map((element, index) => (
          <StStatusBarSummaryElement key={element.accountId}>
            <StStatusBarSummaryElementColorBox
              color={colorPalette[index % colorPalette.length]}
            />
            {element.item +
              ": " +
              element.amount +
              "원" +
              "(" +
              handleCalculatePercentage(~~element.amount, totalAmount) +
              ")"}
          </StStatusBarSummaryElement>
        ))}
      </StStatusBarSummary>
    </section>
  );
}

export default StatusBarComponent;
