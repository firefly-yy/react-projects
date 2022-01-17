import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";
import Test from "./components/Test";

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
        add
      </button>
      <button
        onClick={() => {
          withdrawMoney(50);
        }}
      >
        reduce
      </button>
      <button
        onClick={() => {
          bankrupt();
        }}
      >
        Bankrupt
      </button>
      <Test />
      <button>open vscode</button>
    </div>
  );
}

export default App;
