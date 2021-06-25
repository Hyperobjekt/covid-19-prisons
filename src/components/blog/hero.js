import React from "react";
import { withStyles } from "@material-ui/core";
import { compactTitleTypography } from "../../gatsby-theme-hypercore/theme";
import moment from "moment";
import Block from "gatsby-theme-hypersite/src/main/block";

const styles = (theme) => ({
  hero: {
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.columnSpacing(2),
    },
  },
  date: {
    fontSize: theme.typography.pxToRem(14),
  },
  postTitle: {
    ...compactTitleTypography,
    color: theme.palette.text.secondary,
    lineHeight: 1.05,
    margin: 0,
    paddingBottom: theme.spacing(5),
    fontSize: theme.typography.pxToRem(55),
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(70),
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(85),
    },
  },
});

const Hero = ({ classes, author, date, title, ...props }) => {
  const postDetails = `${author} • ${moment(date).format("MMMM Do, YYYY")}`;
  return (
    <Block>
      <div className={classes.hero} {...props}>
        <p className={classes.date}>{postDetails}</p>
        <h2 className={classes.postTitle}>{title}</h2>
      </div>
    </Block>
  );
};

export default withStyles(styles)(Hero);
