import { makeStringField } from "../../utils";

/**
 * Configuration for scorecard language
 */
const scorecard = {
  label: "Scorecard",
  name: "scorecard",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "scorecard" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Description"),
    makeStringField("Score Title"),
    makeStringField("Date Note"),
    {
      label: "Location Notes",
      name: "asterisk_notes",
      widget: "list",
      summary: "{{fields.key}}",
      fields: [
        makeStringField("key", { label: "Page" }),
        makeStringField("note"),
      ],
    },
    {
      label: "Sections",
      name: "section",
      widget: "object",
      fields: [
        makeStringField("Resident Reporting"),
        makeStringField("Staff Reporting"),
        makeStringField("Data Quality"),
      ],
    },
    {
      label: "Table Headers",
      name: "table_header",
      widget: "object",
      fields: [
        makeStringField("Machine"),
        makeStringField("Regularly"),
        makeStringField("Defined"),
        makeStringField("History"),
        makeStringField("Cases (Residents)"),
        makeStringField("Deaths (Residents)"),
        makeStringField("Active (Residents)"),
        makeStringField("Tests (Residents)"),
        makeStringField("Population (Residents)"),
        makeStringField("Vaccinations (Residents)"),
        makeStringField("Cases (Staff)"),
        makeStringField("Deaths (Staff)"),
        makeStringField("Active (Staff)"),
        makeStringField("Tests (Staff)"),
        makeStringField("Population (Staff)"),
        makeStringField("Vaccinations (Staff)"),
      ],
    },
    {
      label: "Table Values",
      name: "table_value",
      widget: "object",
      fields: [
        makeStringField("Yes"),
        makeStringField("No"),
        makeStringField("None"),
        makeStringField("None (alt)"),
        makeStringField("Statewide"),
        makeStringField("Statewide (alt)"),
        makeStringField("Facility Level"),
        makeStringField("Facility Level (alt)"),
      ],
    },
  ],
};

export default scorecard;
