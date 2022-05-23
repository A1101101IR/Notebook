import "./style.scss";
import App from "./App";
import ReactDOM from "react-dom/client";
/* import React, { useContext } from "react"; */
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
