import React from "react";
import MapboxComponent from "./Components/MapboxComponent";
import { NavBar } from "./Components/NavBar";

function App() {
  return (
    <div className="h-full">
      <NavBar />
      <MapboxComponent />
    </div>
  );
}

export default App;
