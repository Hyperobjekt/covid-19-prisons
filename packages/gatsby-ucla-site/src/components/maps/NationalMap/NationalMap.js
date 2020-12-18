import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../MapGradients"
import FacilitiesMarkerLayer from "../MarkerLayer/FacilitiesMarkerLayer"
import { useShapeStyles } from "../styles"
import { geoAlbersUsaTerritories } from "geo-albers-usa-territories"
import { getLang } from "../../../common/utils/i18n"

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 300])

const NationalMap = memo(
  ({ children, facilities, metric, group, onSelect, ...props }) => {
    const shapeClasses = useShapeStyles()
    return (
      <SvgMap projection={projection} {...props}>
        <desc>{getLang("nat_map_title")}</desc>
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

NationalMap.defaultProps = {}

export default NationalMap
