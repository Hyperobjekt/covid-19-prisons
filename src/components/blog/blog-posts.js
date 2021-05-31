import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { subtitleTypography } from "../../gatsby-theme-hypercore/theme";
import BlogPost from "./blog-post";

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(13),
    paddingLeft: theme.columnSpacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.columnSpacing(2),
    },
    "& $post": {
      marginBottom: theme.spacing(9),
      paddingBottom: theme.spacing(9),

      "&:not(:last-child) $readLinkWrapper": {
        display: "inline",
        borderBottom: "2px dotted #92926C",
        paddingRight: theme.spacing(10),
        paddingBottom: theme.spacing(9),
      },
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

const BlogPosts = ({ classes, className, title, posts, ...props }) => {
  return (
    <div className={clsx(classes.root, className)} {...props}>
      <h2 className={classes.title}>{title}</h2>
      {posts.map((p, idx) => (
        <BlogPost post={p} key={p.frontmatter.path} />
      ))}
    </div>
  );
};

export default withStyles(styles)(BlogPosts);
