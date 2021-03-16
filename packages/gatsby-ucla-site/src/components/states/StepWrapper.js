import React from "react"
import clsx from "clsx"
import { withStyles } from "@material-ui/core"
import Stack from "../Stack"

export const styles = (theme) => ({
  root: {
    background: "#fff",
    padding: theme.spacing(3),
    boxShadow: theme.shadows[1],
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      background: `transparent`,
      boxShadow: `none`,
      padding: theme.spacing(3, 0),
    },
  },
})

/**
 * A simple wrapper for a step section, for mobile layout.
 * @param {[type]} classes   [description]
 * @param {[type]} className [description]
 * @param {[type]} children  [description]
 * @param {[type]} props     [description]
 */
const StepWrapper = ({ classes, className, children, ...props }) => {
  return (
    <Stack className={clsx(classes.root, className, "step-wrapper")} {...props}>
      {children}
    </Stack>
  )
}

StepWrapper.propTypes = {}

export default withStyles(styles)(StepWrapper)
