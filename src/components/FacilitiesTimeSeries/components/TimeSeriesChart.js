import React from "react";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";
import {
  formatFacilityName,
  formatMetricValue,
  getFacilityColor,
} from "../../../common/utils/formatters";
import moment from "moment";
import {
  Axis,
  Grid,
  LineSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
} from "@visx/xychart";
import useTimeSeriesStore from "../useTimeSeriesStore";
import shallow from "zustand/shallow";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import { sansSerifyTypography } from "../../../gatsby-theme-hypercore/theme";
import TimeSeriesAnnotations from "./TimeSeriesAnnotations";
import { getStateCodeByName } from "../../../common/utils/selectors";
import { getLang } from "../../../common/utils/i18n";
import TimeSeriesLines from "./TimeSeriesLines";

const accessors = {
  xAccessor: (d) => new Date(`${d.date}T00:00:00`),
  yAccessor: (d) => Number(d.value),
};

const useStyles = makeStyles((theme) => ({
  root: {
    ...sansSerifyTypography,
  },
  lineInactive: {
    opacity: 0.2,
  },
  lineActive: {
    opacity: 1,
  },
  line: {
    opacity: 1,
  },
}));

const TimeSeriesChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const facilitiesData = useTimeSeriesData();

  const [activeLine, setActiveLine] = React.useState(null);

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

  const linesData =
    facilitiesData.length > 0
      ? facilitiesData.map((facilityData) => {
          const lineData = facilityData[accessor];
          const { id } = facilityData;
          const name = formatFacilityName(facilityData);
          const lastDatum = lineData.reduceRight((accum, datum) => {
            if (accum) return accum;
            if (!!datum.value && datum.value !== "NaN") return datum;
          }, null);
          return { name, id, lineData, lastDatum };
        })
      : [
          {
            id: null,
            lineData: [0],
          },
        ];

  const maxAnnotationWidth = isMobile ? 19 : 34;
  const facilitiesById = {};
  facilitiesData.forEach(({ id, ...facilityData }, i) => {
    facilitiesById[id] = facilityData;
    facilitiesById[id].color = getFacilityColor(i);
    const labelArr = [
      facilityData.name,
      facilityData.state === "*other"
        ? ""
        : ", " + getStateCodeByName(facilityData.state),
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

  const colors = Object.keys(facilitiesById)
    .filter((k) => facilitiesById[k][accessor].length > 0)
    .map((k) => Number(k))
    .sort((a, b) => a - b)
    .map((id) => facilitiesById[id].color);

  const customTheme = buildChartTheme({
    colors,
    xAxisLineStyles: { stroke: theme.palette.text.secondary },
    xTickLineStyles: { stroke: theme.palette.text.secondary },
  });

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

  const handlePointerMove = (props) => {
    if (props.key && activeLine !== props.key) {
      setActiveLine(props.key);
    }
  };

  const handlePointerOut = () => {
    setActiveLine(null);
  };

  return (
    <XYChart
      height={400}
      margin={{ top: 55, right: isMobile ? 120 : 195, bottom: 75, left: 25 }}
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
      theme={customTheme}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <Axis
        tickFormat={formatDate}
        orientation="bottom"
        label="Date"
        top={350}
        strokeWidth={2}
        labelOffset={25}
        numTicks={isMobile ? 5 : 10}
        labelProps={{
          style: {
            fontSize: "14px",
            fontWeight: 300,
            color: theme.palette.text.secondary,
            fill: theme.palette.text.secondary,
          },
        }}
        tickLabelProps={() => ({
          style: {
            fontSize: "14px",
            fontWeight: 300,
            color: theme.palette.text.secondary,
            fill: theme.palette.text.secondary,
          },
        })}
      />
      <Axis
        orientation="left"
        numTicks={6}
        labelOffset={5}
        hideAxisLine
        hideTicks
        label={getLang(selectedMetric)}
        labelProps={{
          style: {
            fontSize: "14px",
            fontWeight: 300,
            color: theme.palette.text.secondary,
            fill: theme.palette.text.secondary,
          },
        }}
        tickLabelProps={() => ({
          dx: 10,
          dy: -5,
          textAnchor: "start",
          verticalAnchor: "end",
          style: {
            fontSize: "14px",
            fontWeight: 300,
            color: theme.palette.text.secondary,
            fill: theme.palette.text.secondary,
          },
        })}
      />
      <Grid columns={false} numTicks={5} stroke="#E0E0E0" />
      <TimeSeriesLines linesData={linesData} />
      <TimeSeriesAnnotations
        linesData={linesData}
        facilitiesById={facilitiesById}
      />
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
        renderTooltip={({ tooltipData, colorScale }) =>
          facilitiesById[tooltipData.nearestDatum.key] && (
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
                  {moment(
                    accessors
                      .xAccessor(tooltipData.nearestDatum.datum)
                      .toDateString()
                  ).format("MMM D, YYYY")}
                </span>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <span style={{ fontWeight: 700, marginRight: "10px" }}>
                  {formatMetricValue(
                    accessors.yAccessor(tooltipData.nearestDatum.datum),
                    selectedMetric
                  )}
                </span>
                <span style={{ fontWeight: 100 }}>
                  {getLang(selectedMetric)}
                </span>
              </div>
            </div>
          )
        }
      />
    </XYChart>
  );
};

export default TimeSeriesChart;
