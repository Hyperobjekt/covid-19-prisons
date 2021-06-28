import { makeStringField, makeTextField } from "../../utils";

const map = {
  label: "Map section",
  name: "map",
  widget: "object",
  fields: [
    makeStringField("Title"),
    makeTextField("Description"),
    {
      label: "Labels",
      name: "labels",
      widget: "object",
      fields: [
        makeStringField("Confirmed"),
        makeStringField("Confirmed Rate"),
        makeStringField("Deaths"),
        makeStringField("Deaths Rate"),
        makeStringField("Active"),
        makeStringField("Active Rate"),
        makeStringField("Tested"),
        makeStringField("Tested Rate"),
      ],
    },
    makeTextField("Notes"),
  ],
};

export default map;
