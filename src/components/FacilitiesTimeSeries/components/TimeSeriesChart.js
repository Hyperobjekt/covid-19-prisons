import React from "react";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import {
  formatFacilityName,
  getFacilityColor,
} from "../../../common/utils/formatters";
import moment from "moment";
import {
  Axis,
  Grid,
  LineSeries,
  XYChart,
  Tooltip,
  Annotation,
  AnnotationLabel,
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
    const lastDatum = lineData.reduceRight((accum, datum) => {
      if (accum) return accum;;
      if (!!datum.value) return datum;;
    }, null);
    return { name, id, lineData, lastDatum };
  });

  const colors = linesData.map((l, i) => getFacilityColor(i));
  const customTheme = buildChartTheme({ colors });

  const dataLoading = selectedFacilities.some(({ id }) => {
    return !linesData.find((lineData) => lineData.id === id);
  });

  const formatDate = (date, i, allTicks) => {
    const justMonth = "MMM";
    const monthAndYear = "MMM 'YY";

    const d = moment(date);
    // first date
    if (!i) {
      const lastD = moment(allTicks[allTicks.length - 1].value);
      // show year only if the data doesn't span multiple
      const format = d.year() !== lastD.year() ? justMonth : monthAndYear;
      return d.format(format);
    } else {
      const previousD = moment(allTicks[i - 1].value);
      // show year only if this tick is in the next year
      const format = d.year() === previousD.year() ? justMonth : monthAndYear;
      return d.format(format);
    }
  };

  console.log("loading:", dataLoading);
  return (
    <XYChart
      height={400}
      margin={{ top: 20, right: 150, bottom: 20, left: 0 }}
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
      theme={customTheme}
    >
      <Axis tickFormat={formatDate} orientation="bottom" />
      <Axis
        orientation="left"
        numTicks={4}
        // tickLabelProps={() => ({ dx: -10 })}
      />
      <Grid columns={false} numTicks={4} />
      {linesData.map(({ name, lineData }, i) => (
        <LineSeries key={name} dataKey={name} data={lineData} {...accessors} />
      ))}
      {linesData.map(
        ({ name, lastDatum }, i) =>
          lastDatum && (
            <Annotation dataKey={name} datum={lastDatum} dx={0} dy={0}>
              <AnnotationLabel
                title={name}
                showAnchorLine={false}
                backgroundFill="rgba(0,150,150,0)"
                horizontalAnchor="start"
                verticalAnchor="middle"
                width={150}
              />
            </Annotation>
          )
      )}
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
