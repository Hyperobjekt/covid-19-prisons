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
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { sansSerifyTypography } from "../../../gatsby-theme-hypercore/theme";

const accessors = {
  xAccessor: (d) => new Date(`${d.date}T00:00:00`),
  yAccessor: (d) => Number(d.value),
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...sansSerifyTypography,
  },
}));

const TimeSeriesChart = () => {
  const classes = useStyles();
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
    const { id } = facilityData;
    const name = formatFacilityName(facilityData);
    const lastDatum = lineData.reduceRight((accum, datum) => {
      if (accum) return accum;
      if (!!datum.value) return datum;
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

  const maxAnnotationWidth = 19;
  const facilitiesById = {};
  selectedFacilities.forEach(({ id, ...facilityData }) => {
    facilitiesById[id] = facilityData;
    const labelArr = [
      facilityData.name,
      facilityData.state === "*other" ? "" : ", " + facilityData.state,
    ];
    facilitiesById[id].truncatedLabel =
      labelArr.join("").length > maxAnnotationWidth
        ? labelArr[0]
            .slice(0, maxAnnotationWidth - labelArr[1].length - 3)
            .trim() +
          "..." +
          labelArr[1]
        : labelArr.join("");
  });

  return (
    <XYChart
      height={400}
      margin={{ top: 55, right: 150, bottom: 55, left: 55 }}
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
      {linesData.map(({ id, lineData }, i) => (
        <LineSeries key={id} dataKey={id} data={lineData} {...accessors} />
      ))}
      {linesData.map(
        ({ id, lastDatum }, i) =>
          lastDatum && (
            <Annotation dataKey={id} datum={lastDatum} dx={0} dy={0} key={i}>
              <AnnotationLabel
                title={facilitiesById[id].truncatedLabel}
                showAnchorLine={false}
                backgroundFill="#F9FCF8"
                horizontalAnchor="start"
                verticalAnchor="middle"
                width={150}
                key={0}
              />
              <AnnotationLabel
                title={"⬤"}
                titleProps={{ color: getFacilityColor(i) }}
                showAnchorLine={false}
                backgroundFill="#F9FCF8"
                fontColor={getFacilityColor(i)}
                horizontalAnchor="middle"
                verticalAnchor="middle"
                key={1}
              />
            </Annotation>
          )
      )}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showDatumGlyph
        applyPositionStyle
        style={{
          backgroundColor: "rgba(32, 32, 32, 0.9)",
          color: "white",
          borderRadius: "4px",
          padding: "16px 20px",
        }}
        renderTooltip={({ tooltipData, colorScale }) => (
          <div className={clsx(classes.root)}>
            <span style={{ fontWeight: 700 }}>
              {facilitiesById[tooltipData.nearestDatum.key].name}
            </span>
            <div
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,white,white 1px,transparent 0,transparent 4px)",
                backgroundPosition: "0 100%",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                padding: "5px 0 10px",
              }}
            >
              {facilitiesById[tooltipData.nearestDatum.key].state &&
                facilitiesById[tooltipData.nearestDatum.key].state !==
                  "*other" && (
                  <span
                    style={{
                      borderRight: "1px solid rgba(255, 255, 255, 0.7)",
                      paddingRight: "10px",
                      marginRight: "10px",
                      fontWeight: 100,
                    }}
                  >
                    {facilitiesById[tooltipData.nearestDatum.key].state}
                  </span>
                )}
              <span style={{ fontWeight: 100 }}>
                {accessors
                  .xAccessor(tooltipData.nearestDatum.datum)
                  .toDateString()}
              </span>
            </div>
            <div style={{ paddingTop: "5px" }}>
              <span style={{ fontWeight: 700, marginRight: "10px" }}>
                {accessors.yAccessor(tooltipData.nearestDatum.datum)}
              </span>
              <span style={{ fontWeight: 100 }}>{selectedMetric}</span>
            </div>
          </div>
        )}
      />
    </XYChart>
  );
};

export default TimeSeriesChart;
