import React from "react";
import NavBar from "./Components/NavBar";
import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import { MapMain } from "./Components/MapMain";
import { MapProvider } from "react-map-gl";

function App() {
  return (
    <Container w={"full"} maxW={"container.2xl"} h={"100vh"}>
      <Flex h={"full"} direction={"column"}>
        <NavBar />
        <Divider />
        <MapProvider>
          <Flex h={"full"} flexDirection={"row"} w={"full"} p={2}>
            <MapMain />
            <Box flex={1} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} m={1} p={1}>
              Prediction Results
            </Box>
          </Flex>
        </MapProvider>
      </Flex>
    </Container>
  );
}

export default App;
