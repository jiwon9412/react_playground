import { useState } from "react";

const useInput = (checkValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = checkValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleInputBlur = (e) => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    handleInputChange,
    handleInputBlur,
    resetValue,
  };
};

export default useInput;
