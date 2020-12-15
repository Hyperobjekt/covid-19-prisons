import React, { useState } from "react"
import Stack from "../../Stack"
import { GROUPS } from "../../../common/constants"
import FacilitiesTable from "../FacilitiesTable"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"
import { useActiveMetric, useFacilitiesData } from "../../../common/hooks"

const Facilities = ({ id, lang, data, isFederal, ...props }) => {
  const all = useFacilitiesData()

  // currently selected metric
  const metric = useActiveMetric()

  // pull facilities group from the state page store
  const [facilitiesGroup, setFacilitiesGroup, stateName] = useStatesStore(
    (state) => [
      state.facilitiesGroup,
      state.setFacilitiesGroup,
      state.stateName,
    ],
    shallow
  )

  // get facilities for current state
  const facilities = isFederal
    ? all.filter((f) => f.jurisdiction === "federal")
    : all.filter((f) => f.state === stateName)

  // handler for when table headers are clicked
  const handleFacilitiesGroupChange = React.useCallback(
    (newGroup) => {
      const group = newGroup.split(".")[0]
      console.log(group)
      // exit if invalid
      if (!group || GROUPS.indexOf(group) === -1) return
      group && group !== facilitiesGroup && setFacilitiesGroup(group)
    },
    [facilitiesGroup, setFacilitiesGroup]
  )
  return (
    <Stack {...props}>
      <MetricSelectionTitle title={lang.title} />
      <FacilitiesTable
        metric={metric}
        group={facilitiesGroup}
        data={facilities}
        onSort={handleFacilitiesGroupChange}
        isFederal={isFederal}
      />
    </Stack>
  )
}

Facilities.propTypes = {}

export default Facilities
