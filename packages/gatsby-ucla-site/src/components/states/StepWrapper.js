import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"

export const styles = (theme) => ({
  root: {
    background: "#fff",
    // border: `1px solid gray`,
    padding: `2rem`,
    boxShadow: theme.shadows[1],
    // marginTop: `calc(100vh - ${theme.layout.headerHeight}/4)`,
    marginBottom: `calc(100vh - ${theme.layout.headerHeight}/4)`,
    [theme.breakpoints.up("md")]: {
      background: `transparent`,
      boxShadow: `none`,
      // border: 0,
      padding: 0,
      marginBottom: `auto`,
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
    <div className={clsx(classes.root, className)} {...props}>
      {children}
    </div>
  )
}

StepWrapper.propTypes = {}

export default withStyles(styles)(StepWrapper)
