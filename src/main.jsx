// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 import Router
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* 👈 wrap your App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
