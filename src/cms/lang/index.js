import { createFileCollection, createFile } from "@hyperobjekt/cms-config";

const home = createFile(
  {
    label: "Sitewide Language",
    name: "en",
    file: "content/lang/en.json",
    extension: "json",
    format: "json",
    fields: [
      {
        label: "Language",
        name: "lang",
        widget: "list",
        summary: "{{fields.key}}: {{fields.value}}",
        fields: [
          { name: "key", label: "Key", widget: "string" },
          { name: "value", label: "Value", widget: "string" },
        ],
      },
    ],
  },
  { mergeFields: false }
);

const immmigration = createFile(
  {
    label: "ICE Page",
    name: "immigration",
    file: "content/lang/immigration.json",
    extension: "json",
    format: "json",
    fields: [
      {
        label: "Scorecard Language",
        name: "scorecard",
        widget: "text",
      },
    ],
  },
  { mergeFields: false }
);

const lang = createFileCollection({
  label: "Language",
  name: "language",
  extension: "json",
  format: "json",
  files: [home, immmigration],
});

console.log({ lang });

export default lang;
