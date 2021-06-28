import intro from "./sections/intro";
import map from "./sections/map";
import scorecard from "./sections/scorecard";
import table from "./sections/table";

const immigration = {
  label: "Immigration Page",
  name: "immigration",
  file: "content/lang/immigration.json",
  extension: "json",
  format: "json",
  fields: [intro, map, table, scorecard],
};

console.log({ immigration });

export default immigration;
