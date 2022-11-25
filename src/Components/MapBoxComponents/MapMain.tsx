import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { QuickStats } from "../QuickStats";
import MapboxComponent from "./MapboxComponent";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { MapProvider } from "react-map-gl";
import { LayerSelection } from "./LayerSelection";
// import "./SearchBoxStyles.css";

export interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYWJhbHUiLCJhIjoiY2w4N29tb215MWJnYzN1cG5qYzFsZ29sZyJ9.xb_GFzh_Dv7-tB5QWqpPlw";

export const geoCoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
  mapboxgl: mapboxgl,
  placeholder: "Search for Location",
});

export function MapMain() {
  const [MapViewState, setViewState] = useState({ latitude: 50, longitude: -120, zoom: 4 });
  const [MapTheme, setMapTheme] = useState("mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob");

  const handleViewportChange = useCallback(
    (newViewport: ViewState) => {
      setViewState(newViewport);
    },
    [MapViewState]
  );

  return (
    <MapProvider>
      <Flex direction={"column"} flex={1} w={"100%"} borderRadius={"xl"} m={1} h={"full"} alignItems={"flex-start"}>
        <Flex direction={"column"} flex={2} p={2} bg={"green"} w={"100%"} rounded={"xl"} mb={1}>
          {/* <SearchBox /> */}
          <LayerSelection setMapTheme={setMapTheme} />
        </Flex>
        <Box overflow={"auto"} flex={1} bg={"gray.100"} p={2} w={"100%"} rounded={"lg"} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"}>
          Trends
        </Box>
      </Flex>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats />
        <MapboxComponent mapViewState={MapViewState} handleViewPortChange={handleViewportChange} mapTheme={MapTheme} />
      </Flex>
    </MapProvider>
  );
}
