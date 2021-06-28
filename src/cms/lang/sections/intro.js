import { makeStringField, makeTextField } from "../../utils";

const intro = {
  label: "Intro Section",
  name: "intro",
  widget: "object",
  fields: [
    makeStringField("Title"),
    makeStringField("Subtitle"),
    makeTextField("Body"),
  ],
};

export default intro;
