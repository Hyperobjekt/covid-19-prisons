import React from "react";
import Breadcrumb from "gatsby-theme-hypersite/src/breadcrumb/breadcrumb";

/** Limit breadcrumb to top level */
const SiteBreadcrumb = (props) => {
  return <Breadcrumb NavigationProps={{ maxDepth: 0 }} {...props} />;
};

export default SiteBreadcrumb;
