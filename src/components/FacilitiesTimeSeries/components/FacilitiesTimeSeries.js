import React from "react";
import { getLang } from "../../../common/utils/i18n";
import { Block } from "@hyperobjekt/material-ui-website";
import FacilitySelect from "./FacilitySelect";

const FacilitiesTimeSeries = ({ ...props }) => {
  return (
    <Block>
      <FacilitySelect />
    </Block>
  );
};

export default FacilitiesTimeSeries;
