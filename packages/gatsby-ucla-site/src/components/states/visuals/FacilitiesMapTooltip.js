// import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React, { useEffect } from "react"
import ReactTooltip from "react-tooltip"
import useStatesStore from "../useStatesStore"
import { useOptionsStore } from "../../../common/hooks"

const FacilitiesMapTooltip = (props) => {
  // const hovered = useMapStore((state) => state.hovered)
  const metric = useOptionsStore((state) => state.metric)
  const hoveredMarker = useStatesStore((state) => state.hoveredMarker)
  useEffect(() => {
    console.log(`Metric changed to ${metric}.`)
  }, [metric])
  useEffect(() => {
    console.log(`Marker changed, `, hoveredMarker)
  }, [hoveredMarker])

  const text = hoveredMarker && `${hoveredMarker.name}`
  return <ReactTooltip>{text}</ReactTooltip>
}

FacilitiesMapTooltip.propTypes = {}

export default FacilitiesMapTooltip
