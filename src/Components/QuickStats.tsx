import { Center, Flex, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import { filterQuickStatsByBounds } from "./MapBoxComponents/mapUtilities";

function StatItem({ title, value, icon }: { title: string; value: number | string; icon: any }) {
  if (typeof value === "number") {
    value = value.toPrecision(3);
  }

  return (
    <Center w={"full"}>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontWeight={"semibold"} fontSize={"sm"} mb={2}>
          {title}
        </Text>
        <Flex direction="row" alignItems={"center"} justifyContent={"center"}>
          <Image src={icon} h={"35px"} pr={2} />
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {value}
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}

interface QuickStatsInterface {
  data: { type: string; features: any[] } | null | undefined;
  mapBounds: mapboxgl.LngLatBounds | undefined;
}

export function QuickStats({ data, mapBounds }: QuickStatsInterface) {
  const { temp, precipitation, wind_speed, soil_moisture } = filterQuickStatsByBounds(data, mapBounds);

  return (
    <Stack
      direction={"row"}
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius={"xl"}
      divider={<StackDivider borderColor={"gray.300"} />}
      mb={1}
      p={1}
      bg={"gray.100"}>
      <StatItem title={"Avg. Temperature (F)"} value={temp} icon={"../Assets/QuickStatsLogos/temperature.svg"} />
      <StatItem title={"Avg. Precipitation (kg/m^2)"} value={precipitation} icon={"../Assets/QuickStatsLogos/humidity.svg"} />
      <StatItem title={"Avg. Wind Speed (m/s)"} value={wind_speed} icon={"../Assets/QuickStatsLogos/wind.svg"} />
      <StatItem title={"Avg. Soil Moisture (hPa)"} value={soil_moisture} icon={"../Assets/QuickStatsLogos/pressure.svg"} />
      {/* TODO: change soil moisture logo */}
      icon
    </Stack>
  );
}
