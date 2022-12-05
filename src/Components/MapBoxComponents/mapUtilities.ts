import { booleanPointInPolygon, point, polygon } from "@turf/turf";

export function filterFeaturesByDay(featureCollection: { features: any[] }, time: number | string | Date) {
  console.log(time);
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

export function filterQuickStatsByBounds(data: { type: string; features: any[] } | null | undefined, mapBounds: mapboxgl.LngLatBounds | undefined) {
  console.log(data, mapBounds?.getNorthEast(), "function test");
  if (mapBounds === undefined) {
    return { temp: "0", precipitation: "0", wind_speed: "0", soil_moisture: "0" };
  }

  const poly = polygon([
    [
      [mapBounds.getNorthEast().lng, mapBounds.getNorthEast().lat],
      [mapBounds.getNorthWest().lng, mapBounds.getNorthWest().lat],
      [mapBounds.getSouthWest().lng, mapBounds.getSouthWest().lat],
      [mapBounds.getSouthEast().lng, mapBounds.getSouthEast().lat],
      [mapBounds.getNorthEast().lng, mapBounds.getNorthEast().lat],
    ],
  ]);

  const filteredData = data?.features.filter((feature: { geometry: { coordinates: number[] } }) => {
    const feature_point = point([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]);
    return booleanPointInPolygon(feature_point, poly);
  });

  let getAverage = (arr: any) => {
    if (arr.length === 0 || arr === undefined) {
      return 0;
    }
    let reducer = (total: number, currentValue: number) => total + currentValue;
    let sum = arr.reduce(reducer);
    return sum / arr.length;
  };

  const temperatures = filteredData?.map((filteredData) => filteredData.properties.temp);
  const precipitation = filteredData?.map((filteredData) => filteredData.properties.precipitation);
  const soil_moisture = filteredData?.map((filteredData) => filteredData.properties.soil_moisture);
  const wind_speed = filteredData?.map((filteredData) => filteredData.properties.wind_speed);

  return {
    temp: getAverage(temperatures),
    precipitation: getAverage(precipitation),
    wind_speed: getAverage(wind_speed),
    soil_moisture: getAverage(soil_moisture),
  };
}
