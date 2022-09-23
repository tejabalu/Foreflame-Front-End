import React from "react";
import MapboxComponent from "./Components/MapboxComponent";
import NavBar from "./Components/NavBar";
import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import { QuickStats } from "./Components/QuickStats";

function App() {
  return (
    <Container maxW="1920px">
      <NavBar />
      <Divider />
      <Flex flexDirection={"row"} w={"full"} p={2}>
        <Box flex={1} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} m={1} p={1}>
          Search Location
        </Box>
        <Flex flex={2.5} flexDirection={"column"} m={1}>
          <QuickStats />
          <MapboxComponent />
        </Flex>
        <Box flex={1} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} m={1} p={1}>
          Prediction Results
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
