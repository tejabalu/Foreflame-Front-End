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
  IconButton,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { HiFastForward, HiPause, HiPlay, HiRewind } from "react-icons/hi";
import { useContext } from "react";
import { PlayContext } from "./MapboxComponent";
import useInterval from "./Helpers/useInterval";

function formatTime(time: string | number | Date) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function PlayerControls(props: { able: boolean }) {
  const { isPlay, setIsPlay } = useContext(PlayContext);
  const IconButtonStyles = {
    color: "white",
    variant: "none",
    isDisabled: props.able,
    fontSize: "1.5em",
  };

  return (
    <Flex direction={"row"}>
      <IconButton {...IconButtonStyles} p={-4} aria-label={"Rewind"} icon={<HiRewind />} />
      <IconButton
        {...IconButtonStyles}
        aria-label={"Pause"}
        onClick={() => {
          if (setIsPlay) {
            setIsPlay(!isPlay);
          }
        }}
        icon={isPlay ? <HiPause /> : <HiPlay />}
      />
      <IconButton {...IconButtonStyles} aria-label={"Play"} icon={<HiFastForward />} />
    </Flex>
  );
}

function ControlPanel(props: {
  startTime: number;
  endTime: number;
  selectedTime: number;
  setSelectedTime: React.Dispatch<React.SetStateAction<number>>;
  allDays: boolean;
  setIsAllDays: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { startTime, endTime, allDays, setSelectedTime, selectedTime, setIsAllDays } = props;

  // console.log(startTimeFormat.toTimeString());
  const day = 24 * 60 * 60 * 1000;
  const totalDays = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);
  const { isPlay, setIsPlay } = useContext(PlayContext);
  console.log(selectedDay); // TODO: Placed for testing, remove in prod

  useInterval(() => {
    if (selectedTime > endTime) {
      if (setIsPlay) {
        setIsPlay(false);
      }
    }
    if (isPlay) {
      setSelectedTime(startTime + (selectedDay + 1) * day);
    }
  }, 100);

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
        <HStack>
          <Checkbox
            color={"white"}
            colorScheme={"orange"}
            onChange={(e) => {
              setIsAllDays(e.target.checked);
            }}>
            Display All Days
          </Checkbox>
          <PlayerControls able={allDays} />
        </HStack>
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
          setSelectedTime(startTime + e * day);
          if (setIsPlay) {
            setIsPlay(false);
          }
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
            // value={startTimeFormat1} // TODO: format start and end times for date inputs
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

export default React.memo(ControlPanel);
