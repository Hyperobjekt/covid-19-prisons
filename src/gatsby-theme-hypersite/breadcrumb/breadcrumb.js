import React from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby-material-ui-components";
import LeftArrow from "../../common/icons/LeftArrow";
import { Block } from "@hyperobjekt/material-ui-website";

/** No breadcrumb on site, only provide "back to blog" link on blog pages */
const SiteBreadcrumb = (props) => {
  const location = useLocation();
  return location.pathname.indexOf("/blog/") > -1 ? (
    <Block small>
      <Link to="/blog">
        <LeftArrow aria-hidden="true" style={{ marginRight: 8 }} /> Back to Blog
      </Link>
    </Block>
  ) : null;
};

export default SiteBreadcrumb;
