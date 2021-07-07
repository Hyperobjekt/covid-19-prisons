import { createFolderCollection } from "@hyperobjekt/cms-config";
import { updateField } from "../utils";

// create a default folder configuration
const baseAuthorConfig = createFolderCollection(
  {
    label: "Authors",
    folder: "content/pages/blog/authors",
    media_folder: "/content/pages/blog/authors/images",
    public_folder: "./images",
  },
  {
    fieldOverrides: {
      name: { label: "Author Name", hint: undefined },
      body: {
        label: "Author Bio",
        hint: "content displayed before the list of blog posts",
      },
    },
  }
);

// set title as optional, will default to author name
updateField(baseAuthorConfig.fields, "meta.title", { required: false });

// filter out unneeded fields
const fields = baseAuthorConfig.fields.filter((f) => {
  if (f.name === "embeddedImages" || f.name === "store" || f.name === "path")
    return false;
  return true;
});

// author image
const image = {
  label: "Author Image",
  name: "image",
  widget: "image",
  hint: "square image works best, will be displayed next to author name / bio",
  required: false,
};

const template = {
  label: "template",
  name: "template",
  widget: "hidden",
  default: "author",
};

// add image field to fields array
fields.splice(fields.length - 1, 0, image); // before blog body
fields.splice(0, 0, template);

// create the blog config, with updated meta field
const authors = {
  ...baseAuthorConfig,
  fields: fields,
};

console.log({ authors });
export default authors;
