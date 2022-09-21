import React from "react";
import MapboxComponent from "./Components/MapboxComponent";
import NavBar from "./Components/NavBar";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="1920px">
      <NavBar />
      <MapboxComponent />
    </Container>
  );
}

export default App;
