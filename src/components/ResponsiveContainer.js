import React from "react";
import { withStyles } from "@material-ui/core";
import { Container } from "@hyperobjekt/material-ui-website";

const styles = (theme) => ({
  root: {
    // fix 154: only set max-width for xxl
    maxWidth: 1400,
  },
});

const ResponsiveContainer = ({ ...props }) => {
  return <Container {...props} />;
};

export default withStyles(styles)(ResponsiveContainer);
