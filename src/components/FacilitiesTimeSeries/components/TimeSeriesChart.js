import React from "react";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import {
  formatFacilityName,
  getFacilityColor,
} from "../../../common/utils/formatters";

import {
  AnimatedAxis,
  Grid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
} from "@visx/xychart";
import useTimeSeriesStore from "../useTimeSeriesStore";
import shallow from "zustand/shallow";

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
    const { id } = facilitiesData;
    const name = formatFacilityName(facilityData);

    return { name, id, lineData };
  });

  const colors = linesData.map((l, i) => getFacilityColor(i));
  const customTheme = buildChartTheme({ colors });

  const dataLoading = selectedFacilities.some(({ id }) => {
    return !linesData.find((lineData) => lineData.id === id);
  });

  console.log("loading:", dataLoading);
  return (
    <XYChart
      height={400}
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
      theme={customTheme}
    >
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
