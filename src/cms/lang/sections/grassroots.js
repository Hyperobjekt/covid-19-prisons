import { makeStringField } from "../../utils";

const grassroots = {
  label: "Grassroots Section",
  name: "grassroots",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "grassroots" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Body", { widget: "text" }),
    {
      label: "Stats Labels",
      name: "visual",
      widget: "object",
      fields: [
        makeStringField("Effort Count", { name: "effortCount" }),
        makeStringField("Internal Count", { name: "internalCount" }),
        makeStringField("External Count", { name: "externalCount" }),
        makeStringField("Coordinated Count", { name: "coordinatedCount" }),
      ],
    },
    {
      label: "Table Labels",
      name: "table",
      widget: "object",
      fields: [
        makeStringField("Facility"),
        makeStringField("Date"),
        makeStringField("County"),
        makeStringField("Organization"),
        makeStringField("Type"),
        makeStringField("Effort"),
        makeStringField("Concerns"),
        makeStringField("Source"),
        {
          label: "Effort Types",
          name: "effortMap",
          widget: "object",
          fields: [
            makeStringField("External Effort"),
            makeStringField("Internal Effort"),
            makeStringField("Coordinated Effort"),
          ],
        },
        {
          label: "Concern Types",
          name: "concernTypeMap",
          widget: "object",
          fields: [
            makeStringField("Releases"),
            makeStringField("Testing"),
            makeStringField("Sanitary"),
          ],
        },
      ],
    },
    {
      label: "Notes",
      name: "notes",
      widget: "object",
      fields: [makeStringField("Sourcing")],
    },
    makeStringField("Data Link"),
  ],
};

export default grassroots;
