import { useSelector } from "react-redux";
import FormComponent from "../../components/HomePage/FormComponent";
import ListComponent from "../../components/HomePage/ListComponent";
import MonthComponent from "../../components/HomePage/MonthComponent";
import StatusBarComponent from "../../components/HomePage/StatusBarComponent";
import { RootState } from "../../redux/store";

function HomePage() {
  const { selectedMonth } = useSelector((state: RootState) => state.month);

  const handleGetMonthData = (data: any, month = 2) => {
    return data.filter((element: any) => {
      const entryMonth = new Date(element.date).getMonth() + 1;
      return entryMonth === month;
    });
  };

  return (
    <>
      <FormComponent />
      <MonthComponent />
      <StatusBarComponent
        month={selectedMonth}
        handleGetMonthData={handleGetMonthData}
      />
      <ListComponent
        month={selectedMonth}
        handleGetMonthData={handleGetMonthData}
      />
    </>
  );
}

export default HomePage;
