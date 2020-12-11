import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import JurisdictionStatList from "../JurisdictionStatList"
import Stack from "../../Stack"
import { getDataByJurisdiction } from "../../../common/utils/selectors"
import { useActiveMetric } from "../../../common/hooks"
import { withStyles } from "@material-ui/core"
import { summaryStyles as styles } from "./styles"
import Notes from "../Notes"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"

const ResidentsSummary = ({
  id,
  lang,
  data,
  classes,
  className,
  isFederal,
  ...props
}) => {
  // data for all facilities in the state
  const all = data.allFacilities.edges.map((d) => d.node)

  // jurisdiction totals for the state
  const summary = getDataByJurisdiction(all)

  // metric for the stat list
  const metric = useActiveMetric()
  const notes = [
    lang.notes && lang.notes[metric],
    lang.notes && lang.notes[metric + "_rate"],
  ].filter((n) => !!n)

  const group = isFederal ? "residentsFederal" : "residents"
  return (
    <Stack className={clsx(classes.root, className)} {...props}>
      <MetricSelectionTitle title={lang.title} group={group} />
      <JurisdictionStatList
        isFederal={isFederal}
        metric={metric}
        group={group}
        groupData={summary["residents"]}
      />
      {notes.length > 0 && <Notes notes={notes} />}
    </Stack>
  )
}

ResidentsSummary.defaultProps = {
  lang: {},
}

ResidentsSummary.propTypes = {
  lang: PropTypes.object,
}

export default withStyles(styles)(ResidentsSummary)
