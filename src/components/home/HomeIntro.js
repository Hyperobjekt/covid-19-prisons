import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { Block } from "@hyperobjekt/material-ui-website";
import {
  subtitleTypography,
  titleTypography,
} from "../../gatsby-theme-hypercore/theme";

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(44),
    maxWidth: "10em",
    marginTop: 0,
  },
  subtitle: {
    ...subtitleTypography,
    fontSize: theme.typography.pxToRem(55),
    color: theme.palette.secondary.main,
    marginTop: 0,
  },
  body: {
    maxWidth: "32em",
  },
});

const Intro = ({ classes, className, title, subtitle, body, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth" {...props}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="h2">
            {subtitle}
          </Typography>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.body} variant="body1">
            {body}
          </Typography>
        </Grid>
      </Grid>
    </Block>
  );
};

Intro.propTypes = {};

export default withStyles(styles)(Intro);
