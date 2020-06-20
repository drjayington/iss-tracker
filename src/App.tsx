import React from "react";
import Map from "./components/map";
import GlobalStateContextProvider from "./lib/GlobalContext";
import "./App.scss";

export default function App() {
  return (
    <GlobalStateContextProvider>
      <div className="app">
        <h1>International Space Station Tracker</h1>
        <Map />
      </div>
    </GlobalStateContextProvider>
  );
}
