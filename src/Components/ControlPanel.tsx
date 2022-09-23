import * as React from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Checkbox,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Input,
  ColorModeScript,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

function formatTime(time: string | number | Date) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function ControlPanel(props: {
  startTime: number;
  endTime: number;
  allDays: boolean;
  onChangeTime: React.Dispatch<React.SetStateAction<number>>;
  selectedTime: number;
  onChangeAllDays: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { startTime, endTime, allDays, onChangeTime, selectedTime, onChangeAllDays } = props;

  // console.log(startTimeFormat.toTimeString());
  const day = 24 * 60 * 60 * 1000;
  const totalDays = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);
  console.log(totalDays);

  return (
    <Box bg={"green"} p={4}>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <HStack>
          <Text fontSize={"md"} color={"white"}>
            Current
          </Text>
          <Text fontSize={"md"} color={"white"} fontWeight={"semibold"}>
            {formatTime(selectedTime)}
          </Text>
        </HStack>
        <Checkbox
          color={"white"}
          colorScheme={"orange"}
          onChange={(e) => {
            onChangeAllDays(e.target.checked);
          }}>
          Display All Days
        </Checkbox>
        {/*{formatTime(startTime)} to {formatTime(endTime)}*/}
      </Flex>

      <Slider
        my={2}
        defaultValue={10}
        min={1}
        max={30}
        step={1}
        value={selectedDay}
        isDisabled={allDays}
        onChange={(e) => {
          onChangeTime(startTime + e * day);
        }}>
        <SliderTrack bg="white">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="orange" />
        </SliderTrack>
        <SliderThumb boxSize={4} />
      </Slider>
      <Flex direction={"row"} justifyContent={"space-around"} mb={4}>
        <Flex direction={"row"} w={"25em"} alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={"md"} color={"white"} mr={2}>
            Start Time
          </Text>
          <Input
            color={"white"}
            w={56}
            placeholder=""
            size="md"
            type="datetime-local"
            // value={startTimeFormat1}
            css={css`
              ::-webkit-calendar-picker-indicator {
                background: url(https://cdn-icons-png.flaticon.com/128/3176/3176395.png) center/90% no-repeat;
                color: white;
              }
            `}
          />
        </Flex>
        <Flex direction={"row"} w={"25em"} alignItems={"center"} justifyContent={"center"}>
          <Text color={"white"} mr={2}>
            End Time
          </Text>
          <ColorModeScript initialColorMode={"light"} />
          <Input
            color={"white"}
            w={56}
            colorScheme={"whiteAlpha"}
            placeholder=""
            size="md"
            type="datetime-local"
            css={css`
              ::-webkit-calendar-picker-indicator {
                background: url(https://cdn-icons-png.flaticon.com/128/3176/3176395.png) center/90% no-repeat;
                color: white;
              }
            `}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default ControlPanel;
