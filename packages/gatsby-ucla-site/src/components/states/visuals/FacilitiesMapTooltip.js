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
  // const hovered = useMapStore((state) => state.hovered)
  // const metric = useOptionsStore((state) => state.metric)
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker)
  useEffect(() => {
    console.log(`Metric changed to ${metric}.`)
  }, [metric])
  useEffect(() => {
    console.log(`group changed to ${group}.`)
  }, [group])
  useEffect(() => {
    console.log(`Marker changed, `, hoveredMarker)
  }, [hoveredMarker])

  const getLabel = () => {
    const text = hoveredMarker && `${hoveredMarker.name}`
    return text
  }

  const getStat = () => {
    const text =
      hoveredMarker &&
      `${getLang(metric)}: ${
        !hoveredMarker[group][metric]
          ? getLang("unavailable")
          : Math.round((hoveredMarker[group][metric] + Number.EPSILON) * 100) /
              100 +
            (metric.indexOf("rate") > -1 ? "%" : "")
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
