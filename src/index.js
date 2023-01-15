import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import App_movie from "./App_movie";
import reportWebVitals from "./reportWebVitals";
import App_Join from "./App_Join";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App_Join />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
