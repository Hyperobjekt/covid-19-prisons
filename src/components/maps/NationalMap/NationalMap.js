import React, { memo } from "react"
import { SvgMap, HoverShape, StateLayer } from "@hyperobjekt/svg-maps"
import MapGradients from "../MapGradients"
import FacilitiesMarkerLayer from "../MarkerLayer/FacilitiesMarkerLayer"
import { useShapeStyles } from "../styles"
import { geoAlbersUsaTerritories } from "geo-albers-usa-territories"
import { getLang } from "../../../common/utils/i18n"

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 300])

const NationalMap = memo(
  ({
    children,
    facilities,
    metric,
    group,
    onSelect,
    isImmigration,
    ...props
  }) => {
    const shapeClasses = useShapeStyles()

    const style = isImmigration ? {}
      : { pointerEvents: "none" }
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
          showLabels={!isImmigration}
          interactive
          />
        {!isImmigration && (
          <HoverShape className={shapeClasses.shapeHighlight} />
        )}
        {children}
        <FacilitiesMarkerLayer
          facilities={facilities}
          metric={metric}
          group={group}
          style={style}
        />
      </SvgMap>
    )
  }
)

NationalMap.defaultProps = {}

export default NationalMap
