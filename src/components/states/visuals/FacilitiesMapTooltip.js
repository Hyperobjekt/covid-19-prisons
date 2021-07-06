import React from "react";
import useStatesStore from "../useStatesStore";
import { getLang } from "../../../common/utils/i18n";
import clsx from "clsx";
import { Box, withStyles } from "@material-ui/core";
import Tooltip from "../../Tooltip";
import { formatMetricValue } from "../../../common/utils/formatters";

const styles = (theme) => ({
  header: {
    width: "100%",
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // dotted line with 4px spacing between dots
    backgroundImage: `linear-gradient(to right, white 25%, rgba(255,255,255,0) 0%)`,
    backgroundPosition: `bottom`,
    backgroundSize: `4px 1px`,
    backgroundRepeat: `repeat-x`,
  },
  title: {
    fontWeight: 700,
    fontSize: "16px", // fixed size on tooltips
    display: "block",
    marginBottom: theme.spacing(0.25),
  },
  state: {
    fontSize: "14px",
  },
  group: {
    paddingLeft: theme.spacing(1),
    textTransform: "lowercase",
  },
  stats: {
    paddingTop: 0,
    fontSize: "14px",
    "& th:first-child": {
      textAlign: "right",
      paddingRight: theme.spacing(1),
    },
    "& th, & td": {
      padding: 0,
      margin: 0,
      paddingBottom: 2,
    },
    // no bottom padding on final row
    "& tr:last-child > *": {
      paddingBottom: 0,
    },
    "& .selected": {
      color: theme.palette.secondary.main,
    },
  },
});

const FacilitySummary = withStyles(styles)(
  ({ facility, group, metric: activeMetric, isImmigration, classes }) => {
    const metrics =
      group === "residents"
        ? [
            "active",
            "active_rate",
            "confirmed",
            "confirmed_rate",
            "deaths",
            "deaths_rate",
            "tested",
            "tested_rate",
          ]
        : ["active", "confirmed", "deaths", "tested"];

    return (
      <>
        <Box className={clsx("ucla-tooltip__header", classes.header)}>
          <span className={clsx("ucla-tooltip__title", classes.title)}>
            {facility.name}
          </span>
          <Box display="flex">
            <span>{facility.state}</span>
            {group && (
              <span className={classes.group}>
                ({getLang(group, isImmigration && "immigration")})
              </span>
            )}
          </Box>
        </Box>
        <table className={classes.stats}>
          <tbody>
            {metrics.map((m) => {
              const statName = getLang(m);
              const rawValue = facility[group][m];
              const statValue = !rawValue
                ? getLang("unavailable")
                : formatMetricValue(rawValue, m);
              return (
                <tr className={m === activeMetric && "selected"} key={m}>
                  <th>{statValue}</th>
                  <td>{statName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
);

const FacilitiesMapTooltip = (props) => {
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker);
  return (
    <Tooltip>
      {hoveredMarker && <FacilitySummary facility={hoveredMarker} {...props} />}
    </Tooltip>
  );
};

FacilitiesMapTooltip.propTypes = {};

// export default FacilitiesMapTooltip

export default withStyles(styles)(FacilitiesMapTooltip);
