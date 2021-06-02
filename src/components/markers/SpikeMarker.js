import React from "react"
import { MapGradients } from "../maps"
import Spike from "./Spike"

const SpikeMarker = ({ width, height, className, ...props }) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
    >
      <MapGradients />
      <Spike
        length={height}
        width={width}
        transform={`translate(${width / 2} ${height})`}
        {...props}
      />
    </svg>
  )
}

SpikeMarker.propTypes = {}

export default SpikeMarker
