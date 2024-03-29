import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";

function App() {
  const dispatch = useDispatch();

  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const amount = useSelector((state: State) => state.bank);

  return (
    <div className="app">
      <h1>{amount}</h1>
      <button
        onClick={() => {
          depositMoney(100);
        }}
      >
        Deposit
      </button>
      <button
        onClick={() => {
          withdrawMoney(50);
        }}
      >
        Withdraw
      </button>
      <button
        onClick={() => {
          bankrupt();
        }}
      >
        Bankrupt
      </button>
    </div>
  );
}

export default App;
