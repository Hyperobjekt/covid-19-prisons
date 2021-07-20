import blog from "../blog";

// reports is the same a blog config
const reports = {
  ...blog,
  label: "Internal Reports",
  name: "reports",
  folder: "content/pages/reports",
  media_folder: "/content/pages/reports/images",
  // same fields as blog, but set category default to report
  fields: blog.fields.map((field) => {
    if (field.name === "category") {
      return {
        label: "Category",
        name: "category",
        widget: "hidden",
        default: "report",
      };
    }
    return field;
  }),
};

export default reports;
