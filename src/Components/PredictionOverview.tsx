import { Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { RiWindyLine } from "react-icons/ri";
import { TbTemperature } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

function PredictionStat(props: { date: string; probability: number; temperature: number; wind: number; humidity: number }) {
  const { date, probability, temperature, wind, humidity } = props;
  let color: string;
  if (probability < 50) {
    color = "white";
  } else if (probability < 80) {
    color = "yellow";
  } else {
    color = "#ff1e00";
  }

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
          color={color}
          fontWeight={probability > 80 ? "semibold" : "md"}>
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
  let probability = () => {
    return Math.floor(Math.random() * 100);
  };
  return (
    <Flex
      flex={1}
      direction={"column"}
      bg={"green"}
      color={"white"}
      p={4}
      borderRadius={"lg"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflow={"auto"}>
      <Text mb={4}>5 day High Risk Areas</Text>
      <VStack>
        <PredictionStat date={"Today"} probability={probability()} temperature={95} wind={1.44} humidity={23.8} />
        <PredictionStat date={"Wednesday 10"} probability={probability()} temperature={99} wind={1.32} humidity={24.9} />
        <PredictionStat date={"Thursday 11"} probability={probability()} temperature={105} wind={1.62} humidity={20.1} />
        <PredictionStat date={"Thursday 11"} probability={probability()} temperature={105} wind={1.62} humidity={20.1} />
        <PredictionStat date={"Thursday 11"} probability={probability()} temperature={105} wind={1.62} humidity={20.1} />
      </VStack>
    </Flex>
  );
}
