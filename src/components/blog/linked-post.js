import React from "react";
import { Link } from "gatsby-theme-material-ui";
import { withStyles } from "@material-ui/core";
import {
  serifTypography,
  subtitleTypography,
} from "../../gatsby-theme-hypercore/theme";

const styles = (theme) => ({
  linkedSection: {},
  sectionTitle: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(28),
    letterSpacing: 18 / 25,
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
  readLink: {
    "&:not(:hover)": {
      color: `${theme.palette.text.primary} !important`,
    },
    textDecoration: "none !important",
    paddingBottom: theme.spacing(1),
    borderBottom: "solid 1px",
    borderBottomColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(3),
    display: "inline-block",
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
        <h4 className={classes.linkedTitle}>{title}</h4>
        <p className={classes.description}>{description}</p>

        <Link className={classes.readLink} to={"/" + path}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(Linked);
