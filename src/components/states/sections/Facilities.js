import React from "react"
import { GROUPS } from "../../../common/constants"
import FacilitiesTable from "../FacilitiesTable"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"
import { withStyles } from "@material-ui/core"
import { useActiveMetric, useFacilitiesData } from "../../../common/hooks"
import StepWrapper from "./../StepWrapper"
import Notes from "../../Notes"
import { getLang } from "../../../common/utils/i18n"

const styles = (theme) => ({
  notes: {
    listStyle: "none",
    margin: theme.spacing(2, "auto"),
    maxWidth: "24rem",
    "& li": {
      maxWidth: "24rem",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "none",
      "& li + li": {
        marginTop: 0,
      },
    },
  },
})

const Facilities = ({ id, lang, data, classes, isFederal, ...props }) => {
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

  const notes = getLang("state_table_notes")

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
        <Notes notes={notes} className={classes.notes} />
      </StepWrapper>
    </div>
  )
}

Facilities.propTypes = {}

export default withStyles(styles)(Facilities)
