import { METRIC_FORMATTERS } from "../constants"

export const formatMetricValue = (value, metric) => {
  const format = METRIC_FORMATTERS[metric] || ((d) => d)
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "N/A"
  }
  return format(value)
}
