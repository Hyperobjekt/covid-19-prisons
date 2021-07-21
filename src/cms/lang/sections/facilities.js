import { makeStringField } from "../../utils";

/**
 * Configuration for facilities list section
 */
const facilities = {
  label: "Facilities",
  name: "facilities",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "facilities" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Body"),
    makeStringField("Data Link"),
  ],
};

export default facilities;
