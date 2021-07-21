import { makeStringField } from "../../utils";

const releases = {
  label: "Releases Section",
  name: "releases",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "releases" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Body"),
    {
      label: "Table",
      name: "table",
      widget: "object",
      collapsed: true,
      fields: [
        makeStringField("Jurisdiction"),
        makeStringField("Facility"),
        makeStringField("Authority"),
        makeStringField("Date"),
        makeStringField("Releases"),
        makeStringField("Population"),
        makeStringField("Proportion"),
        makeStringField("Capacity"),
        makeStringField("Details"),
        makeStringField("Source"),
        {
          label: "Detail Types",
          name: "detailTypeMap",
          widget: "object",
          collapsed: true,
          fields: [
            makeStringField("Parole", { name: "detailParole" }),
            makeStringField("Minor", { name: "detailMinor" }),
            makeStringField("Bail", { name: "detailBail" }),
            makeStringField("Short", { name: "detailShort" }),
            makeStringField("Vulnerable", { name: "detailVulnerable" }),
            makeStringField("Other", { name: "detailOther" }),
          ],
        },
      ],
    },
    {
      label: "Notes",
      name: "notes",
      widget: "list",
      collapsed: true,
      minimize_collapsed: true,
      summary: "{{fields.note}}",
      field: { label: "note", name: "note", widget: "string" },
    },
    makeStringField("Data Link"),
  ],
};

export default releases;
