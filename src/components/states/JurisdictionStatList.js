import React from "react"
import clsx from "clsx"

import { ButtonBase, Tooltip, Typography, withStyles } from "@material-ui/core"
import { getLang } from "../../common/utils/i18n"
import { SUMMABLE_JURISDICTIONS, METRICS } from "../../common/constants"
import Stack from "../Stack"
import NumberStat from "../stats/NumberStat"
import { formatMetricValue } from "../../common/utils/formatters"
import { sansSerifyTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import { AnchorLink } from "gatsby-plugin-anchor-links"

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
    "&.first": {
      marginTop: 0,
    },
  },
  jurisdictionLabel: {
    width: "5em",
    marginBottom: -3,
    marginRight: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  tableHeader: {
    width: "10em",
    color: theme.palette.text.secondary,
    margin: 0,
    padding: theme.spacing(0, 1, 0, 0),
  },
  stat: {
    width: "10em",
    marginTop: "auto",
    marginBottom: "auto",
  },
  scoreColumn: {
    flexBasis: "3em",
    flexGrow: 0,
    marginLeft: 0,
    "&$stat a": {
      display: "flex",
      fontWeight: 700,
      ...sansSerifyTypography,
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.text.primary,
      "&:visited": {
        color: theme.palette.text.primary,
      },
      textDecoration: "underline",
      "&:hover": {
        textDecorationColor: theme.palette.secondary.main,
      },
    },
  },
  tooltip: {
    color: "#fff",
    fontSize: theme.typography.pxToRem(12),
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
  stateScore,
  fedScore,
  iceScore,
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
  const jurisdictions = isFederal ? ["federal"] : SUMMABLE_JURISDICTIONS

  const getScorecardLink = (jurisdiction) => {
    const [score, to, name] = {
      state: [stateScore, "#scorecard", "state"],
      immigration: [iceScore, "/ice#scorecard", "ICE"],
      federal: isFederal
        ? [stateScore, "#scorecard", "BOP"]
        : [fedScore, "/federal#scorecard", "BOP"],
    }[jurisdiction]

    const title = (
      <Typography variant="body2" className={classes.tooltip}>
        View {name} scorecard
      </Typography>
    )
    return (
      <Tooltip title={title} enterTouchDelay={1}>
        <ButtonBase>
          <AnchorLink to={to}>{score}</AnchorLink>
        </ButtonBase>
      </Tooltip>
    )
  }

  const scoreExists = stateScore || iceScore || fedScore

  return (
    <Stack className={clsx(classes.root, className)} spacing={2}>
      <Stack
        className={classes.tableHeaders}
        horizontal
        align="flex-start"
        spacing={2}
      >
        <Typography className={classes.jurisdictionLabel}> </Typography>
        <Typography className={classes.tableHeader} variant="body2">
          {getLang(baseMetric, "label")}
        </Typography>
        {groupHasRates(group) && (
          <Typography className={classes.tableHeader} variant="body2">
            {getLang(baseMetric, "rate")}
          </Typography>
        )}
        {scoreExists && (
          <Typography
            className={clsx(classes.tableHeader, classes.scoreColumn)}
            variant="body2"
          >
            {getLang("data_score")}
          </Typography>
        )}
      </Stack>

      {jurisdictions.map((jurisdiction, idx) => (
        <Stack
          key={jurisdiction}
          className={clsx(classes.jurisdictionContainer, { first: !idx })}
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
          ></NumberStat>
          {groupHasRates(group) && (
            <NumberStat
              className={classes.stat}
              value={getGroupData(jurisdiction, baseMetric, true)}
              secondary={!isRateSelected}
              format={(n) => formatMetricValue(n, getKey(baseMetric, "rate"))} // d3Format expects decimal
            ></NumberStat>
          )}
          {scoreExists && (
            <Typography
              className={clsx(classes.stat, classes.scoreColumn)}
              type="body1"
            >
              {getScorecardLink(jurisdiction)}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  )
}

JurisdictionStatList.propTypes = {}

export default withStyles(styles)(JurisdictionStatList)
