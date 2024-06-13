import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../../redux/slices/month.slice.ts";
import { RootState } from "../../redux/store";
import { StMonthButton, StMonthWrapper } from "./MonthComponentStyle";

const months: string[] = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
function MonthComponent() {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: RootState) => state.month.selectedMonth
  );
  const handleMonthOnClick = (selected: string) => {
    dispatch(setSelectedMonth(selected));
  };

  return (
    <section>
      <StMonthWrapper>
        {months.map((month, index) => (
          <StMonthButton
            key={index}
            onClick={() => handleMonthOnClick(month)}
            value={month}
            selected={selectedMonth === month}
          >
            {month}
          </StMonthButton>
        ))}
      </StMonthWrapper>
    </section>
  );
}

export default MonthComponent;
