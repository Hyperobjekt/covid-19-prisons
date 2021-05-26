import React from "react"
import { useOptionsStore } from "../../common/hooks"

/**
 * Gradient definitions for map
 */
const SpikeGradients = ({ topOpacity = 0.9, bottomOpacity = 0 }) => {
  const colors = useOptionsStore((state) => state.categoryColors)
  return (
    <defs>
      {colors.map((c, i) => (
        <linearGradient
          key={"g" + i}
          id={"g" + (i + 1)}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: c, stopOpacity: topOpacity }} />
          <stop
            offset="100%"
            style={{ stopColor: c, stopOpacity: bottomOpacity }}
          />
        </linearGradient>
      ))}
    </defs>
  )
}

export default SpikeGradients
