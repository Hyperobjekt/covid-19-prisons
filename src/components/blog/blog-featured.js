import React from "react";
import { withStyles } from "@material-ui/core";
import {
  compactTitleTypography,
  subtitleTypography,
} from "../../gatsby-theme-hypercore/theme";
import clsx from "clsx";
import BlogPost from "./blog-post";

const FeaturedPost = withStyles((theme) => ({
  title: {
    ...compactTitleTypography,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(48),
    lineHeight: 1.1,
    "& a": {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(62),
    },
  },
}))(BlogPost);

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(9),
    background: theme.palette.background.alt3,
    paddingLeft: theme.columnSpacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.columnSpacing(2),
      marginLeft: theme.columnSpacing(1),
    },
  },
  title: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(32),
    letterSpacing: 12 / 25,
    margin: theme.spacing(0, 0, 4),
  },
});

function BlogFeatured({ classes, className, title, post }) {
  return (
    <div className={clsx(classes.root, className)}>
      <h2 className={classes.title}>{title}</h2>
      <FeaturedPost post={post} isFeatured={true} />
    </div>
  );
}

export default withStyles(styles)(BlogFeatured);
