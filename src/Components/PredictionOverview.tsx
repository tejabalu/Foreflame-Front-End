import { Center, Flex, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { BsMoisture } from "react-icons/bs";
import { IoRainy } from "react-icons/io5";
import { RiWindyLine } from "react-icons/ri";
import { TbTemperature } from "react-icons/tb";
import { ComponentTitle } from "./ComponentTitle";
import { formatTime } from "./MapBoxComponents/ControlPanel";
import { getUniqueFeaturesByBounds } from "./MapBoxComponents/mapUtilities";

function PredictionStat(props: {
  date: string;
  confidence: number;
  temperature: number;
  wind: number;
  precipitation: number;
  soil_moisture: number;
}) {
  const { date, confidence, temperature, wind, precipitation, soil_moisture } = props;
  const confidencePercentage = parseInt((confidence * 100).toPrecision(2));

  const colorInterpolate = require("color-interpolate");
  const colorRange = colorInterpolate(["rgb(172, 207, 241)", "rgb(0,58,255)", "rgb(0,255,89)", "rgb(255,242,0)", "rgb(255,150,0)", "rgb(255,0,0)"]);
  console.log(colorRange(0.1), colorRange(0.6), colorRange(0.8));
  const color = colorRange(confidence * 1.2);

  return (
    <Center flexDirection={"column"} bg={"graygreen"} borderRadius={"lg"} p={2}>
      <Text fontSize={"sm"} mb={1}>
        {date}
      </Text>
      <Flex direction={"row"} alignItems={"center"}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mr={4}
          color={confidence > 0 ? color : "white"}
          fontWeight={confidence > 80 ? "semibold" : "md"}>
          {confidencePercentage > 0 ? (
            <>
              <Text fontWeight={"semibold"} fontSize={"3xl"}>
                {(confidence * 100).toPrecision(2)}%
              </Text>
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Prediction
              </Text>
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                Confidence
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={"sm"}>Historical</Text>
              <Text fontSize={"sm"}>Data</Text>
            </>
          )}
        </Flex>
        <Flex direction={"column"} pt={2}>
          <Tooltip label="Temperature">
            <HStack>
              <TbTemperature />
              <Text>{temperature} °F</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Precipitation">
            <HStack>
              <IoRainy />
              <Text>{precipitation.toPrecision(3)} (kg/m^2)</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Wind Speed">
            <HStack>
              <RiWindyLine />
              <Text>{wind.toPrecision(3)} (m/s)</Text>
            </HStack>
          </Tooltip>
          <Tooltip label="Soil Moisture">
            <HStack>
              <BsMoisture />
              <Text>{soil_moisture.toPrecision(3)} (kg/m^2)</Text>
            </HStack>
          </Tooltip>
        </Flex>
      </Flex>
    </Center>
  );
}

interface DailyRiskHighlightsInterface {
  data: { type: string; features: any[] } | null | undefined;
  mapBounds: mapboxgl.LngLatBounds | undefined;
}

export function DailyRiskHighlights({ data, mapBounds }: DailyRiskHighlightsInterface) {
  //TODO set states for temp, humid, wind, prob
  const heading = "Highlights";
  const popOverContent = "Displays the highlights for the selected day and for regions in the map bounds.";

  const highlights = getUniqueFeaturesByBounds(data, mapBounds);
  console.log(highlights, "test");

  const predictionStat = highlights?.map((feature: any, index) => {
    const dateTime = formatTime(feature.properties.time);
    const date = dateTime !== undefined ? dateTime : "--";
    const confidence = feature.properties.confidence ? feature.properties.confidence : 0;
    const temp = feature.properties.temp ? feature.properties.temp : 0;
    const wind_speed = feature.properties.wind_speed ? feature.properties.wind_speed : 0;
    const soil_moisture = feature.properties.soil_moisture ? feature.properties.soil_moisture : 0;
    const precipitation = feature.properties.precipitation ? feature.properties.precipitation : 0;

    return (
      <VStack key={index} p={1}>
        <PredictionStat
          date={date}
          confidence={confidence}
          temperature={temp}
          wind={wind_speed}
          precipitation={precipitation}
          soil_moisture={soil_moisture}
        />
      </VStack>
    );
  });

  return (
    <Flex direction={"column"} overflow={"auto"} mt={1} mb={2} p={4} borderRadius={"lg"} w={"100%"} h={"100%"} bg={"green"}>
      {ComponentTitle({ heading, popOverContent })}

      <Flex flex={1} direction={"column"} color={"white"} mt={4} mb={2} justifyContent={"flex-start"} alignItems={"center"}>
        {predictionStat}
      </Flex>
    </Flex>
  );
}
