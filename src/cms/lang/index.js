import { createFileCollection, createFile } from "@hyperobjekt/cms-config";
import federal from "./federal";
import home from "./home";
import immigration from "./immigration";
import states from "./states";

const site = createFile(
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

const lang = createFileCollection({
  label: "Language",
  name: "language",
  extension: "json",
  format: "json",
  editor: {
    preview: false,
  },
  files: [site, home, federal, immigration, states],
});

export default lang;
