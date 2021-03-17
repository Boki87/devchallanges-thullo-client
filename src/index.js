import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "overmind-react";
import "./index.css";
import App from "./App";

import { overmind } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
