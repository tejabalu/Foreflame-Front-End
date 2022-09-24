import * as React from "react";
import { useContext, useEffect } from "react";
import {
  Box,
  Checkbox,
  ColorModeScript,
  Flex,
  HStack,
  IconButton,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { HiFastForward, HiPause, HiPlay, HiRewind } from "react-icons/hi";
import { PlayContext } from "./MapboxComponent";
import { bottom } from "@popperjs/core";

function formatTime(time: string | number | Date) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function PlayerControls(props: { able: boolean; setSelectedTime: any; startTime: any; endTime: any }) {
  const { isPlay, setIsPlay } = useContext(PlayContext);
  const IconButtonStyles = {
    color: "white",
    variant: "none",
    isDisabled: props.able,
    fontSize: "1.5em",
  };

  return (
    <Flex direction={"row"}>
      <Tooltip bg={"gray.100"} color={"gray.800"} placement={bottom} label={"Go to start"}>
        <IconButton
          {...IconButtonStyles}
          onClick={() => {
            props.setSelectedTime(props.startTime);
          }}
          aria-label={"Rewind"}
          icon={<HiRewind />}
        />
      </Tooltip>
      <Tooltip bg={"gray.100"} color={"gray.800"} placement={bottom} label={"Play/Pause"}>
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
      </Tooltip>
      <Tooltip bg={"gray.100"} color={"gray.800"} placement={bottom} label={"Go to end"}>
        <IconButton
          {...IconButtonStyles}
          onClick={() => {
            props.setSelectedTime(props.endTime);
          }}
          aria-label={"Play"}
          icon={<HiFastForward />}
        />
      </Tooltip>
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
  console.log(selectedDay); // TODO: Remove in prod

  useEffect(() => {
    console.log("interval exec");
    const interval = setInterval(() => {
      if (selectedTime >= endTime) {
        if (setIsPlay) {
          setIsPlay(false);
        }
        setSelectedTime(endTime);
      }
      if (isPlay) {
        setSelectedTime(startTime + (selectedDay + 1) * day);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isPlay, selectedDay, selectedTime, setSelectedTime, startTime]);

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
          <PlayerControls able={allDays} setSelectedTime={setSelectedTime} startTime={startTime} endTime={endTime} />
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
