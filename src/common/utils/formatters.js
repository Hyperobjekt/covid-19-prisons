import { METRIC_FORMATTERS } from "../constants"

export const formatMetricValue = (value, metric) => {
  const format = METRIC_FORMATTERS[metric] || ((d) => d)
  if (typeof value !== "number" || !Number.isFinite(value)) {
    // fixes #55
    return "N/A"
  } else if (metric.includes("_rate") && (value < .01) && (value > 0)) {
    return "<1%"
  } else if (metric === "rate_legend" && (value < .01) && (value > 0)) {
    return METRIC_FORMATTERS.rate_legend_small(value)
  } else if (metric.includes("_rate") && (value > 1)) {
    return ">100%"
  }
  return format(value)
}

export const formatFacilityName = ({ name, state }) => {
  const appendState = !name.includes(state) && state !== "*other";
  return !appendState ? name : `${name}, ${state}`;
};