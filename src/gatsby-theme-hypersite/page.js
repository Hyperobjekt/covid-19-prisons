import React from "react";
import { Page } from "@hyperobjekt/material-ui-website";
import { useLocation } from "@reach/router";
import clsx from "clsx";

/** Takes the page pathname and returns a class name */
function makeClassName(pathname) {
  if (pathname === "") return "home";
  return pathname
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Add page level classes to the default page element
 * based on the pathname
 * (e.g. page--home, page--federal, etc.)
 */
export default function ClassedPage({ className, ...props }) {
  const location = useLocation();
  const pageClass = makeClassName(location.pathname.substr(1));
  return (
    <Page
      className={clsx("page", "page--" + pageClass, className)}
      {...props}
    />
  );
}
