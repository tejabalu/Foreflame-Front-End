import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ControlPanel from "./ControlPanel";
import { circleLayer, heatmapLayer } from "./map-style";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapGL, { Layer, Source } from "!react-map-gl";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import { FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import DrawControl from "./draw-control";
import GeocoderControl from "./geocoder-control";
import { MAPBOX_TOKEN, ViewState } from "./MapMain";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { UserContext } from "../../LoginContext";

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

export default function MapboxComponent(props: { mapViewState: ViewState; handleViewPortChange: any; mapTheme: String }) {
  const [isAllDays, setIsAllDays] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [isPlay, setIsPlay] = useState(false);

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
      .catch((err) => console.error("Could not load data", err));
  }, []);

  const data = useMemo(() => {
    if (isAllDays) {
      return earthquakes;
    } else if (earthquakes) {
      return filterFeaturesByDay(earthquakes, selectedTime);
    }
  }, [earthquakes, isAllDays, selectedTime]);

  // Map drawing stuff

  const [drawFeatures, setDrawFeatures] = useState({});
  const { colRef, user } = useContext(UserContext);
  const router = useRouter();

  // TODO: this data is being updated again in the draw-control.ts
  // Pass this data to that function instead of making 2 db calls.
  useEffect(() => {
    if (colRef) {
      getDoc(doc(colRef, "drawFeatures")).then((docSnap) => {
        const downloaded = docSnap.data();
        if (downloaded) {
          const prevFeatures = JSON.parse(downloaded.data);
          setDrawFeatures(prevFeatures);
        }
      });
    }
  }, [colRef]);

  const onUpdate = (e: any) => {
    console.log(colRef, "map colref test");
    setDrawFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      console.log(JSON.stringify(newFeatures));
      if (colRef) {
        setDoc(doc(colRef, "drawFeatures"), { data: JSON.stringify(newFeatures) })
          .then((e) => {
            console.log("Draw features written");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log(newFeatures);
      return newFeatures;
    });
  };

  const onDelete = (e: any) => {
    setDrawFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      console.log(JSON.parse(JSON.stringify(newFeatures)));
      if (colRef) {
        setDoc(doc(colRef, "drawFeatures"), { data: JSON.stringify(newFeatures) })
          .then((e) => {
            console.log("Draw features written");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log(newFeatures);
      return newFeatures;
    });
  };

  return (
    <PlayContext.Provider value={{ isPlay, setIsPlay }}>
      <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} borderRadius={"xl"} overflow={"hidden"} h={"full"}>
        <Box flex={1}>
          {user && (
            <MapGL
              id={"mapRef"}
              initialViewState={{
                ...props.mapViewState,
              }}
              mapStyle={props.mapTheme}
              mapboxAccessToken={MAPBOX_TOKEN}
              onMove={(e: { viewState: any }) => {
                props.handleViewPortChange(e.viewState);
              }}>
              <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="top-left" />
              <GeolocateControl position="bottom-left" />
              <FullscreenControl position="bottom-left" />
              <NavigationControl position="bottom-left" />

              <DrawControl
                position="bottom-left"
                displayControlsDefault={false}
                controls={{
                  polygon: true,
                  trash: true,
                }}
                defaultMode="draw_polygon"
                onCreate={onUpdate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                colRef={colRef}
              />

              {data && (
                <Source type="geojson" data={data}>
                  <Layer {...heatmapLayer} />
                  <Layer {...circleLayer} />
                </Source>
              )}
            </MapGL>
          )}
          {!user && (
            <Center height={"100%"}>
              <Heading size={"md"} color={"gray.700"}>
                Please login to use the map interface.
              </Heading>
            </Center>
          )}
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
