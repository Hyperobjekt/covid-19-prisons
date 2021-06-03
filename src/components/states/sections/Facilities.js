import React from "react"
import { GROUPS } from "../../../common/constants"
import FacilitiesTable from "../FacilitiesTable"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"
import { useActiveMetric, useFacilitiesData } from "../../../common/hooks"
import StepWrapper from "./../StepWrapper"

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

  const [sortCol, setSortCol] = React.useState(facilitiesGroup)
  const [sortedByGroup, setSortedByGroup] = React.useState(true)

  // get facilities for current state
  const facilities = isFederal
    ? all.filter((f) => f.jurisdiction === "federal")
    : all.filter((f) => f.state === stateName)

  // handler for when table headers are clicked
  const handleFacilitiesGroupChange = React.useCallback(
    (col) => {
      const group = col.split(".")[0]
      const isGroup = group && GROUPS.indexOf(group) > -1
      setSortedByGroup(isGroup)

      if (isGroup) {
        setSortCol(group)
        console.log(group, facilitiesGroup)
        group !== facilitiesGroup && setFacilitiesGroup(group)
      } else {
        setSortCol(col)
      }
    },
    [facilitiesGroup, setFacilitiesGroup]
  )
  return (
    <div {...props}>
      <StepWrapper>
        <MetricSelectionTitle title={lang.title} />
        <FacilitiesTable
          metric={metric}
          group={facilitiesGroup}
          sortCol={sortCol}
          sortedByGroup={sortedByGroup}
          data={facilities}
          onSort={handleFacilitiesGroupChange}
          isFederal={isFederal}
        />
      </StepWrapper>
    </div>
  )
}

Facilities.propTypes = {}

export default Facilities
