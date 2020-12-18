import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import Tooltip from "../Tooltip"

const MapTooltip = (props) => {
  const hovered = useMapStore((state) => state.hovered)
  const text = hovered && `Click for ${hovered.properties.name} facility data`
  return <Tooltip>{text}</Tooltip>
}

MapTooltip.propTypes = {}

export default MapTooltip
