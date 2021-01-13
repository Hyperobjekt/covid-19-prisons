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
    display: "block",
    fontSize: theme.typography.pxToRem(14),
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
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
        ]
      : ["active", "confirmed", "deaths"]
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
      <span className={clsx(classes.state)}>{hoveredMarker.state}</span>
      <table className={clsx(classes.stats)}>
        <tbody>{stats}</tbody>
      </table>
    </Tooltip>
  )
}

FacilitiesMapTooltip.propTypes = {}

// export default FacilitiesMapTooltip

export default withStyles(styles)(FacilitiesMapTooltip)
