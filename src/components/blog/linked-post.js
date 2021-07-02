import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import { subtitleTypography } from "../../gatsby-theme-hypercore/theme";
import { BlogPost } from ".";

const styles = (theme) => ({
  sectionTitle: {
    ...subtitleTypography,
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(28),
    letterSpacing: 18 / 25,
    marginTop: 0,
    marginBottom: theme.spacing(5),
  },
  root: {
    paddingBottom: theme.spacing(2),
  },
});

const Linked = ({ classes, next, previous }) => {
  const post = next || previous;
  if (!post) {
    return null;
  }
  const sectionTitle = (next ? "next" : "previous") + " post";
  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h2" className={classes.sectionTitle}>
        {sectionTitle}
      </Typography>
      <BlogPost post={post} />
    </div>
  );
};

export default withStyles(styles)(Linked);
