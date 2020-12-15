import React from "react"
import clsx from "clsx"
import { Marker } from "react-simple-maps"
import { Spike, Dot } from "../../markers"
import useStatesStore from "../../states/useStatesStore"
import shallow from "zustand/shallow"

import { withStyles } from "@material-ui/core"
import { extent } from "d3-array"
import { getScalerFunction, getValue, getColorFunction } from "../selectors"

export const styles = {
  highlight: {
    strokeWidth: 2.3,
    fillOpacity: 1,
  },
  text: {
    textAnchor: "middle",
  },
  spike: {},
}

// TODO: make dots more configurable
const MarkerLayer = ({
  markers,
  type = "spikes",
  size: sizeValue = 10,
  sizeExtent: overrideSizeExtent,
  color: colorValue = "#666",
  highlightColor: highlightColorValue = "#",
  label: labelValue = false,
  stroke: strokeValue = "#666",
  highlight: highlightValue = false,
  width: widthValue = 7,
  widthExtent: overrideWidthExtent,
  groups,
  classes,
  className,
  sizeSelector,
  groupSelector,
  widthSelector,
  setTooltipContent,
  children,
  ...props
}) => {
  // console.log("MarkerLayer, ", markers)
  // spike length calculation
  const sizeExtent = overrideSizeExtent || extent(markers, sizeSelector)
  const getMarkerSize = getScalerFunction(sizeValue, sizeExtent, sizeSelector)
  const getCircleOpacity = getScalerFunction(
    [0, 0.1, 1],
    [0, 1, sizeExtent[1]],
    sizeSelector
  )

  const [hoveredMarker, setHoveredMarker, hoveredFacility] = useStatesStore(
    (state) => [
      state.hoveredMarker,
      state.setHoveredMarker,
      state.hoveredFacility,
    ],
    shallow
  )

  // spike width calculation
  const widthExtent = overrideWidthExtent || extent(markers, widthSelector)
  const getSpikeWidth = getScalerFunction(
    widthValue,
    widthExtent,
    widthSelector
  )

  // create fill color function (or value)
  const getColor = getColorFunction(colorValue, groups, groupSelector)

  // create stroke function (or value)
  const getStroke = getColorFunction(strokeValue, groups, groupSelector)

  const isHighlight = (marker) => {
    // console.log("isHighlight")
    // console.log(marker)
    if (!hoveredMarker && !hoveredFacility) return
    if (!!hoveredMarker) {
      return marker.id === hoveredMarker.id
    }
    if (!!hoveredFacility) {
      return marker.id === hoveredFacility.id
    }
    return false
  }

  return (
    <g className={clsx("spike-layer", classes.root, className)} {...props}>
      {!!sizeExtent[1] && // fixes #67 - if max size is 0, don't plot spikes
        markers.map((marker, i) => {
          const size = getValue(getMarkerSize, marker)
          if (size <= 0) {
            // fixes #53 - avoid negative spikes
            return null
          }
          const width = getValue(getSpikeWidth, marker)
          const highlight = isHighlight(marker)
          const color = !!highlight
            ? getValue(getStroke, marker)
            : getValue(getColor, marker)
          const stroke = getValue(getStroke, marker)
          const label = getValue(labelValue, marker)
          const name = marker.name
          const coords = marker.coords
          return (
            <Marker
              key={marker.id}
              coordinates={coords}
              className={clsx(classes.marker)}
              onMouseEnter={() => {
                setHoveredMarker(marker)
              }}
              onMouseLeave={() => {
                setHoveredMarker(null)
              }}
            >
              {type === "dots" && (
                <Dot
                  radius={size}
                  stroke={stroke}
                  fill={color}
                  fillOpacity={getValue(getCircleOpacity, marker)}
                />
              )}
              {type === "spikes" && (
                <Spike
                  fill={color}
                  stroke={stroke}
                  length={size}
                  width={width}
                  className={clsx(classes.spike, {
                    [classes.highlight]: highlight,
                  })}
                />
              )}
              {label && <text className={classes.text}>{label}</text>}
            </Marker>
          )
        })}
      {children}
    </g>
  )
}

MarkerLayer.propTypes = {}

export default withStyles(styles)(MarkerLayer)
