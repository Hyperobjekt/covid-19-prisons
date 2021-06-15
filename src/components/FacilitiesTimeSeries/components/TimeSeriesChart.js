import React from "react";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import useOptionsStore from "../../../common/hooks/use-options-store";
import useStatesStore from "../../states/useStatesStore";
import { formatFacilityName } from "../../../common/utils/formatters";

import {
  AnimatedAxis, // any of these can be non- equivalents
  Grid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";
import useTimeSeriesStore from "../useTimeSeriesStore";
import shallow from "zustand/shallow";

const accessors = {
  xAccessor: (d) => new Date(`${d.date}T00:00:00`),
  yAccessor: (d) => Number(d.value),
};

const TimeSeriesChart = () => {
  const facilitiesData = useTimeSeriesData();
  const metric = useOptionsStore((state) => state.metric);
  const group = useStatesStore((state) => state.facilitiesGroup);
  const { selectedFacilities } = useTimeSeriesStore((state) => state, shallow);

  let dataLoading = false;
  const linesData = selectedFacilities.reduce((accum, facility) => {
    const facilityData = facilitiesData[facility.id];
    if (!facilityData) {
      console.log("Facility not yet loaded: ", name);
      dataLoading = true;
      return accum;
    }

    const accessor = group + "_" + metric;
    const lineData = facilityData[accessor];

    const name = formatFacilityName(facility);
    accum.push({ name, lineData });
    return accum;
  }, []);

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
      {linesData.map(({ name, lineData }) => (
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
            {metric}:{accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
};

export default TimeSeriesChart;
