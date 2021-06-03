import React from "react"
import { Container, withStyles } from "@material-ui/core"
import { MAX_CONTENT_WIDTH } from "../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  root: {
    // fix 154: only set max-width for xxl
    maxWidth: MAX_CONTENT_WIDTH,
  },
})

const ResponsiveContainer = ({ classes, ...props }) => {
  return <Container classes={classes} {...props} />
}

export default withStyles(styles)(ResponsiveContainer)
