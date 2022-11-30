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
import * as React from "react";
import { useContext, useEffect } from "react";
import { HiFastForward, HiPause, HiPlay, HiRewind } from "react-icons/hi";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { PlayContext } from "./MapboxComponent";

function formatTime(time: string | number | Date) {
  if (typeof time === "number") {
    const date = new Date(time);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}

function PlayerControls(props: { able: boolean; setSelectedTime: any; startTime: any; endTime: any; selectedTime: any }) {
  const { isPlay, setIsPlay } = useContext(PlayContext);
  const IconButtonStyles = {
    color: "white",
    variant: "none",
    isDisabled: props.able,
    fontSize: "1.5em",
  };

  const ToolTipStyles = {
    bg: "gray.100",
    color: "gray.800",
    openDelay: 1000,
  };

  return (
    <Flex direction={"row"}>
      <Tooltip {...ToolTipStyles} label={"Go to start"}>
        <IconButton
          {...IconButtonStyles}
          onClick={() => {
            props.setSelectedTime(props.startTime);
          }}
          aria-label={"Rewind"}
          icon={<HiRewind />}
        />
      </Tooltip>
      <Tooltip {...ToolTipStyles} label={"One Step Back"}>
        <IconButton
          {...IconButtonStyles}
          aria-label={"Skip back"}
          onClick={() => {
            props.setSelectedTime(props.selectedTime - 24 * 60 * 60 * 1000);
          }}
          icon={<IoPlaySkipBack />}
        />
      </Tooltip>
      <Tooltip {...ToolTipStyles} label={"Play/Pause"}>
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
      <Tooltip {...ToolTipStyles} label={"One Step Forward"}>
        <IconButton
          {...IconButtonStyles}
          onClick={() => {
            props.setSelectedTime(props.selectedTime + 24 * 60 * 60 * 1000);
          }}
          aria-label={"Play"}
          icon={<IoPlaySkipForward />}
        />
      </Tooltip>
      <Tooltip {...ToolTipStyles} label={"Go to end"}>
        <IconButton
          {...IconButtonStyles}
          onClick={() => {
            props.setSelectedTime();
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

  const day = 24 * 60 * 60 * 1000;
  const totalDays = Math.ceil((endTime - startTime) / day);
  console.log(totalDays, "total days");
  const selectedDay = Math.round((selectedTime - startTime) / day);
  const { isPlay, setIsPlay } = useContext(PlayContext);

  useEffect(() => {
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
          <PlayerControls able={allDays} setSelectedTime={setSelectedTime} startTime={startTime} endTime={endTime} selectedTime={selectedTime} />
        </HStack>
        {/*{formatTime(startTime)} to {formatTime(endTime)}*/}
      </Flex>

      <Slider
        my={2}
        defaultValue={1}
        min={0}
        max={totalDays}
        step={1}
        value={selectedDay}
        isDisabled={allDays}
        onChange={(e) => {
          console.log(selectedTime);
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

export default ControlPanel;
