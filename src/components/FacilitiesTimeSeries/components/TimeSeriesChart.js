import React from "react";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import { formatFacilityName } from "../../../common/utils/formatters";

import {
  AnimatedAxis,
  Grid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";
import useTimeSeriesStore from "../useTimeSeriesStore";
import shallow from "zustand/shallow";

const colors = [
  "#D7790F",
  "#82CAA4",
  "#4C6788",
  "#84816F",
  "#71A9C9",
  "#AE91A8",
  "#DED6DC",
  "#B4C551",
  "#7E55D4",
  "#A21916",
  "#BC73AE",
  "#567EBA",
  "#FFD540",
  "#CF5833",
];

const accessors = {
  xAccessor: (d) => new Date(`${d.date}T00:00:00`),
  yAccessor: (d) => Number(d.value),
};

const TimeSeriesChart = () => {
  const facilitiesData = useTimeSeriesData();

  const [selectedFacilities, selectedGroup, selectedMetric] =
    useTimeSeriesStore(
      (state) => [
        state.selectedFacilities,
        state.selectedGroup,
        state.selectedMetric,
      ],
      shallow
    );

  const accessor = selectedGroup + "_" + selectedMetric;

  const linesData = facilitiesData.map((facilityData) => {
    const lineData = facilityData[accessor];
    const { id } = facilitiesData
    const name = formatFacilityName(facilityData);
    
    return ({ name, id, lineData });
  });

  const dataLoading = selectedFacilities.some(({ id }) => {
    return !linesData.find(lineData => lineData.id === id)
  });
  
  console.log("loading:", dataLoading);
  console.log("#::", linesData);
  return (
    <XYChart height={400} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis
        orientation="left"
        numTicks={4}
        // tickLabelProps={() => ({ dx: -10 })}
      />
      {/* <Grid
      // columns={true}
      // numTicks={4}
      /> */}
      {linesData.map(({ name, lineData }, i) => (
        <AnimatedLineSeries
          key={name}
          dataKey={name}
          data={lineData}
          stroke={colors[i % colors.length]}
          {...accessors}
        />
      ))}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum).toDateString()}
            <br />
            {selectedMetric}:
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
};

export default TimeSeriesChart;
