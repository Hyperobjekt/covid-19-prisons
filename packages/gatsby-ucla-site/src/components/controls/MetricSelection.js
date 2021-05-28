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
  handleSelection,
  forceSelectedOption = null,
  ...props
}) => {
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )
  // use immigration metrics. otherwise get available metrics, or default to first group
  let options = isImmigration
    ? METRICS.immigration
    : group
    ? METRICS[group]
    : METRICS[GROUPS[0]]

  let selectedOption = metric

  if (forceSelectedOption) {
    console.log("HIT")
    selectedOption = forceSelectedOption
    if (!options.includes(forceSelectedOption)) {
      options = [...options, forceSelectedOption]
    }
  }

  const handleSelect = (metric) => {
    setMetric(metric)
    if (handleSelection) {
      handleSelection(metric)
    }
  }

  return (
    <GenericSelection
      options={options}
      selectedOption={selectedOption}
      handleSelect={handleSelect}
    />
  )
}

export default MetricSelection
