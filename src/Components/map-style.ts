import type { HeatmapLayer, CircleLayer } from "react-map-gl";

const MAX_ZOOM_LEVEL = 9;

export const heatmapLayer: HeatmapLayer = {
  id: "heatmap",
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 2, MAX_ZOOM_LEVEL, 6],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      //TODO update colors for heatmap
      0,
      "rgba(0,128,255,0)",
      0.2,
      "rgb(0,58,255)",
      0.4,
      "rgb(0,255,89)",
      0.6,
      "rgb(255,242,0)",
      0.8,
      "rgb(255,106,0)",
      0.9,
      "rgb(255,0,0)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 2, 2, MAX_ZOOM_LEVEL, 20],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 8, 1, 9, 0],
  },
};

export const circleLayer: CircleLayer = {
  id: "circle",
  type: "circle",
  minzoom: 7.5,
  paint: {
    // Size circle radius by earthquake magnitude and zoom level
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      2,
      ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
      12,
      ["interpolate", ["linear"], ["get", "mag"], 5, 8, 15, 50],
    ],
    // Color circle by earthquake magnitude
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "mag"],
      1,
      "rgb(69,134,192)",
      2,
      "rgb(0,58,255)",
      3,
      "rgb(0,255,89)",
      4,
      "rgb(255,242,0)",
      5,
      "rgb(255,106,0)",
      6,
      "rgb(255,0,0)",
    ],
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    // Transition from heatmap to circle layer by zoom level
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
  },
};
