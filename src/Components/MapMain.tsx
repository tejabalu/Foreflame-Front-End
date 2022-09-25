import { Box, Flex, Input } from "@chakra-ui/react";
import { QuickStats } from "./QuickStats";
import MapboxComponent from "./MapboxComponent";
import React, { useCallback, useRef, useState } from "react";

// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function MapMain() {
  const [MapViewState, setViewState] = useState({ latitude: 40, longitude: -100, zoom: 3 });
  const mapRef = useRef();
  const geocoderContainerRef: any = useRef();

  const handleViewportChange = useCallback((newViewport: ViewState) => {
    setViewState(newViewport);
    console.log("view port changed");
  }, []);

  return (
    <>
      <Box flex={1} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} m={1} p={1}>
        <Input placeholder={"Search for Location"} />
      </Box>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats />
        <MapboxComponent mapViewState={MapViewState} mapRef={mapRef} handleViewPortChange={handleViewportChange} />
      </Flex>
    </>
  );
}
