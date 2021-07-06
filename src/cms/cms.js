import CMS from "netlify-cms-app";
import { config, createFolderCollection } from "@hyperobjekt/cms-config";
import blog from "./blog";
import data from "./data";
import lang from "./lang";
import authors from "./authors";
import reports from "./reports";

window.CMS_MANUAL_INIT = true;

const pages = createFolderCollection({
  label: "Pages",
  folder: "content/pages",
  media_folder: "/content/pages/images",
  public_folder: "./images",
});

CMS.init({
  config: {
    load_config_file: false,
    // remember to run npx netlify-cms-proxy-server if running locally
    local_backend: process.env.CI !== true,
    backend: {
      name: "git-gateway",
      repo: "Hyperobjekt/covid-19-behind-bars",
      branch: process.env.BRANCH || "staging",
    },
    media_folder: "/static/images",
    public_folder: "/images",
    collections: [config, pages, blog, authors, reports, data, lang],
  },
});
