import React from "react"
import Dot from "./Dot"

const DotMarker = ({ radius, className, ...props }) => {
  return (
    <svg
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      width={radius * 2}
      height={radius * 2}
      className={className}
    >
      <Dot radius={radius} cx={radius} cy={radius} {...props} />
    </svg>
  )
}

DotMarker.propTypes = {}

export default DotMarker
