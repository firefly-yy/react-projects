import React from "react";
import { useSelector } from "react-redux";
import { State } from "../state";

function test() {
  const amount = useSelector((state: State) => state.bank);
  return <div></div>;
}

export default test;
