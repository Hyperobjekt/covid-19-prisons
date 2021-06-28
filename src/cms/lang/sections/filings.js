import { makeStringField } from "../../utils";

/**
 * Configuration for filings language
 */
const filings = {
  label: "Filings",
  name: "filings",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "filings" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Body"),
    {
      label: "Labels",
      name: "visual",
      widget: "object",
      fields: [
        makeStringField("Court Count", { name: "courtCount" }),
        makeStringField("Granted"),
        makeStringField("Facility Count", { name: "facilityCount" }),
        makeStringField("Total"),
        makeStringField("Unavailable"),
      ],
    },
  ],
};

export default filings;
