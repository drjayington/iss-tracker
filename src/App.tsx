import React from "react";
import Map from "./components/map";
import GlobalStateContextProvider from "./lib/GlobalContext";

export default function App() {
  return (
    <GlobalStateContextProvider>
      <div className="App">
        <Map />
      </div>
    </GlobalStateContextProvider>
  );
}
