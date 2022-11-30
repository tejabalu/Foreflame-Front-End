import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import ControlPanel from "./ControlPanel";
import { circleLayer, heatmapLayer, skyLayer } from "./map-style";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapGL, { Layer, Source } from "!react-map-gl";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl";
import { FullscreenControl, GeolocateControl, MapRef, NavigationControl, Popup } from "react-map-gl";
import DrawControl from "./draw-control";
import GeocoderControl from "./geocoder-control";
import { MAPBOX_TOKEN } from "./MapMain";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { bbox } from "@turf/turf";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../LoginContext";
import { MapDrawFunctions } from "./MapDrawFunctions";

export const PlayContext = createContext<Partial<{ isPlay: boolean; setIsPlay: React.Dispatch<React.SetStateAction<boolean>> }>>({});

function filterFeaturesByDay(featureCollection: { features: any[] }, time: number | string | Date) {
  console.log(time);
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature: { properties: { time: string | number | Date } }) => {
    const featureDate = new Date(feature.properties.time);
    // console.log(featureDate, "selection triggered");

    return featureDate.getFullYear() === year && featureDate.getMonth() === month && featureDate.getDate() === day;
  });
  return { type: "FeatureCollection", features };
}

interface MapComponentInterface {
  mapTheme: String;
  setBookmarks: any;
  selectedBookmarks: string;
}

export default function MapboxComponent({ mapTheme, setBookmarks, selectedBookmarks }: MapComponentInterface) {
  const [isAllDays, setIsAllDays] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [firePredictions, setFirePredictions] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [drawFeatures, setDrawFeatures] = useState({});
  const [popupFeatures, setPopupFeatures] = useState<[boolean, number, number, number, number]>([false, 0, 0, 0, 0]);

  useEffect(() => {
    fetch("https://foreflame.eastus.cloudapp.azure.com/static/single_instance.geojson")

      .then((resp) => resp.json())
      .then((json) => {
        // TODO: validate the JSON data first
        const features = json.features;
        const startTime = features[0].properties.time;
        const endTime = features[features.length - 1].properties.time;
        console.log(new Date(startTime), new Date(endTime), "first download test");

        setTimeRange([startTime, endTime]);
        setFirePredictions(json);
        setSelectedTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err));
  }, []);

  const data = useMemo(() => {
    if (isAllDays) {
      return firePredictions;
    } else if (firePredictions) {
      return filterFeaturesByDay(firePredictions, selectedTime);
    }
  }, [firePredictions, isAllDays, selectedTime]);

  // Map drawing stuff

  const { colRef, user } = useContext(UserContext);

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

  useEffect(() => {
    const bookmarks = [];
    for (const f in drawFeatures) {
      const bookmark: any = {};
      // TODO: update types for all bookmark features
      // @ts-ignore
      bookmark["featureName"] = drawFeatures[f]["featureName"];
      bookmark["id"] = f;
      bookmarks.push(bookmark);
    }
    setBookmarks(bookmarks);
  }, [drawFeatures]);

  const { onUpdate, onDelete } = MapDrawFunctions({ colRef, setDrawFeatures });

  // Fit to bounding box for map based on bookmark feature selection
  const mapRef = useRef<MapRef>();

  useEffect(() => {
    if (selectedBookmarks) {
      // @ts-ignore
      // TODO: set proper types
      const [minLng, minLat, maxLng, maxLat] = bbox(drawFeatures[selectedBookmarks]);

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 3000 }
      );
    }
  }, [selectedBookmarks]);

  const popupEvent = (e: MapLayerMouseEvent) => {
    e.originalEvent.stopPropagation();
    const clickedFeature = mapRef.current?.queryRenderedFeatures(e.point, { layers: ["circle"] });
    setPopupFeatures([false, 0, 0, 0, 0]);
    if (clickedFeature && clickedFeature[0]) {
      // @ts-ignore
      console.log(clickedFeature[0].layer.id, clickedFeature[0].properties.mag, clickedFeature[0].properties.time, "mouse event test");
      // @ts-ignore
      setPopupFeatures([true, e.lngLat.lng, e.lngLat.lat, clickedFeature[0].properties.mag, clickedFeature[0].properties.time]);
      console.log(popupFeatures, e, "mouse clicked");
    }
  };

  return (
    <PlayContext.Provider value={{ isPlay, setIsPlay }}>
      <Flex direction={"column"} border={"1px"} borderColor={"gray.300"} borderRadius={"xl"} overflow={"hidden"} h={"full"}>
        <Box flex={1}>
          {user && (
            <MapGL
              ref={mapRef}
              id={"mapRef"}
              initialViewState={{
                latitude: 50,
                longitude: -120,
                zoom: 4,
              }}
              mapStyle={mapTheme}
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={popupEvent}
              {...(mapTheme === "mapbox://styles/mapbox/satellite-v9" && {
                maxPitch: 85,
                terrain: { source: "mapbox-dem", exaggeration: 1.5 },
              })}>
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
                initialDrawFeatures={drawFeatures}
                colRef={colRef}
              />

              {data && (
                <Source type="geojson" data={data}>
                  <Layer {...heatmapLayer} />
                  <Layer {...circleLayer} />
                </Source>
              )}

              {popupFeatures[0] && (
                <Popup longitude={popupFeatures[1]} latitude={popupFeatures[2]} anchor="bottom">
                  The confidence of prediction for this point is {(popupFeatures[3] * 100).toString().substring(0, 4)}%. <br />
                  Time: {popupFeatures[4]}
                </Popup>
              )}

              {mapTheme === "mapbox://styles/mapbox/satellite-v9" && (
                <>
                  <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />
                  <Layer {...skyLayer} />
                </>
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
          startTime={timeRange[1]}
          endTime={timeRange[0]}
          selectedTime={selectedTime}
          allDays={isAllDays}
          setSelectedTime={setSelectedTime}
          setIsAllDays={setIsAllDays}
        />
      </Flex>
    </PlayContext.Provider>
  );
}
