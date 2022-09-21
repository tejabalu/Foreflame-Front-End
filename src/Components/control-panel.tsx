import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";

function formatTime(time: string | number | Date) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function ControlPanel(props: {
  // TODO: assign proper types for TS
  startTime: any;
  endTime: any;
  onChangeTime: any;
  allDays: any;
  onChangeAllDays: any;
  selectedTime: any;
}) {
  const {
    startTime,
    endTime,
    onChangeTime,
    allDays,
    onChangeAllDays,
    selectedTime,
  } = props;
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);

  const onSelectDay = (evt: { target: { value: any } }) => {
    // TODO: assign proper types for TS
    const daysToAdd = evt.target.value;
    // add selected days to start time to calculate new time
    const newTime = startTime + daysToAdd * day;
    onChangeTime(newTime);
  };

  return (
    <Box>
      <Heading size={"md"}>Map Showing Earthquakes</Heading>
      <p>
        Map showing earthquakes
        <br />
        from <b>{formatTime(startTime)}</b> to <b>{formatTime(endTime)}</b>.
      </p>
      <hr />
      <div className="input">
        <label>All Days</label>
        <input
          type="checkbox"
          name="allday"
          checked={allDays}
          onChange={(evt) => onChangeAllDays(evt.target.checked)}
        />
      </div>
      <div className={`input ${allDays ? "disabled" : ""}`}>
        <label>Each Day: {formatTime(selectedTime)}</label>
        <input
          type="range"
          disabled={allDays}
          min={1}
          max={days}
          value={selectedDay}
          step={1}
          onChange={onSelectDay}
        />
      </div>
      <hr />
      <p>
        Data source:{" "}
        <a href="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
          earthquakes.geojson
        </a>
      </p>
    </Box>
  );
}

export default React.memo(ControlPanel);
