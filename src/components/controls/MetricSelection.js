import React from "react"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import { METRICS, GROUPS } from "../../common/constants"
import GenericSelection from "./GenericSelection"

const MetricSelection = ({
  classes,
  className,
  group,
  isImmigration,
  ...props
}) => {
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )
  // use immigration metrics. otherwise get available metrics, or default to first group
  const metrics = isImmigration
    ? METRICS.immigration
    : group
    ? METRICS[group]
    : METRICS[GROUPS[0]]

  return (
    <GenericSelection
      options={metrics}
      selectedOption={metric}
      handleSelect={setMetric}
    />
  )
}

export default MetricSelection
