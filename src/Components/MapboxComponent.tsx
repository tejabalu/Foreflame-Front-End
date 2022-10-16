import * as React from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import ControlPanel from "./ControlPanel";
import { circleLayer, heatmapLayer } from "./map-style";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapGL, { Layer, Source } from "!react-map-gl";
import mapboxgl from "mapbox-gl";
import { Box, Flex } from "@chakra-ui/react";
import { MAPBOX_TOKEN, ViewState } from "./MapMain";
import { FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export const PlayContext = createContext<Partial<{ isPlay: boolean; setIsPlay: React.Dispatch<React.SetStateAction<boolean>> }>>({});

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

export default function MapboxComponent(props: { mapViewState: ViewState; handleViewPortChange: any }) {
  const [isAllDays, setIsAllDays] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    fetch("https://20.84.59.6:5000/static/earthquakes.geojson")
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
      .catch((err) => console.error("Could not load data", err));
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
      <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} borderRadius={"xl"} overflow={"hidden"} h={"full"}>
        <Box flex={1}>
          <MapGL
            id={"mapRef"}
            initialViewState={{
              ...props.mapViewState,
            }}
            // projection="globe"
            mapStyle="mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(e: { viewState: any }) => {
              props.handleViewPortChange(e.viewState);
            }}>
            <GeolocateControl position="bottom-left" />
            <FullscreenControl position="bottom-left" />
            <NavigationControl position="bottom-left" />
            {data && (
              <Source type="geojson" data={data}>
                <Layer {...heatmapLayer} />
                <Layer {...circleLayer} />
              </Source>
            )}
            {/*onViewPortChange={props.handleViewPortChange}*/}
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
      </Flex>
    </PlayContext.Provider>
  );
}
