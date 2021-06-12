import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import FacilitySelect from "./FacilitySelect";
import useTimeSeriesData from "../../../common/hooks/use-time-series-data";

const FacilitiesTimeSeries = ({ ...props }) => {
  const data = useTimeSeriesData();
  const disp = Object.keys(data);
  return (
    <Block>
      <FacilitySelect />
      {disp.join(", ")}
    </Block>
  );
};

export default FacilitiesTimeSeries;
