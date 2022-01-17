import React from "react";
import { useSelector } from "react-redux";
import { State } from "../state";

function test() {
  const amount = useSelector((state: State) => state.bank);
  return (
    <div>
      <p>here is a number from redux</p>
      <p>{amount}</p>
    </div>
  );
}

export default test;
