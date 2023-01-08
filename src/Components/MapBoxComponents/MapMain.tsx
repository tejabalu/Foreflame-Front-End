import { Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { QuickStats } from "../QuickStats";
import MapboxComponent from "./MapboxComponent";
// @ts-ignore
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { MapProvider } from "react-map-gl";
import { DailyRiskHighlights } from "../PredictionOverview";
import { LayerSelection } from "./LayerSelection";
import { filterFeaturesByDay } from "./mapUtilities";
// import "./SearchBoxStyles.css";
import geojsonData from "../../../assembled_data2000largest_full.json";

// @ts-ignore
export const MAPBOX_TOKEN: string = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

export const geoCoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
  mapboxgl: mapboxgl,
  placeholder: "Search for Location",
});

interface MapMainInterface {
  setBookmarks: any;
  selectedBookmarks: any;
}

export function MapMain({ setBookmarks, selectedBookmarks }: MapMainInterface) {
  const [MapTheme, setMapTheme] = useState("mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob");

  const [isAllDays, setIsAllDays] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [firePredictions, setFirePredictions] = useState(null);
  const [mapBounds, setMapBounds] = useState<mapboxgl.LngLatBounds>();

  useEffect(() => {
    console.log(geojsonData);
    const features = geojsonData.features;
    const startTime = features[0].properties.time;
    const endTime = features[features.length - 1].properties.time;
    console.log(new Date(startTime), new Date(endTime), "first download test");

    setTimeRange([startTime, endTime]);
    // @ts-ignore
    setFirePredictions(geojsonData);
    setSelectedTime(endTime);
  }, []);

  const data = useMemo(() => {
    if (isAllDays) {
      return firePredictions;
    } else if (firePredictions) {
      return filterFeaturesByDay(firePredictions, selectedTime);
    }
  }, [firePredictions, isAllDays, selectedTime]);

  return (
    <MapProvider>
      <Flex direction={"column"} flex={0.8} w={"100%"} borderRadius={"xl"} m={1} h={"full"} alignItems={"flex-start"}>
        <LayerSelection setMapTheme={setMapTheme} />
        <DailyRiskHighlights data={data} mapBounds={mapBounds} />
      </Flex>
      <Flex flex={2.5} flexDirection={"column"} m={1}>
        <QuickStats data={data} mapBounds={mapBounds} />
        <MapboxComponent
          mapTheme={MapTheme}
          setBookmarks={setBookmarks}
          selectedBookmarks={selectedBookmarks}
          data={data}
          timeRange={timeRange}
          selectedTime={selectedTime}
          isAllDays={isAllDays}
          setSelectedTime={setSelectedTime}
          setIsAllDays={setIsAllDays}
          setMapBounds={setMapBounds}
        />
      </Flex>
    </MapProvider>
  );
}
