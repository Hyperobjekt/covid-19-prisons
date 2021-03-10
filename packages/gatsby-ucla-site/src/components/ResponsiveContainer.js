import React from "react"
import { Container, withStyles } from "@material-ui/core"

const styles = (theme) => ({
  root: {
    // fix 154: only set max-width for xxl
    maxWidth: 1400,
  },
})

const ResponsiveContainer = ({ classes, ...props }) => {
  return <Container classes={classes} {...props} />
}

export default withStyles(styles)(ResponsiveContainer)
