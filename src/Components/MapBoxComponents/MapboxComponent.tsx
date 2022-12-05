import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ControlPanel, { formatTime } from "./ControlPanel";
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

interface MapComponentInterface {
  mapTheme: String;
  setBookmarks: any;
  selectedBookmarks: string;
  data: { type: string; features: any[] } | null | undefined;
  timeRange: number[];
  selectedTime: number;
  isAllDays: boolean;
  setSelectedTime: React.Dispatch<React.SetStateAction<number>>;
  setIsAllDays: React.Dispatch<React.SetStateAction<boolean>>;
  setMapBounds: any;
}

export default function MapboxComponent({
  mapTheme,
  setBookmarks,
  selectedBookmarks,
  data,
  timeRange,
  selectedTime,
  isAllDays,
  setSelectedTime,
  setIsAllDays,
  setMapBounds,
}: MapComponentInterface) {
  const [isPlay, setIsPlay] = useState(false);
  const [drawFeatures, setDrawFeatures] = useState({});
  const [popupFeatures, setPopupFeatures] = useState({
    show: false,
    lng: 0,
    lat: 0,
    mag: 0,
    time: 0,
    temp: 0,
    precipitation: 0,
    wind_speed: 0,
    soil_moisture: 0,
  });

  console.log(data);

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
    setPopupFeatures({ show: false, lng: 0, lat: 0, mag: 0, time: 0, temp: 0, precipitation: 0, wind_speed: 0, soil_moisture: 0 });
    if (clickedFeature && clickedFeature[0]) {
      // @ts-ignore
      console.log(clickedFeature[0], clickedFeature[0].properties.mag, clickedFeature[0].properties.time, "mouse event test");
      // @ts-ignore
      setPopupFeatures({
        show: true,
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        mag: clickedFeature[0].properties ? clickedFeature[0].properties.confidence : 0,
        time: clickedFeature[0].properties ? clickedFeature[0].properties.time : 0,
        temp: clickedFeature[0].properties ? clickedFeature[0].properties.temp : 0,
        precipitation: clickedFeature[0].properties ? clickedFeature[0].properties.precipitation : 0,
        wind_speed: clickedFeature[0].properties ? clickedFeature[0].properties.wind_speed : 0,
        soil_moisture: clickedFeature[0].properties ? clickedFeature[0].properties.soil_moisture : 0,
      });
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
              })}
              onLoad={() => {
                setMapBounds(mapRef.current?.getBounds());
              }}
              onMoveEnd={(e: any) => {
                setMapBounds(mapRef.current?.getBounds());
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

              {popupFeatures.show && PopUpFunction(popupFeatures, setPopupFeatures)}

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
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={isAllDays}
          setSelectedTime={setSelectedTime}
          setIsAllDays={setIsAllDays}
          isHistorical={data?.features[0] && data?.features[0].properties.mag >= 0 ? false : true}
        />
      </Flex>
    </PlayContext.Provider>
  );
}

function PopUpFunction(
  popupFeatures: {
    show: boolean;
    lng: number;
    lat: number;
    mag: number;
    time: number;
    temp: number;
    precipitation: number;
    wind_speed: number;
    soil_moisture: number;
  },
  setPopupFeatures: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      lng: number;
      lat: number;
      mag: number;
      time: number;
      temp: number;
      precipitation: number;
      wind_speed: number;
      soil_moisture: number;
    }>
  >
) {
  return (
    <Popup
      longitude={popupFeatures.lng}
      latitude={popupFeatures.lat}
      anchor="bottom"
      onClose={() => {
        setPopupFeatures({ show: false, lng: 0, lat: 0, mag: 0, time: 0, temp: 0, precipitation: 0, wind_speed: 0, soil_moisture: 0 });
      }}>
      {popupFeatures.mag >= 0 && "The confidence of prediction for this point is " + (popupFeatures.mag * 100).toString().substring(0, 4) + "%."}
      {popupFeatures.mag >= 0 && <br />}
      Time: {formatTime(popupFeatures.time)}
      <br />
      Temperature: {popupFeatures.temp.toPrecision(3)}
      <br />
      Precipitation: {popupFeatures.precipitation.toPrecision(3)}
      <br />
      Wind Speed: {popupFeatures.wind_speed.toPrecision(3)}
      <br />
      Soil Moisture: {popupFeatures.soil_moisture.toPrecision(3)}
    </Popup>
  );
}
