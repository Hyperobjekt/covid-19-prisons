import STATE_CENTERS from "../data/us_state_centers"
import { scaleLinear, scaleOrdinal } from "d3-scale"
import { extent } from "d3-array"

export const getUniqueValues = (nodes, selector) => {
  return nodes
    .map(selector)
    .reduce(
      (vals, curr) => (vals.indexOf(curr) > -1 ? vals : [...vals, curr]),
      []
    )
}

// selector for spike length
export const getDataMetricSelector = (metric) => {
  return (d) => d.residents[metric]
}

// selector for spike color
export const typeSelector = (d) => d.jurisdiction

// selectory for spike width
export const widthSelector = (d) => d.residents.population

/**
 * Gets a comparator function for the given data selector
 */
const getComparator = (dataSelector) => (a, b) => {
  const aVal = dataSelector(a)
  const bVal = dataSelector(b)
  if (!isNumber(aVal)) return -1
  if (!isNumber(bVal)) return 1
  if (aVal < bVal) return -1
  if (aVal > bVal) return 1
  return 0
}

/**
 * Gets the top values in the data set using a given data selector function
 * @param {*} data
 * @param {*} dataSelector
 * @param {*} top
 */
export const getTopValues = (data, dataSelector, top = 5) => {
  if (!data) return []
  const compare = getComparator(dataSelector)
  return data.sort(compare).reverse().slice(0, top)
}

/**
 * Returns a 2 letter state code, given the state name
 * @param {*} stateName
 */
export const getStateCodeByName = (stateName) => {
  const toLower = (v) => v.toLowerCase()
  return Object.keys(STATE_CENTERS).find(
    (key) =>
      toLower(STATE_CENTERS[key].State) === toLower(stateName) ||
      toLower(STATE_CENTERS[key].StateCode) === toLower(stateName)
  )
}

/**
 * Returns the state center data, given a state name or state code
 * @param {*} stateId
 */
export const getStateCenter = (stateId) => {
  const code = getStateCodeByName(stateId)
  if (code) return STATE_CENTERS[code]
  throw new Error(`State not found for provided code: ${code}`)
}

export const isNumber = (val) => {
  return Boolean(val) && !isNaN(val)
}

export const getOpacityScaler = (range, extent, selector) => {
  if (!selector) throw new Error("requires a selector function")
  const scale = scaleLinear().domain(extent).range(range)
  return (data) => scale(selector(data))
}

/**
 * Returns a size value, or a sizer function if a range array is provided
 * @param {string|Array} range
 * @param {*} extent
 * @param {*} selector
 */
export const getSizeScaler = (range, extent, selector) => {
  if (typeof range === "number") return range
  if (range.length !== 2)
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
export const getColorScaler = (values, groups, selector) => {
  if (typeof values === "string") return values
  const scale = scaleOrdinal(values).domain(groups)
  return (spike) => scale(selector(spike))
}
