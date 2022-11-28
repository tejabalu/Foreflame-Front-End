import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ComponentTitle } from "../ComponentTitle";

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

export function LayerSelection(props: { setMapTheme: React.Dispatch<React.SetStateAction<string>> }) {
  const StreetMap = "mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob";
  const SatelliteStreetMap = "mapbox://styles/mapbox/satellite-streets-v12";
  const LightMap = "mapbox://styles/mapbox/light-v11";
  const DarkMap = "mapbox://styles/mapbox/navigation-night-v1";
  const SatelliteMap = "mapbox://styles/mapbox/satellite-v9";
  const TerrainMap = "mapbox://styles/tejabalu/clardo3bu000415tc46tvzwxy";

  const heading = "Layer Selection";
  const popOverContent = "Checking the items in this list enables the corresponding layers to be displayed in the map interface.";

  return (
    <Flex direction={"column"} p={2} bg={"green"} w={"100%"} rounded={"xl"} mb={1}>
      <Box borderRadius={"lg"} bg={"graygreen"} flex={1} p={2}>
        {ComponentTitle({ heading, popOverContent })}

        <Accordion allowMultiple>
          <AccordionItem border={"none"}>
            <ToggleButton text="Map Themes" />
            <AccordionPanel pb={4}>
              <RadioGroup
                defaultValue={StreetMap}
                color="white"
                onChange={(e) => {
                  if (e) {
                    props.setMapTheme(e);
                  }
                }}>
                <Stack direction="column">
                  <Radio value={StreetMap}>Streets</Radio>
                  <Radio value={SatelliteStreetMap}>Satellite Streets</Radio>
                  <Radio value={TerrainMap}>Terrain</Radio>
                  <Radio value={DarkMap}>Dark</Radio>
                </Stack>
              </RadioGroup>
            </AccordionPanel>
          </AccordionItem>

          {/* <AccordionItem border={"none"} defaultChecked={true}>
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
          </AccordionItem> */}
        </Accordion>
      </Box>
    </Flex>
  );
}
