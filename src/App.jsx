import React from "react";
import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <div className="title">
        <img src="/src/assets/beer-mug.png" alt="beer mug" />
        <h1>Brewery</h1>
      </div>

      <Outlet />
    </>
  );
}

export default App;
