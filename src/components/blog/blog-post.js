import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import { Link as GatsbyLink } from "gatsby";
import AccountCircle from "@material-ui/icons/AccountCircle";
import moment from "moment";
import { serifTypography } from "../../gatsby-theme-hypercore/theme";
import ReadLink from "./read-link";

const styles = (theme) => ({
  title: {
    ...serifTypography,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
    maxWidth: theme.columnSpacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.columnSpacing(8),
      fontSize: theme.typography.pxToRem(40),
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.columnSpacing(6),
    },
  },
  authorImage: {
    display: "none", // deactivate for now
    position: "relative",
    left: "-100%",
    fontSize: theme.typography.pxToRem(40),
    marginRight: theme.spacing(2),
    // marginTop: theme.spacing(1),
    color: "#B7B7A5",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  root: {
    position: "relative",
    paddingBottom: theme.spacing(10),
    "&:not(:last-child):before": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottom: "2px dotted #92926C",
      width: 142,
    },
  },
  featured: {},
  date: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: 1,
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    margin: 0,
  },
  titleWrapper: {
    position: "relative",
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
    // marginRight: theme.columnSpacing(2),
  },
  authorImageWrapper: {
    position: "absolute",
    top: 0,
    display: "none", // deactivate for now
  },
});

const BlogPost = ({ classes, className, post, isFeatured, ...props }) => {
  const { date, title, description, path } = post.frontmatter;
  const formattedDate = moment(date).format("MMMM Do, YYYY");
  return (
    <div className={clsx(classes.root, className)} {...props}>
      {!isFeatured && <p className={classes.date}>{formattedDate}</p>}
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>
          <Link to={"/" + path}>{title}</Link>
        </h3>
        <p className={classes.description}>{description}</p>
        <div className={classes.authorImageWrapper}>
          <AccountCircle className={classes.authorImage} />
        </div>
      </div>

      <ReadLink aria-hidden="true" to={"/" + path}>
        Read more
      </ReadLink>
    </div>
  );
};

export default withStyles(styles)(BlogPost);
