import React from "react";
import Map from "./components/map";
import GlobalStateContextProvider from "./lib/GlobalContext";
import "./App.scss";
import iss from "./resources/iss.jpg";

export default function App() {
  return (
    <GlobalStateContextProvider>
      <div className="app">
        <div className="header">
          <img src={iss} alt="International Space Station" />
          <h1> Tracker</h1>
        </div>
        <Map />
      </div>
    </GlobalStateContextProvider>
  );
}
