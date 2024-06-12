import { useEffect, useRef, useState } from "react";

const useFormInputs = (initialValue) => {
  const [inputs, setInputs] = useState(initialValue);

  const dateRef = useRef("");

  useEffect(() => {
    dateRef.current.focus();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleResetInputs = () => {
    setInputs(initialValue);
  };

  return { inputs, dateRef, handleOnChange, handleResetInputs, setInputs };
};

export default useFormInputs;
