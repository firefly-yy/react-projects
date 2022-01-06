import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const createWyNGTSConfigModule = (div_name, tokenID, global_session) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(div_name)
  );
};

export { createWyNGTSConfigModule };
