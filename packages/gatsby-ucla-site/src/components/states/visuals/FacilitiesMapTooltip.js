// import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import useStatesStore from "../useStatesStore"
import { getLang } from "../../../common/utils/i18n"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import Tooltip from "../../Tooltip"
import { formatMetricValue } from "../../../common/utils/formatters"

const styles = (theme) => ({
  institution: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
    display: "block",
  },
  state: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    fontSize: theme.typography.pxToRem(14),
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
  },
  group: {
    paddingLeft: theme.spacing(1),
    textTransform: "lowercase",
  },
  stats: {
    fontSize: theme.typography.pxToRem(14),
    "& th": {
      textAlign: "right",
      paddingRight: theme.spacing(1),
    },
    "& .selected": {
      color: theme.palette.secondary.main,
    },
  },
})

const FacilitiesMapTooltip = ({
  classes,
  group,
  metric: activeMetric,
  ...props
}) => {
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker)
  if (!hoveredMarker) {
    return null
  }

  const stats = []
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
      : ["active", "confirmed", "deaths", "tested"]
  metrics.forEach((m) => {
    const statName = getLang(m)
    const rawValue = hoveredMarker[group][m]
    const statValue = !rawValue
      ? getLang("unavailable")
      : formatMetricValue(rawValue, m)

    const className = m === activeMetric ? "selected" : ""
    stats.push(
      <tr className={className} key={m}>
        <th>{statValue}</th>
        <td>{statName}</td>
      </tr>
    )
  })
  
  return (
    <Tooltip>
      <span className={clsx("intitution-name", classes.institution)}>
        {hoveredMarker.name}
      </span>
      <span className={classes.state}>
        <span>{hoveredMarker.state}</span>
        {group && <span className={classes.group}>({getLang(group)})</span>}
      </span>
      <table className={classes.stats}>
        <tbody>{stats}</tbody>
      </table>
    </Tooltip>
  )
}

FacilitiesMapTooltip.propTypes = {}

// export default FacilitiesMapTooltip

export default withStyles(styles)(FacilitiesMapTooltip)
