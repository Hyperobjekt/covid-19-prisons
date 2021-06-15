import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import FacilitySelect from "./FacilitySelect";
import TimeSeriesChart from "./TimeSeriesChart";
import MetricSelect from "./MetricSelect";
import GroupSelect from "./GroupSelect";

const FacilitiesTimeSeries = ({ ...props }) => {

  return (
    <Block>
      <GroupSelect />
      <MetricSelect />
      <FacilitySelect defaultFacilities={["2336", "45", "92"]} />
      <TimeSeriesChart />
    </Block>
  );
};

export default FacilitiesTimeSeries;
