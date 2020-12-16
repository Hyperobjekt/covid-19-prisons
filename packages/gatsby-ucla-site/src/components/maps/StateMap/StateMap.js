import React from "react"
import { GeoJsonLayer } from "@hyperobjekt/svg-maps"
import { ComposableMap, ZoomableGroup } from "react-simple-maps"
import { getStateCenter, getStateCodeByName } from "../../../common/utils"
import { useShapeStyles } from "../styles"

const filterZoomEvent = () => false

const StateMap = ({ stateName, children, ...props }) => {
  const classes = useShapeStyles()
  const state_code = getStateCodeByName(stateName)
  const stateCode = state_code.toUpperCase()
  const state = getStateCenter(stateCode)
  const counties = require(`./topojson/${stateCode}.json`)
  return (
    <ComposableMap
      projection={"geoMercator"}
      data-tip=""
      projectionConfig={{
        rotate: state.rotate ? state.rotate : null,
        scale: state.scale ? state.scale : 4000,
      }}
      {...props}
    >
      <ZoomableGroup
        center={[state.Longitude, state.Latitude]}
        minZoom={1}
        maxZoom={1}
        filterZoomEvent={filterZoomEvent}
      >
        <GeoJsonLayer
          source={counties}
          shapeProps={{
            classes: {
              shape: classes.shape,
            },
          }}
        />
        {children}
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default StateMap
