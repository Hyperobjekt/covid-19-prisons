import { makeStringField, makeTextField } from "../../utils";

/**
 * Configuration for stats summary section
 */
const summary = {
  label: "Residents Summary",
  name: "residents",
  widget: "object",
  collapsed: true,
  fields: [
    { label: "id", name: "id", widget: "hidden", default: "residents" },
    makeStringField("Title"),
    makeStringField("Link"),
    makeStringField("Unavailable", {
      hint: "Text to show when metric is unavailable",
    }),
    {
      label: "Notes",
      name: "notes",
      widget: "object",
      fields: [
        makeTextField("Default", {
          name: "ALL",
          hint: "this note is shown for all metrics",
        }),
        makeTextField("Confirmed"),
        makeTextField("Confirmed Rate"),
        makeTextField("Active"),
        makeTextField("Active Rate"),
        makeTextField("Deaths"),
        makeTextField("Deaths Rate"),
        makeTextField("Tested"),
        makeTextField("Tested Rate"),
      ],
    },
    makeStringField("Data Link"),
  ],
};

export default summary;
