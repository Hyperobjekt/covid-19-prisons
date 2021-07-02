import { createFileCollection, createFile } from "@hyperobjekt/cms-config";

const reportData = createFile(
  {
    label: "External Reports",
    name: "externalReports",
    file: "content/data/reports.json",
    extension: "json",
    format: "json",
    fields: [
      {
        label: "Reports ID",
        name: "id",
        default: "reports",
        widget: "hidden",
      },
      {
        label: "Reports Data",
        name: "reports",
        allow_add: true,
        widget: "list",
        fields: [
          { label: "Title", name: "title", widget: "string", required: true },
          { label: "Date", name: "date", widget: "date", required: true },
          { label: "Author", name: "author", widget: "string", required: true },
          {
            label: "Description",
            name: "description",
            widget: "text",
            required: true,
          },
          { label: "URL", name: "url", widget: "string", required: true },
        ],
      },
    ],
  },
  { mergeFields: false }
);

const data = createFileCollection({
  label: "External Reports",
  name: "data",
  extension: "json",
  format: "json",
  files: [reportData],
});

export default data;
