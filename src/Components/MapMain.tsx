import { Box, Flex } from "@chakra-ui/react";
import { QuickStats } from "./QuickStats";
import MapboxComponent from "./MapboxComponent";
import React, { useCallback, useState } from "react";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import { SearchBox } from "./SearchBox";

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
    <>
      <Box flex={1} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} m={1} p={1}>
        <SearchBox />
      </Box>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats />
        <MapboxComponent mapViewState={MapViewState} handleViewPortChange={handleViewportChange} />
      </Flex>
    </>
  );
}
