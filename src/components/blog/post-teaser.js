import React from "react";
import clsx from "clsx";
import { Typography, withStyles } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import { serifTypography } from "../../gatsby-theme-hypercore/theme";
import ReadLink from "./read-link";
import PostMeta from "./post-meta";
import { graphql } from "gatsby";
import { OpenInNew } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    position: "relative",
    paddingBottom: theme.spacing(9),
    "& + $root": {
      paddingTop: theme.spacing(7),
    },
    "&:not(:last-child):before": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottom: "2px dotted #92926C",
      width: 142,
    },
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    ...serifTypography,
    display: "block",
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 400,
    lineHeight: 1.2,
    maxWidth: "20em",
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(28),
    },
    "&.MuiLink-root": {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        opacity: 0.7,
      },
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
    paddingRight: theme.spacing(2),
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
    [theme.breakpoints.up("xl")]: {
      maxWidth: theme.columnSpacing(4),
    },
    // marginRight: theme.columnSpacing(2),
  },
  icon: {
    fontSize: 16,
    position: "relative",
    top: 3,
    left: 2,
  },
});

const Post = ({
  classes,
  className,
  date,
  title,
  description,
  url,
  author,
  isFeatured,
  external,
  ...props
}) => {
  // const { date, name: title, description, path, meta } = post.frontmatter;
  // const url = path || post.slug;
  // const absoluteUrl = url[0] === "/" ? url : "/" + url;
  return (
    <div
      className={clsx(
        classes.root,
        { [classes.featured]: isFeatured },
        className
      )}
      {...props}
    >
      <PostMeta date={date} author={author} />
      <div className={classes.titleWrapper}>
        <Typography variant="h3" component="h3">
          <Link
            className={classes.title}
            to={url}
            target={external && "_blank"}
          >
            {title}
          </Link>
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </div>

      <ReadLink aria-hidden="true" to={url}>
        Read more {external && <OpenInNew className={classes.icon} />}
      </ReadLink>
    </div>
  );
};

export default withStyles(styles)(Post);

export const query = graphql`
  fragment BlogPostTeaser on Mdx {
    id
    frontmatter {
      meta {
        title
        description
        keywords
        image {
          childImageSharp {
            gatsbyImageData(
              transformOptions: { fit: COVER, cropFocus: CENTER }
              width: 1200
              height: 630
            )
          }
        }
        isBlogPost
      }
    }
  }
`;
