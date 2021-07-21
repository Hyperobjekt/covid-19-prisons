import { makeStringField, makeTextField } from "../../utils";

const table = {
  label: "Table Section",
  name: "table",
  widget: "object",
  fields: [
    makeStringField("Title"),
    {
      label: "Data Notes",
      name: "note",
      widget: "list",
      summary: "{{fields.note}}",
      field: makeTextField("Note"),
    },
    makeStringField("Data Link"),
  ],
};

export default table;
