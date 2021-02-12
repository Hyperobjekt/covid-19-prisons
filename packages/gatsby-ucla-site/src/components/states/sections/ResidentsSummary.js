import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import JurisdictionStatList from "../JurisdictionStatList"
import { getDataByJurisdiction } from "../../../common/utils/selectors"
import { useActiveMetric } from "../../../common/hooks"
import { withStyles } from "@material-ui/core"
import { summaryStyles as styles } from "./styles"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import StepWrapper from "./../StepWrapper"
import InfoIcon from "../../IconWithTooltip"

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

  const [baseMetric] = metric.split("_rate")
  const rateMetric = baseMetric + "_rate"
  // we show the same notes for each "pair" of metrics (eg active & active_rate)
  const notes = [
    lang.notes && lang.notes[baseMetric],
    lang.notes && lang.notes[rateMetric],
    lang.notes && lang.notes.ALL,
  ].filter((n) => !!n)

  return (
    <div className={clsx(classes.root, className)} {...props}>
      <StepWrapper>
        <MetricSelectionTitle title={lang.title} group="residents" />
        <JurisdictionStatList
          isFederal={isFederal}
          metric={metric}
          group="residents"
          groupData={summary["residents"]}
        />
        {notes.length > 0 && <InfoIcon id="residents" notes={notes}></InfoIcon>}
      </StepWrapper>
    </div>
  )
}

ResidentsSummary.defaultProps = {
  lang: {},
}

ResidentsSummary.propTypes = {
  lang: PropTypes.object,
}

export default withStyles(styles)(ResidentsSummary)
