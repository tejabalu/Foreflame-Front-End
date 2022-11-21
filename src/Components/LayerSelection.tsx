import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoHelpCircleSharp } from "react-icons/io5";

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

function LayerPopOver() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button backgroundColor={"transparent"} colorScheme={"green"} variant={"ghost"}>
          <IoHelpCircleSharp color="white" fontSize={"1.3em"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent backgroundColor={"gray.100"}>
        <PopoverBody>Checking the items in this list enables the corresponding layers to be displayed in the map interface.</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export function LayerSelection(props: { setMapTheme: React.Dispatch<React.SetStateAction<string>> }) {
  const StreetMap = "mapbox://styles/tejabalu/cl8ga8wd1001q15nrvf7iyhob";
  const SatelliteStreetMap = "mapbox://styles/mapbox/satellite-streets-v12";
  const LightMap = "mapbox://styles/mapbox/light-v11";
  const DarkMap = "mapbox://styles/mapbox/dark-v11";
  const SatelliteMap = "mapbox://styles/mapbox/satellite-v9";
  const TerrainMap = "mapbox://styles/tejabalu/clardo3bu000415tc46tvzwxy";

  return (
    <Box borderRadius={"lg"} bg={"graygreen"} flex={1} p={2}>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Text size={"sm"} px={2} pt={2} color={"white"}>
          Layer Selection
        </Text>
        <LayerPopOver />
      </Flex>

      <Accordion defaultIndex={[0, 0, 0]} allowMultiple p={2}>
        <AccordionItem border={"none"} defaultChecked={true}>
          <ToggleButton text="Map Themes" />
          <AccordionPanel pb={4}>
            <Select
              placeholder="Select option"
              color={"white"}
              onChange={(e) => {
                props.setMapTheme(e.target.value);
                console.log(e.target.value);
              }}>
              <option value={StreetMap}>Streets</option>
              <option value={SatelliteStreetMap}>Satellite Streets</option>
              <option value={TerrainMap}>Terrain</option>
              <option value={SatelliteMap}>Satellite</option>
              <option value={DarkMap}>Dark</option>
            </Select>
          </AccordionPanel>
        </AccordionItem>

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
