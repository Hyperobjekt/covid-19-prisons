// import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import useStatesStore from "../useStatesStore"
import { getLang } from "../../../common/utils/i18n"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import Tooltip from "../../Tooltip"

const styles = (theme) => ({
  institution: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(14),
    display: "block",
  },
  state: {
    width: "100%",
    display: "block",
    paddingBottom: theme.spacing(1),
    borderBottom: "dotted white 1px",
    marginBottom: theme.spacing(1),
  },
  stats: {
    "& th": {
      textAlign: "right",
      paddingRight: theme.spacing(1),
    },
    "& .selected": {
      color: theme.palette.secondary.main
    },
  },
})

const FacilitiesMapTooltip = ({ classes, group, metric: activeMetric, ...props }) => {
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker)
  if (!hoveredMarker) {
    return null
  }

  const getRounded = (num, metric) => {
    let r = ""
    const v = Math.round((num + Number.EPSILON))
    if (metric.indexOf("rate") > -1) {
      // numbers in the .5-1 range show as <1%
      if (num < 1) {
        r = "<1%"
      } else {
        r = v.toLocaleString() + "%"
      }
    } else {
      r = v.toLocaleString()
    }
    return r
  }


  const stats = []
  const metrics = group === "residents" ?
    ["active", "active_rate", "confirmed", "confirmed_rate", "deaths", "deaths_rate"] :
    ["active", "confirmed", "deaths"] 
  metrics.forEach(m => {
    const statName = getLang(m)
    const statValue = !hoveredMarker[group][m]
      ? getLang("unavailable")
      : getRounded(hoveredMarker[group][m], m)
    
    const className = m === activeMetric ? "selected" : ""
    stats.push(
      <tr className={className}>
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
      <span className={clsx(classes.state)}>
        {hoveredMarker.state}
      </span>
      <table className={clsx(classes.stats)}>
        <tbody>
          {stats}
        </tbody>
      </table>
    </Tooltip>
  )
}

FacilitiesMapTooltip.propTypes = {}

// export default FacilitiesMapTooltip

export default withStyles(styles)(FacilitiesMapTooltip)
