import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHandler from "./components/AppHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppHandler />
  </React.StrictMode>
);
