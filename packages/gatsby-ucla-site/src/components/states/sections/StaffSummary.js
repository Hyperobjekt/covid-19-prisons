import React from "react"
import JurisdictionStatList from "../JurisdictionStatList"
import Stack from "../../Stack"
import { getDataByJurisdiction } from "../../../common/utils/selectors"
import { useActiveMetric } from "../../../common/hooks"
import { METRICS } from "../../../common/constants"
import { Typography } from "@material-ui/core"
import { getLang } from "../../../common/utils/i18n"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import Notes from "../Notes"
import StepWrapper from "./../StepWrapper"

const StaffSummary = ({ id, lang, data, isFederal, ...props }) => {
  // data for all facilities in the state
  const all = data.allFacilities.edges.map((d) => d.node)
  // jurisdiction totals for the state
  const summary = getDataByJurisdiction(all)
  const metric = useActiveMetric()
  const isStaffMetric = METRICS["staff"].indexOf(metric) > -1
  const notes = [
    lang.notes && lang.notes[metric],
    lang.notes && lang.notes[metric + "_rate"],
  ].filter((n) => !!n)
  return (
    <Stack {...props}>
      <StepWrapper>
        <MetricSelectionTitle title={lang.title} group="staff" />
        {isStaffMetric && (
          <JurisdictionStatList
            isFederal={isFederal}
            metric={metric}
            group="staff"
            groupData={summary["staff"]}
          />
        )}
        {!isStaffMetric && (
          <Typography variant="body1">
            {lang.unavailable.replace("${metric}", getLang(metric))}
          </Typography>
        )}
        {notes.length > 0 && <Notes notes={notes} />}
      </StepWrapper>
    </Stack>
  )
}

StaffSummary.propTypes = {}

export default StaffSummary
