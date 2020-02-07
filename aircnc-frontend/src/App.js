import React from "react";

import "./App.css";
import logo from "./assets/logo.svg";
import Router from "./routes";

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo AirCnc" />

      <div className="content">
        <Router />
      </div>
    </div>
  );
}

export default App;
