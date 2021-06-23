import React from "react";
import { Link } from "gatsby-theme-material-ui";
import { withStyles } from "@material-ui/core";
import {
  serifTypography,
  subtitleTypography,
} from "../../gatsby-theme-hypercore/theme";
import ReadLink from "./read-link";

const styles = (theme) => ({
  linkedSection: {},
  sectionTitle: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(28),
    letterSpacing: 18 / 25,
    marginTop: 0,
  },
  linkedTitle: {
    ...serifTypography,
    fontWeight: 400,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(32),
    lineHeight: 1.25,
    margin: 0,
    maxWidth: theme.columnSpacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(8),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(6),
    },
  },
  description: {
    ...serifTypography,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: 1.5,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    maxWidth: theme.columnSpacing(9),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(7),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(5),
    },
  },
});

const Linked = ({ classes, next, previous }) => {
  const post = next || previous;
  if (!post) {
    return null;
  }
  const { title, description, path } = post.frontmatter;
  const sectionTitle = (next ? "next" : "previous") + " post";
  return (
    <div className={classes.linkedSection}>
      <div className={classes.post}>
        <h3 className={classes.sectionTitle}>{sectionTitle}</h3>
        <h4 className={classes.linkedTitle}>
          <Link to={"/" + path}>{title}</Link>
        </h4>
        <p className={classes.description}>{description}</p>

        <ReadLink aria-hidden="true" to={"/" + path}>
          Read more
        </ReadLink>
      </div>
    </div>
  );
};

export default withStyles(styles)(Linked);
