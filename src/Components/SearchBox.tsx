import { useMap } from "react-map-gl";
import React, { useEffect } from "react";
import { geoCoder } from "./MapMain";

export function SearchBox() {
  const { mapRef } = useMap();

  useEffect(() => {
    geoCoder.addTo("#geoCoderClass");

    return () => {
      const parentContainer = document.getElementById("geoCoderClass");
      const geoChild = document.getElementsByClassName("mapboxgl-ctrl-geocoder");

      if (!parentContainer || !geoChild) return;
      parentContainer.removeChild(geoChild[0]);
    };
  }, []);

  useEffect(() => {
    geoCoder.on("result", (e: any) => {
      console.dir(e);
      console.log(e.result.bbox);
      console.log("fits");
      mapRef?.fitBounds(
        [
          [e.result.bbox[0], e.result.bbox[1]], // southwestern corner of the bounds
          [e.result.bbox[2], e.result.bbox[3]], // northeastern corner of the bounds
        ],
        { padding: 100, offset: [0, 50], duration: 3000, essential: true }
      );
    });
  });
  return <div id={"geoCoderClass"}></div>;
}
