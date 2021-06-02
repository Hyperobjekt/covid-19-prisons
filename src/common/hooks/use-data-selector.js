import { useCallback } from "react"
import { getDataMetricSelector } from "../utils"
import useActiveMetric from "./use-active-metric"

export default function useDataSelector() {
  const metric = useActiveMetric()
  return useCallback(getDataMetricSelector(metric), [metric])
}
