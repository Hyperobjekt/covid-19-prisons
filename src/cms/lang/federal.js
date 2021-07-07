import { extendFieldConfig } from "@hyperobjekt/cms-config";
import { makeStringField } from "../utils";
import { facilities, filings, scorecard, summary } from "./sections";

const federal = {
  label: "Federal Page",
  name: "federal",
  file: "content/lang/federal.json",
  extension: "json",
  format: "json",
  fields: [
    summary,
    {
      label: "Staff Summary",
      name: "staff",
      fields: extendFieldConfig(summary.fields, { id: { default: "staff" } }),
    },
    facilities,
    scorecard,
    filings,
    {
      label: "Releases Section",
      name: "releases",
      widget: "object",
      fields: [
        { label: "id", name: "id", widget: "hidden", default: "releases" },
        makeStringField("Title"),
        makeStringField("Link"),
        makeStringField("Body"),
        {
          label: "Labels",
          name: "visual",
          widget: "object",
          fields: [makeStringField("Release Efforts", { name: "prisonCount" })],
        },
      ],
    },
  ],
};

export default federal;
