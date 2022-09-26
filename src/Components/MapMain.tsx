import { Box, Flex } from "@chakra-ui/react";
import { QuickStats } from "./QuickStats";
import MapboxComponent from "./MapboxComponent";
import React, { useCallback, useState } from "react";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./SearchBoxStyles.css";
import mapboxgl from "mapbox-gl";
import { SearchBox } from "./SearchBox";
import { MapProvider } from "react-map-gl";
import { LayerSelection } from "./LayerSelection";

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVqYWJhbHUiLCJhIjoiY2w4N29tb215MWJnYzN1cG5qYzFsZ29sZyJ9.xb_GFzh_Dv7-tB5QWqpPlw";

export const geoCoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
  mapboxgl: mapboxgl,
  placeholder: "Search for Location",
});

export function MapMain() {
  const [MapViewState, setViewState] = useState({ latitude: 50, longitude: -120, zoom: 4 });

  const handleViewportChange = useCallback(
    (newViewport: ViewState) => {
      setViewState(newViewport);
    },
    [MapViewState]
  );

  return (
    <MapProvider>
      <Flex direction={"column"} flex={1} w={"100%"} borderRadius={"xl"} m={1}>
        <Flex direction={"column"} flex={2} p={2} bg={"green"} w={"100%"} rounded={"xl"} mb={1}>
          <SearchBox />
          <LayerSelection />
        </Flex>
        <Box
          flex={1}
          bg={"gray.100"}
          p={2}
          w={"100%"}
          rounded={"lg"}
          border={"1px"}
          borderColor={"gray.400"}
          borderRadius={"xl"}>
          Trends
        </Box>
      </Flex>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats />
        <MapboxComponent mapViewState={MapViewState} handleViewPortChange={handleViewportChange} />
      </Flex>
    </MapProvider>
  );
}
