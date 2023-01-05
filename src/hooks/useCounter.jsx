import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCount((preCount) => preCount + 1);
      } else {
        setCount((preCount) => preCount - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return count;
};

export default useCounter;
