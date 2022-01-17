import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";
import Test from "./components/Test";

function App() {
  const dispatch = useDispatch();
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(["dsadsa"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
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
      <a href="wy://">open vscode</a>
    </div>
  );
}

export default App;
