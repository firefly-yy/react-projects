import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";
import Test from "./components/Test";

function App() {
  const dispatch = useDispatch();

  function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  }

  function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
  }
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
