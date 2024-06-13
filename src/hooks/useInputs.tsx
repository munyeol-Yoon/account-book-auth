import { useEffect, useRef, useState } from "react";

interface InputsType {
  [key: string]: any;
}

const useFormInputs = (initialValue: InputsType) => {
  const [inputs, setInputs] = useState<InputsType>(initialValue);

  const dateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (dateRef.current && typeof dateRef.current.focus === "function") {
      dateRef.current.focus();
    }
  }, [dateRef]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
