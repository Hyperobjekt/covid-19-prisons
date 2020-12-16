import React from "react"
import clsx from "clsx"

import { Typography, withStyles } from "@material-ui/core"
import { getLang } from "../../common/utils/i18n"
import { JURISDICTIONS, METRICS } from "../../common/constants"
import Stack from "../Stack"
import NumberStat from "../stats/NumberStat"
import { formatMetricValue } from "../../common/utils/formatters"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  groupTitle: {},
  metricContainer: {},
  metricTitle: {
    marginTop: "1em",
  },
  jurisdictionContainer: {
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.divider,
    paddingBottom: theme.spacing(2),
  },
  jurisdictionLabel: {
    width: "5em",
    marginBottom: -3,
    marginRight: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  stat: {
    width: "10em",
  },
})

const getKey = (...args) => args.join("_")

const groupHasRates = (group) => {
  const result = METRICS[group].reduce(
    (hasRates, metric) => (hasRates ? true : metric.indexOf("_rate") > -1),
    false
  )
  return result
}

const JurisdictionStatList = ({
  classes,
  className,
  metric,
  group,
  groupData,
  isFederal,
}) => {
  const baseMetric = metric.split("_")[0]
  const getGroupData = (jurisdiction, metric, isRate) => {
    const key = isRate
      ? getKey(jurisdiction, metric, "rate")
      : getKey(jurisdiction, metric)
    if (!groupData[key] || !groupData[key].length > 0) return null
    // key 0 has count, key 1 has avg
    return isRate ? groupData[key][1] : groupData[key][0]
  }

  const isRateSelected = metric.split("_").pop() === "rate"
  const jurisdictions = isFederal ? ["federal"] : JURISDICTIONS

  return (
    <Stack className={clsx(classes.root, className)} spacing={2}>
      {jurisdictions.map((jurisdiction) => (
        <Stack
          key={jurisdiction}
          className={classes.jurisdictionContainer}
          horizontal
          align="flex-start"
          spacing={2}
        >
          <Typography className={classes.jurisdictionLabel} variant="body2">
            {getLang(jurisdiction)}
          </Typography>
          <NumberStat
            className={classes.stat}
            value={getGroupData(jurisdiction, baseMetric)}
            secondary={isRateSelected}
            label={getLang(baseMetric, "label")}
          ></NumberStat>
          {groupHasRates(group) && (
            <NumberStat
              className={classes.stat}
              value={getGroupData(jurisdiction, baseMetric, true)}
              label={getLang(baseMetric, "rate")}
              secondary={!isRateSelected}
              format={(n) => formatMetricValue(n, getKey(baseMetric, "rate"))} // d3Format expects decimal
            ></NumberStat>
          )}
        </Stack>
      ))}
    </Stack>
  )
}

JurisdictionStatList.propTypes = {}

export default withStyles(styles)(JurisdictionStatList)
