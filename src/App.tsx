import React from "react";
import NavBar from "./Components/NavBar";
import { Container, Divider, Flex } from "@chakra-ui/react";
import { MapMain } from "./Components/MapMain";
import { PredictionResults } from "./Components/PredictionResults";

function App() {
  //TODO Fix container height issues
  return (
    <Container w={"full"} maxW={"container.2xl"} h={"100vh"}>
      <Flex h={"full"} direction={"column"}>
        <NavBar />
        <Divider borderColor={"gray.600"} />
        <Flex h={"full"} flexDirection={"row"} w={"full"} p={2}>
          <MapMain />
          <PredictionResults />
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
