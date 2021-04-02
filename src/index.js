import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "overmind-react";
import "./index.css";
import App from "./App";

import { overmind } from "./store";

ReactDOM.render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.getElementById("root")
);
