import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Text,
  VStack,
} from "@chakra-ui/react";

function ToggleButton({ text }: { text: string }) {
  return (
    <AccordionButton bg={"gray.100"} borderRadius={"lg"} my={2} _hover={{ bg: "gray.200" }}>
      <Text flex="1" textAlign="left" fontWeight={"semibold"} color={"darkgreen"}>
        {text}
      </Text>
      <AccordionIcon />
    </AccordionButton>
  );
}

export function LayerSelection() {
  return (
    <Box mt={2} borderRadius={"lg"} bg={"graygreen"} flex={1} p={2}>
      <Text size={"sm"} px={2} pt={2} color={"white"}>
        Layer Selection
      </Text>
      <Accordion allowMultiple p={2}>
        <AccordionItem border={"none"} defaultChecked={true}>
          <ToggleButton text="Vegetation" />
          <AccordionPanel pb={4}>
            <VStack alignItems={"flex-start"}>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Canopy cover
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Ground cover
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Tree Height
              </Checkbox>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={"none"}>
          <ToggleButton text={"Fuel Density"} />
          <AccordionPanel pb={4}>
            <VStack alignItems={"flex-start"}>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Grass and Grass Dominated
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Shrub Fields
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Timber Litter
              </Checkbox>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={"none"}>
          <ToggleButton text={"Weather Conditions"} />
          <AccordionPanel pb={4}>
            <VStack alignItems={"flex-start"}>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Wind
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Temperature
              </Checkbox>
              <Checkbox color={"white"} colorScheme={"whiteAlpha"}>
                Humidity
              </Checkbox>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
