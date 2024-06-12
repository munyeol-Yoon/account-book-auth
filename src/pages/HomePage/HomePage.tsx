import { useState } from "react";
import { useSelector } from "react-redux";
import FormComponent from "../../components/HomePage/FormComponent";
import ListComponent from "../../components/HomePage/ListComponent";
import MonthComponent from "../../components/HomePage/MonthComponent";
import StatusBarComponent from "../../components/HomePage/StatusBarComponent";
import { AccountEntry } from "../../redux/slices/accountBook.slice";
import { RootState } from "../../redux/store";

function HomePage() {
  const { selectedMonth } = useSelector((state: RootState) => state.month);
  const [month, setMonth] = useState<string>(selectedMonth ?? "1월");

  const handleGetMonthData = (data: AccountEntry[], month = 2) => {
    return data.filter((element) => {
      const entryMonth = new Date(element.date).getMonth() + 1;
      return entryMonth === month;
    });
  };

  return (
    <>
      <FormComponent />
      <MonthComponent setMonth={setMonth} />
      <StatusBarComponent
        month={month}
        handleGetMonthData={handleGetMonthData}
      />
      <ListComponent month={month} handleGetMonthData={handleGetMonthData} />
    </>
  );
}

export default HomePage;
