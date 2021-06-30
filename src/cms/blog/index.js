import { createFolderCollection } from "@hyperobjekt/cms-config";
import { updateField } from "../utils";

// create a default folder configuration
const baseBlogConfig = createFolderCollection({
  label: "Blog",
  folder: "content/pages/blog",
  media_folder: "/content/pages/blog/images",
  public_folder: "./images",
});

updateField(baseBlogConfig.fields, "meta.title", { required: false });
updateField(baseBlogConfig.fields, "meta.isBlogPost", { default: true });
updateField(baseBlogConfig.fields, "meta.author", {
  field: {
    label: "Name",
    name: "name",
    widget: "relation",
    collection: "authors",
    search_fields: ["name"],
    display_fields: ["name"],
    value_field: "name",
  },
  summary: "{{fields.name}}",
});
updateField(baseBlogConfig.fields, "path", { required: false });
updateField(baseBlogConfig.fields, "name", {
  label: "Title",
  hint: "the title of your post",
});

// filter out unneeded fields
const fields = baseBlogConfig.fields.filter((f) => {
  if (f.name === "embeddedImages" || f.name === "store") return false;
  return true;
});

// featured toggle
const featured = {
  label: "Featured",
  name: "featured",
  widget: "boolean",
  hint: "Whether to display as the featured post on the blog index page. If more than one post is marked as featured, the most recent one will be used.",
  required: false,
  default: false,
};

// date field
const date = {
  label: "Publish Date",
  name: "date",
  widget: "datetime",
  hint: "this date is displayed on the blog post, and determines the ordering of blog posts on the index page.",
};

// post summary field
const summary = {
  label: "Summary",
  name: "description",
  widget: "text",
  hint: "A short teaser (1-2 sentences) of the blog post, displayed on the blog index page under the post name.",
};

// post image
const image = {
  label: "Image",
  name: "image",
  widget: "image",
  hint: "Image displayed below the title before the blog post body",
  required: false,
};

// template field (sets the page template to "blog")
const template = {
  label: "Template",
  name: "template",
  widget: "hidden",
  default: "blog",
};

const category = {
  label: "Category",
  name: "category",
  widget: "hidden",
  default: "blog",
};

// insert extra fields
fields.splice(1, 0, featured); // below draft toggle
fields.splice(2, 0, date); // below feature toggle
fields.splice(fields.length - 1, 0, summary); // before blog body
fields.splice(fields.length - 1, 0, image); // before blog body
fields.splice(fields.length, 0, template); // end
fields.splice(fields.length, 0, category); // end

// create the blog config, with updated meta field
const blog = {
  ...baseBlogConfig,
  filter: { field: "template", value: "blog" }, // only show blog posts
  fields,
};

console.log({ blog });

export default blog;
