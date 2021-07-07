import { makeStringField } from "../utils";
import { extendFieldConfig } from "@hyperobjekt/cms-config";
import {
  facilities,
  filings,
  scorecard,
  summary,
  releases,
  grassroots,
} from "./sections";

const states = {
  label: "State Pages",
  name: "states",
  file: "content/lang/states.json",
  extension: "json",
  format: "json",
  fields: [
    {
      label: "Map Language",
      name: "map",
      widget: "object",
      fields: [makeStringField("Description")],
    },
    summary,
    {
      ...summary,
      label: "Staff Summary",
      name: "staff",
      fields: extendFieldConfig(summary.fields, { id: { default: "staff" } }),
    },
    facilities,
    scorecard,
    filings,
    releases,
    grassroots,
  ],
};

console.log({ states });

export default states;
