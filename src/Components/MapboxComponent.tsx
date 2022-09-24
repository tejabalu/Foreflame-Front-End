import * as React from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import ControlPanel from "./ControlPanel";
import { circleLayer, heatmapLayer } from "./map-style";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapGL, { Layer, Source } from "!react-map-gl";
import mapboxgl from "mapbox-gl";
import { Box } from "@chakra-ui/react";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVqYWJhbHUiLCJhIjoiY2w4N29tb215MWJnYzN1cG5qYzFsZ29sZyJ9.xb_GFzh_Dv7-tB5QWqpPlw";

export const PlayContext = createContext<
  Partial<{ isPlay: boolean; setIsPlay: React.Dispatch<React.SetStateAction<boolean>> }>
>({});

function filterFeaturesByDay(featureCollection: { features: any[] }, time: number | string | Date) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature: { properties: { time: string | number | Date } }) => {
    const featureDate = new Date(feature.properties.time);
    return featureDate.getFullYear() === year && featureDate.getMonth() === month && featureDate.getDate() === day;
  });
  return { type: "FeatureCollection", features };
}

export default function MapboxComponent() {
  const [isAllDays, setIsAllDays] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [isPlay, setIsPlay] = useState(false); //

  useEffect(() => {
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // TODO: validate the JSON data first
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        setSelectedTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    if (isAllDays) {
      return earthquakes;
    } else if (earthquakes) {
      return filterFeaturesByDay(earthquakes, selectedTime);
    }
  }, [earthquakes, isAllDays, selectedTime]);

  return (
    <PlayContext.Provider value={{ isPlay, setIsPlay }}>
      <Box border={"1px"} borderColor={"gray.300"} borderRadius={"xl"} overflow={"hidden"} h={"full"}>
        <Box height={"full"} zIndex={-1}>
          <MapGL
            initialViewState={{
              latitude: 40,
              longitude: -100,
              zoom: 3,
            }}
            projection="globe"
            fog={{
              color: "rgba(255,254,254,0.25)",
              "horizon-blend": 0.001,
              // "space-color": "#000000",
            }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={MAPBOX_TOKEN}>
            {data && (
              <Source type="geojson" data={data}>
                <Layer {...heatmapLayer} />
                <Layer {...circleLayer} />
              </Source>
            )}
          </MapGL>
        </Box>
        <ControlPanel
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={isAllDays}
          setSelectedTime={setSelectedTime}
          setIsAllDays={setIsAllDays}
        />
      </Box>
    </PlayContext.Provider>
  );
}
