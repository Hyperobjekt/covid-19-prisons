import { scaleLinear, scaleOrdinal } from "d3-scale"

/**
 * Returns a size value, or a sizer function if a range array is provided
 * @param {string|Array} range
 * @param {*} extent
 * @param {*} selector
 */
export const getScalerFunction = (range, extent, selector) => {
  if (typeof range === "number") return range
  if (range.length < 2)
    throw new Error(
      "SpikeMap size props must be number or array containing min / max (e.g. [0, 16])"
    )
  if (!selector)
    throw new Error("SpikeMap dynamic sizing requires a selector function")
  const scale = scaleLinear().domain(extent).range(range)
  return (data) => scale(selector(data))
}

/**
 * Returns a color value, or a color function if an array of values is passed
 * @param {string|Array} values
 * @param {*} groups
 * @param {*} selector
 */
export const getColorFunction = (values, groups, selector) => {
  if (typeof values === "string") return values
  const scale = scaleOrdinal(values).domain(groups)
  return (spike) => scale(selector(spike))
}

/**
 * Helper function to handle "function" and "other" value types
 * @param {*} value
 * @param {*} context
 * @param {*} defaultValue
 */
export const getValue = (value, context, defaultValue) => {
  if (typeof value === "function") return value(context)
  if (typeof value === "undefined" || value === null) return defaultValue
  return value
}
