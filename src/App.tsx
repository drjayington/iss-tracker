import React from "react";
import "./App.css";
import Map from "./components/map";
import GlobalStateContextProvider from "./lib/GlobalContext";

function App() {
  return (
    <GlobalStateContextProvider>
      <div className="App">
        <Map
          center={{
            lat: 59.95,
            lng: 30.33,
          }}
          zoom={11}
        ></Map>
      </div>
    </GlobalStateContextProvider>
  );
}

export default App;
