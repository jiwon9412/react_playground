import React from "react";
import useCounter from "../hooks/useCounter";
import Card from "./card";

const DownCount = () => {
  const count = useCounter(false);
  return <Card>{count}</Card>;
};

export default DownCount;
