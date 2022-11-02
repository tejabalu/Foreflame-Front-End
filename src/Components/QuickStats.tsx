import { Center, Flex, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import humidity from "../Assets/QuickStatsLogos/humidity.svg";
import pressure from "../Assets/QuickStatsLogos/pressure.svg";
import temperature from "../Assets/QuickStatsLogos/temperature.svg";
import wind from "../Assets/QuickStatsLogos/wind.svg";

function StatItem(props: { title: string; value: string; icon: any }) {
  return (
    <Center w={"full"}>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontWeight={"semibold"} fontSize={"sm"} mb={2}>
          {props.title}
        </Text>
        <Flex direction="row" alignItems={"center"} justifyContent={"center"}>
          <Image src={props.icon} h={"35px"} pr={2} />
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {props.value}
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}

export function QuickStats() {
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
      <StatItem title={"Avg. Temperature (C)"} value={"24.78"} icon={temperature} />
      <StatItem title={"Avg. Humidity (%)"} value={"24.78"} icon={humidity} />
      <StatItem title={"Avg. Wind Speed (m/s)"} value={"24.78"} icon={wind} />
      <StatItem title={"Avg. Soil Moisture (hPa)"} value={"24.78"} icon={pressure} /> // TODO: change soil moisture icon
    </Stack>
  );
}
