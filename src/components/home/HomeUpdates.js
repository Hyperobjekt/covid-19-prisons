import React from "react";
import { Block } from "@hyperobjekt/material-ui-website";
import Stack from "../Stack";
import { Typography, withStyles } from "@material-ui/core";
import { titleTypography } from "../../gatsby-theme-hypercore/theme";
import { useLatestPosts } from "../../common/hooks";
import { postDataToProps, PostList } from "../blog";

export const styles = (theme) => ({
  root: {},
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(23),
    textAlign: "center",
    maxWidth: "10em",
    marginTop: 0,
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
  },
  titleWrapper: {
    [theme.breakpoints.up("md")]: {
      minWidth: "33%",
    },
  },
});

const HomeUpdates = ({ title, classes, ...props }) => {
  const posts = useLatestPosts();
  console.log("posts:", posts);

  return (
    <Block className={classes.root} {...props}>
      <Stack horizontal="sm" spacing={3} justify="space-between" align="center">
        {title && (
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="h3">
              {title}
            </Typography>
          </div>
        )}
      </Stack>
      <Stack
        horizontal="sm"
        spacing={3}
        justify="space-around"
        style={{ flex: 1 }}
      >
        <PostList posts={posts.slice(0, 3)} />
      </Stack>
    </Block>
  );
};

export default withStyles(styles)(HomeUpdates);
