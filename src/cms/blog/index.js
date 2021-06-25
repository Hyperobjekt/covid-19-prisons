import {
  createFolderCollection,
  extendFieldConfig,
} from "@hyperobjekt/cms-config";

// create a default folder configuration
const baseBlogConfig = createFolderCollection({
  label: "Blog",
  folder: "content/pages/blog",
  media_folder: "/content/pages/blog/images",
  public_folder: "./images",
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
};

// template field (sets the page template to "blog")
const template = {
  label: "Template",
  name: "template",
  widget: "hidden",
  default: "blog",
};

// insert extra fields
fields.splice(1, 0, featured); // below draft toggle
fields.splice(2, 0, date); // below feature toggle
fields.splice(fields.length - 1, 0, summary); // before blog body
fields.splice(fields.length - 1, 0, image); // before blog body
fields.splice(fields.length, 0, template); // last field

/**
 * update the blog metadata so that:
 * - isBlogPost defaults to true
 * - authors uses a list widget with a string field
 */
const blogMetadata = extendFieldConfig(
  fields.find((f) => f.name === "meta").fields,
  {
    isBlogPost: { default: true },
    author: {
      field: {
        label: "Name",
        name: "name",
        widget: "relation",
        collection: "data",
        file: "authors",
        search_fields: ["authors.*.name"],
        display_fields: ["authors.*.name"],
        value_field: "authors.*.name",
      },
      summary: "{{fields.name}}",
    },
  }
);

// create the blog config, with updated meta field
const blog = {
  ...baseBlogConfig,
  filter: { field: "template", value: "blog" }, // only show blog posts
  fields: extendFieldConfig(fields, {
    meta: { fields: blogMetadata },
    path: {
      required: true,
      hint: "URL where the blog post will be accessed on the site. should be lowercase, with no spaces or special characters. e.g. blog/this-is-the-post-name",
    },
  }),
};

console.log({ blog });

export default blog;
