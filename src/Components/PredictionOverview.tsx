import { HStack, Text, Flex, Center, VStack } from "@chakra-ui/react";
import { TbTemperature } from "react-icons/tb";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";

function PredictionStat({
  date,
  probability,
  temperature,
  wind,
  humidity,
}: {
  date: string;
  probability: number;
  temperature: number;
  wind: number;
  humidity: number;
}) {
  let color: string;
  if (probability < 50) {
    color = "white";
  } else if (probability < 80) {
    color = "yellow";
  } else {
    color = "orange";
  }

  return (
    <Center flexDirection={"column"} bg={"graygreen"} borderRadius={"lg"} p={2}>
      <Text fontSize={"sm"} mb={1}>
        {date}
      </Text>
      <Flex direction={"row"} alignItems={"center"}>
        <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} mr={4} color={color}>
          <Text fontSize={"3xl"}>{probability}%</Text>
          <Text fontSize={"sm"}>Wildfire</Text>
          <Text fontSize={"sm"}>Possibility</Text>
        </Flex>
        <Flex direction={"column"} pt={2}>
          <HStack>
            <TbTemperature />
            <Text>{temperature} °F</Text>
          </HStack>
          <HStack>
            <RiWindyLine />
            <Text>{wind} (m/s)</Text>
          </HStack>
          <HStack>
            <WiHumidity />
            <Text>{humidity}%</Text>
          </HStack>
        </Flex>
      </Flex>
    </Center>
  );
}

export function PredictionOverview() {
  //TODO set states for temp, humid, wind, prob
  return (
    <Flex
      flex={1}
      direction={"column"}
      bg={"green"}
      color={"white"}
      p={4}
      borderRadius={"lg"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Text mb={4}>5 day Prediction Overview</Text>
      <VStack>
        <PredictionStat date={"Today"} probability={17} temperature={95} wind={1.44} humidity={23.8} />
        <PredictionStat date={"Wednesday 10"} probability={53} temperature={99} wind={1.32} humidity={24.9} />
        <PredictionStat date={"Thursday 11"} probability={81} temperature={105} wind={1.62} humidity={20.1} />
      </VStack>
    </Flex>
  );
}
