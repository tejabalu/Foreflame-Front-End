import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { QuickStats } from "../QuickStats";
import MapboxComponent from "./MapboxComponent";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { MapProvider } from "react-map-gl";
import { PredictionOverview } from "../PredictionOverview";
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
  const [MapTheme, setMapTheme] = useState("mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob");

  return (
    <MapProvider>
      <Flex direction={"column"} flex={1} w={"100%"} borderRadius={"xl"} m={1} h={"full"} alignItems={"flex-start"}>
        <LayerSelection setMapTheme={setMapTheme} />
        <PredictionOverview />
      </Flex>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats />
        <MapboxComponent mapTheme={MapTheme} />
      </Flex>
    </MapProvider>
  );
}
