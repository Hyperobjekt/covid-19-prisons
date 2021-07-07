import React from "react";
import JurisdictionStatList from "../JurisdictionStatList";
import { getDataByJurisdiction } from "../../../common/utils/selectors";
import { useActiveMetric } from "../../../common/hooks";
import { METRICS } from "../../../common/constants";
import { Typography } from "@material-ui/core";
import { getLang } from "../../../common/utils/i18n";
import MetricSelectionTitle from "../../controls/MetricSelectionTitle";
import StepWrapper from "./../StepWrapper";
import NotesModal from "../../NotesModal";

/* eslint-disable no-template-curly-in-string */
const StaffSummary = ({ id, lang, data, isFederal, ...props }) => {
  // data for all facilities in the state
  const all = data.allFacilities.edges.map((d) => d.node);
  const stateScore = data.scorecard?.nodes[0]?.score;
  const fedScore = data.fedScorecard?.nodes[0]?.score;
  const iceScore = data.iceScorecard?.nodes[0]?.score;

  // jurisdiction totals for the state
  const summary = getDataByJurisdiction(all);
  const metric = useActiveMetric();
  const isStaffMetric = METRICS["staff"].indexOf(metric) > -1;

  const [baseMetric] = metric.split("_rate");
  const rateMetric = baseMetric + "_rate";
  // we show the same notes for each "pair" of metrics (eg active & active_rate)
  const notes = [
    lang.notes && lang.notes[baseMetric],
    lang.notes && lang.notes[rateMetric],
    lang.notes && isStaffMetric && lang.notes.ALL,
  ].filter((n) => !!n);
  return (
    <div {...props}>
      <StepWrapper>
        <MetricSelectionTitle title={lang.title} group="staff" />
        {isStaffMetric && (
          <JurisdictionStatList
            isFederal={isFederal}
            metric={metric}
            group="staff"
            groupData={summary["staff"]}
            stateScore={stateScore}
            fedScore={fedScore}
            iceScore={iceScore}
          />
        )}
        {!isStaffMetric && (
          <Typography variant="body1">
            {lang.unavailable.replace("${metric}", getLang(metric))}
          </Typography>
        )}
        {notes.length > 0 && <NotesModal notes={notes} />}
      </StepWrapper>
    </div>
  );
};

StaffSummary.propTypes = {};

export default StaffSummary;
