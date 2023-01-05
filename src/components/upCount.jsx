import useCounter from "../hooks/useCounter";
import Card from "./card";

const UpCount = () => {
  const count = useCounter();

  return <Card>{count}</Card>;
};

export default UpCount;
