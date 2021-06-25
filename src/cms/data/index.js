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

const authorData = createFile(
  {
    label: "Authors",
    name: "authors",
    file: "content/data/authors.json",
    extension: "json",
    format: "json",
    media_folder: "../assets",
    public_folder: "",
    fields: [
      {
        label: "Authors ID",
        name: "id",
        default: "authors",
        widget: "hidden",
      },
      {
        label: "Authors",
        name: "authors",
        allow_add: true,
        widget: "list",
        fields: [
          { label: "Name", name: "name", widget: "string", required: true },
          { label: "Bio", name: "bio", widget: "text", required: false },
          {
            label: "Image",
            name: "image",
            widget: "image",
            required: false,
            hint: "small square avatar image",
          },
        ],
      },
    ],
  },
  { mergeFields: false }
);

const data = createFileCollection({
  label: "Data",
  name: "data",
  extension: "json",
  format: "json",
  files: [reportData, authorData],
});

console.log({ data });

export default data;
