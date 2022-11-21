import { Container, Divider, Flex } from "@chakra-ui/react";
import "@fontsource/noto-sans";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { MapMain } from "../src/Components/MapMain";
import NavBar from "../src/Components/NavBar";
import { PredictionResults } from "../src/Components/PredictionResults";

function MyApp() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);
  return (
    <Container w={"full"} maxW={"container.2xl"} h={"100vh"}>
      <Flex h={"full"} direction={"column"} minH={0}>
        <NavBar />
        <Divider borderColor={"gray.600"} />
        <Flex flex={1} minH={0} flexDirection={"row"} w={"full"} p={2}>
          <MapMain />
          <PredictionResults />
        </Flex>
      </Flex>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
