import useMapStore from "@hyperobjekt/svg-maps/lib/hooks/useMapStore"
import React from "react"
import Tooltip from "../Tooltip"

const MapTooltip = ({isImmigration}) => {
  const hovered = useMapStore((state) => state.hovered)
  const text = isImmigration ? 
    hovered && `${hovered.properties.name} field office region` :
    hovered && `Click for ${hovered.properties.name} facility data`
  return <Tooltip>{text}</Tooltip>
}

MapTooltip.propTypes = {}

export default MapTooltip
