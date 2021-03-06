import React from "react"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import { METRICS, GROUPS } from "../../common/constants"
import GenericSelection from "./GenericSelection"

const MetricSelection = ({ classes, className, group, ...props }) => {
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )
  // get available metrics, or default to first group
  const metrics = group ? METRICS[group] : METRICS[GROUPS[0]]

  return (
    <GenericSelection
      options={metrics}
      selectedOption={metric}
      handleSelect={setMetric}
    />
  )
}

export default MetricSelection
