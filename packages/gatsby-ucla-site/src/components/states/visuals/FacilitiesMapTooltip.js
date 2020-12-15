// import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React, { useEffect } from "react"
import ReactTooltip from "react-tooltip"
import useStatesStore from "../useStatesStore"
import { useOptionsStore } from "../../../common/hooks"
import { getLang } from "../../../common/utils/i18n"
import clsx from "clsx"
import { Typography, withStyles } from "@material-ui/core"

const styles = (theme) => ({
  shared: {
    display: "block",
    width: "100%",
  },
  label: {},
  stat: {},
})

const FacilitiesMapTooltip = ({ classes, group, metric, ...props }) => {
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker)

  const getLabel = () => {
    const text = hoveredMarker && `${hoveredMarker.name}`
    return text
  }

  const getRounded = (num, metric) => {
    let r = ""
    const v = Math.round((num + Number.EPSILON) * 100) / 100
    if (metric.indexOf("rate") > -1) {
      if (v < 0.01) {
        r = "< 0.0.%"
      } else {
        r = v.toLocaleString() + "%"
      }
    } else {
      r = v.toLocaleString()
    }
    return r
  }

  const getStat = () => {
    const text =
      hoveredMarker &&
      `${getLang(metric)}: ${
        !hoveredMarker[group][metric]
          ? getLang("unavailable")
          : getRounded(hoveredMarker[group][metric], metric)
      }`
    return text
  }

  return (
    <ReactTooltip>
      {!!hoveredMarker && (
        <>
          <span className={clsx("intitution-name", classes.shared)}>
            {getLabel()}
          </span>
          <span className={clsx("intitution-name", classes.shared)}>
            {getStat()}
          </span>
        </>
      )}
    </ReactTooltip>
  )
}

FacilitiesMapTooltip.propTypes = {}

// export default FacilitiesMapTooltip

export default withStyles(styles)(FacilitiesMapTooltip)
