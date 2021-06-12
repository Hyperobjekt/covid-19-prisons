import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import FacilitySelect from "./FacilitySelect";
import TimeSeriesChart from "./TimeSeriesChart";

const FacilitiesTimeSeries = ({ ...props }) => {

  return (
    <Block>
      <FacilitySelect />
      <TimeSeriesChart />
    </Block>
  );
};

export default FacilitiesTimeSeries;
