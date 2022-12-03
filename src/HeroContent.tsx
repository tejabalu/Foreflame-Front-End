import { Flex, Text } from "@chakra-ui/react";

const HeroContent = () => {
  return (
    <Flex direction="column" w={"600px"} backgroundColor="rgba(255,255,255,0.8)" p={4} rounded="md" color="darkgreen">
      <Text fontWeight={"bold"} fontSize={"4xl"}>
        Enabling data-driven decision making for managing wildfires
      </Text>{" "}
      <Text fontWeight={"bold"} fontSize={"2xl"} mb={8}>
        across Washington State.
      </Text>
      <Text fontWeight={"bold"}>
        ForeFlame is a tool for Wildfire Mitigation Organizations that helps make information-backed preventive and mitigative tactical decisions.
      </Text>
    </Flex>
  );
};

export default HeroContent;
