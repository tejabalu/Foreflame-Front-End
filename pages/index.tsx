import { Container, Divider, Flex } from "@chakra-ui/react";
import React from "react";
// import Logout from "../src/Components/FirebaseAuth/Logout";
// import SignUp from "../src/Components/FirebaseAuth/SignUp";
import NavBar from "../src/Components/NavBar";
import HomePage from "../src/HomePage";

function App() {
  return (
    <Container w={"full"} minH={"100vh"} maxW={"container.2xl"} backgroundColor={"gray.50"}>
      <Flex h={"full"} direction={"column"} minH={0}>
        <NavBar />
        <Divider borderColor={"gray.600"} />
        <HomePage />
      </Flex>
    </Container>
  );
}

export default App;
