import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../MapGradients"
import FacilitiesMarkerLayer from "../MarkerLayer/FacilitiesMarkerLayer"
import { useShapeStyles } from "../styles"
import { groups } from "d3-array"

const NationalMap = memo(
  ({ children, facilities, metric, group, onSelect, ...props }) => {
    const shapeClasses = useShapeStyles()

    return (
      <SvgMap {...props}>
        <MapGradients />
        <StateLayer
          classes={{
            shape: shapeClasses.shape,
            label: shapeClasses.shapeLabel,
          }}
          onSelect={onSelect}
          showLabels
          interactive
        />
        <HoverShape className={shapeClasses.shapeHighlight} />
        <FacilitiesMarkerLayer
          facilities={facilities}
          metric={metric}
          group={group}
          style={{ pointerEvents: "none" }}
        />
        {children}
      </SvgMap>
    )
  }
)

NationalMap.defaultProps = {
}

export default NationalMap
