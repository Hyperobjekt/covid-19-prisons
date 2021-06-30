import blog from "../blog";
import { updateField } from "../utils";

// reports is the same a blog config
const reports = {
  ...blog,
  label: "Internal Reports",
  name: "reports",
  folder: "content/pages/reports",
  media_folder: "/content/pages/reports/images",
};

// set default category to report
updateField(reports.fields, "category", { default: "report" });

export default reports;
